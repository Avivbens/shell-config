import { execPromise } from '@common/utils'
import { IAppSetup } from '@models/app-setup.model'
import { LoggerService } from '@services/logger.service'
import { Command, CommandRunner } from 'nest-commander'
import ora from 'ora'
import { MULTI_SELECT_APPS_PROMPT } from './config/multi-select-apps.config'

@Command({
    name: 'install',
    description: 'Install MacOS setup with Multi-Selection',
    options: { isDefault: false },
})
export class InstallCommand extends CommandRunner {
    private readonly installMap = new Map<string, boolean>()

    constructor(private readonly logger: LoggerService) {
        super()
        this.logger.setContext(InstallCommand.name)
    }

    async run(inputs: string[], options: Record<string, any>): Promise<void> {
        try {
            const toInstall = await MULTI_SELECT_APPS_PROMPT()

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
        } catch (error) {
            this.logger.error(`Error InstallCommand, error: ${error.stack}`)
        }
    }

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
                this.logger.error(`Error resolveDeps, error: ${error.stack}`)
                process.exit(1)
            } else {
                throw error
            }
        }
    }

    private async installApp(app: IAppSetup): Promise<void> {
        const { commands, commandsFallback, name } = app
        const spinner = ora({
            text: `Installing ${name}`,
            hideCursor: false,
            discardStdin: false,
        })
        spinner.start()

        try {
            let needFallback = false
            for (const command of commands) {
                if (needFallback) {
                    break
                }

                await execPromise(command).catch((err) => {
                    if (!commandsFallback?.length) {
                        throw err
                    }

                    needFallback = true
                })
            }

            if (needFallback) {
                for (const command of commandsFallback) {
                    await execPromise(command)
                }
            }

            spinner.text = `Installed ${name}`
            spinner.succeed()
            this.installMap.set(name, true)
            this.logger.debug(`Installed ${name}`)
        } catch (error) {
            spinner.fail()
            this.logger.error(`Error installApp app: ${name}, error: ${error.stack}`)
        }
    }
}
