import { Command, CommandRunner } from 'nest-commander'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import * as ora from 'ora'
import { IAppSetup } from '../models/app-setup.model'
import { LoggerService } from '../services/logger.service'
import { MULTI_SELECT_PROMPT } from './config/multi-select.config'
import { SETUP_ASSETS_CONFIRM_PROMPT } from './config/setup-assets.config'

const execPromise = promisify(exec)
const inquirer: typeof import('inquirer') = require('inquirer')

@Command({
    name: 'init',
    // arguments: '<task>',
    description: 'Install MacOS setup with Multi-Selection',
    options: { isDefault: true },
})
export class InitCommand extends CommandRunner {
    private readonly installMap = new Map<string, boolean>()

    constructor(private readonly logger: LoggerService) {
        super()
    }

    async run(inputs: string[], options: Record<string, any>): Promise<void> {
        // ask is assets needed
        const toSetupAssets = await SETUP_ASSETS_CONFIRM_PROMPT()

        if (toSetupAssets) {
            await this.setupAssets()
        }

        const toInstall = await MULTI_SELECT_PROMPT()

        const order = this.resolveDeps(toInstall).sort((a, b) => {
            if (a.last) {
                return 1
            }

            if (b.last) {
                return -1
            }

            return 0
        })

        for (const app of order) {
            await this.installApp(app)
        }
    }

    // TODO - setup assets
    private async setupAssets(): Promise<void> {}

    private resolveDeps(
        apps: IAppSetup[],
        res: IAppSetup[] = [],
        depsMap: Record<string, boolean> = {},
        round = 0,
    ): IAppSetup[] {
        try {
            const [withDeps, noDeps] = apps.reduce(
                (acc, app) => {
                    const { deps } = app
                    if (deps?.length) {
                        acc[0].push(app)
                    } else {
                        acc[1].push(app)
                        depsMap[app.name] = true
                    }

                    return acc
                },
                [[] as IAppSetup[], [] as IAppSetup[]],
            )

            res.push(...noDeps)

            const toCheck: IAppSetup[] = []

            withDeps.forEach((app) => {
                const { deps } = app
                const depsNotInstalled: boolean = deps?.some((dep) => !depsMap[dep])

                if (depsNotInstalled) {
                    toCheck.push(app)
                    return
                }

                res.push(app)
                depsMap[app.name] = true
            })

            if (!toCheck.length) {
                return res
            }

            return this.resolveDeps(toCheck, res, depsMap)
        } catch (error) {
            if (round === 0) {
                this.logger.error('Failed to resolve deps')
                process.exit(1)
            } else {
                throw error
            }
        }
    }

    private async installApp(app: IAppSetup): Promise<void> {
        const { commands, name } = app
        const spinner = ora(`Installing ${name}`).start()

        try {
            for (const command of commands) {
                await execPromise(command)
            }

            spinner.succeed()
            this.installMap.set(name, true)
            this.logger.log(`Installed ${name}`)
        } catch (error) {
            spinner.fail()
            this.logger.error(`Failed to install ${name}`)
        }
    }
}
