import { BASE_PATH } from '@common/constants'
import { execPromise } from '@common/utils'
import { IAppSetup } from '@models/app-setup.model'
import { LoggerService } from '@services/logger.service'
import { Command, CommandRunner } from 'nest-commander'
import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import ora from 'ora'
import { MULTI_SELECT_APPS_PROMPT } from './config/multi-select-apps.config'
import {
    ASK_FOR_ARTIFACTORY_KEY_PROMPT,
    ASK_FOR_EMAIL_PROMPT,
    ASK_FOR_GIT_KEY_PROMPT,
    ASK_FOR_NAME_PROMPT,
    ASK_FOR_PERSONAL_EMAIL_PROMPT,
    ASK_FOR_PERSONAL_GIT_KEY_PROMPT,
    ASSETS_TEMPLATES,
    SETUP_ASSETS_ALSO_PERSONAL_CONFIRM_PROMPT,
    SETUP_ASSETS_CONFIRM_PROMPT,
} from './config/setup-assets.config'
import { ReplacementTemplate } from './template-handle/models/replacement.enum'
import { replaceInTemplate } from './template-handle/replace-in-template'

@Command({
    name: 'install',
    description: 'Install MacOS setup with Multi-Selection',
    options: { isDefault: false },
})
export class InstallCommand extends CommandRunner {
    private readonly installMap = new Map<string, boolean>()

    constructor(private readonly logger: LoggerService) {
        super()
    }

    async run(inputs: string[], options: Record<string, any>): Promise<void> {
        try {
            // ask is assets needed
            const toSetupAssets = await SETUP_ASSETS_CONFIRM_PROMPT()

            if (toSetupAssets) {
                await this.setupAssets()
            }

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
            this.logger.error(`Failed install command: ${error.stack}`)
        }
    }

    private async setupAssets(): Promise<void> {
        const spinner = ora('Setting up assets')

        try {
            const alsoPersonalAssets: boolean = await SETUP_ASSETS_ALSO_PERSONAL_CONFIRM_PROMPT()
            let personalEmail: string = ''
            let personalGitKey: string = ''
            if (alsoPersonalAssets) {
                personalEmail = await ASK_FOR_PERSONAL_EMAIL_PROMPT()
                personalGitKey = await ASK_FOR_PERSONAL_GIT_KEY_PROMPT()
            }

            const email = await ASK_FOR_EMAIL_PROMPT()
            const name = await ASK_FOR_NAME_PROMPT()
            const gitKey = await ASK_FOR_GIT_KEY_PROMPT()
            const artifactoryKey = await ASK_FOR_ARTIFACTORY_KEY_PROMPT()

            const replacementObject: Record<ReplacementTemplate, string> = {
                [ReplacementTemplate.EMAIL]: email || ReplacementTemplate.EMAIL,
                [ReplacementTemplate.FULL_NAME]: name || ReplacementTemplate.FULL_NAME,
                [ReplacementTemplate.GIT_KEY]: gitKey || ReplacementTemplate.GIT_KEY,
                [ReplacementTemplate.ARTIFACTORY_AUTH]:
                    artifactoryKey || ReplacementTemplate.ARTIFACTORY_AUTH,
                [ReplacementTemplate.PERSONAL_EMAIL]:
                    personalEmail || ReplacementTemplate.PERSONAL_EMAIL,
                [ReplacementTemplate.PERSONAL_GIT_KEY]:
                    personalGitKey || ReplacementTemplate.PERSONAL_GIT_KEY,
            }

            spinner.start()

            for (const { filePath, copyTo, effects } of ASSETS_TEMPLATES) {
                const newFileContent = await replaceInTemplate(filePath, replacementObject)
                const destination = resolve(BASE_PATH, copyTo)
                await writeFile(destination, newFileContent)

                for (const effect of effects) {
                    await execPromise(effect)
                }
            }

            spinner.succeed()
        } catch (error) {
            this.logger.error(`Failed to setup assets: ${error.stack}`)
            spinner.fail()
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
                this.logger.error(`Failed to resolve deps, error: ${error.stack}`)
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
            this.logger.error(`Failed to install ${name}, error: ${error.stack}`)
        }
    }
}
