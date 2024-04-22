import { Command, CommandRunner } from 'nest-commander'
import { arch as ARCH } from 'node:process'
import ora from 'ora'
import { execPromise } from '@common/utils'
import type { IAppSetup } from '@models/app-setup.model'
import { ITag, TAGS_DEPS } from '@models/tag.model'
import { CheckUpdateService } from '@services/check-update.service'
import { LoggerService } from '@services/logger.service'
import { MULTI_SELECT_APPS_PROMPT } from './config/multi-select-apps.config'
import { USER_TAGS_PROMPT } from './config/user-tags.config'

@Command({
    name: 'install',
    description: 'Install MacOS setup with Multi-Selection',
    options: { isDefault: false },
})
export class InstallCommand extends CommandRunner {
    private readonly installMap = new Map<string, boolean>()

    constructor(
        private readonly logger: LoggerService,
        private readonly checkUpdateService: CheckUpdateService,
    ) {
        super()
        this.logger.setContext(InstallCommand.name)
    }

    async run(inputs: string[], options: Record<string, unknown>): Promise<void> {
        await this.checkUpdateService.checkForUpdates()

        try {
            const tags = await USER_TAGS_PROMPT()
            const tagsWithDeps: ITag[] = tags.flatMap((tag) => {
                const deps: ITag[] = TAGS_DEPS[tag] ?? []
                return [tag, ...deps]
            })
            const uniqueTags = [...new Set(tagsWithDeps)]

            const toInstall = await MULTI_SELECT_APPS_PROMPT(uniqueTags)

            const order = this.resolveDeps(toInstall).sort((a, b) => {
                if (a.last) {
                    return 1
                }

                if (b.last) {
                    return -1
                }

                return 0
            })

            this.logger.debug(`Installing apps: ${order.map((app) => app.name).join(', ')}`)

            this.logger.debug(`Current arch ${ARCH}`)

            for (const app of order) {
                await this.installApp(app)
            }
        } catch (error) {
            this.logger.debug(`Error InstallCommand, error: ${error.stack}`)
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

            return this.resolveDeps(toCheck, res, depsMap, round + 1)
        } catch (error) {
            if (round === 0) {
                this.logger.error(
                    `Error resolveDeps, Not all dependencies are listed, here is a list by <To Install> - <Dependency>: \n${apps
                        .map((app) => `${app.name} - ${app.deps?.join(', ')}`)
                        .join('\n')}`,
                )
                this.logger.debug(`Error resolveDeps, error: ${error.stack}`)
            }

            throw error
        }
    }

    private async installApp(app: IAppSetup): Promise<void> {
        const { name, commands, fallbackCommands } = app
        const spinner = ora({
            text: `Installing ${name}`,
            hideCursor: false,
            discardStdin: false,
        })
        spinner.start()

        try {
            try {
                const parsedCommands = commands(ARCH)
                for (const command of parsedCommands) {
                    await execPromise(command).catch((err) => {
                        this.logger.debug(
                            `Error installApp app: ${name}, command failed: ${command}, error: ${err.stack}`,
                        )
                        throw err
                    })
                }
            } catch (error) {
                if (!fallbackCommands) {
                    throw error
                }

                this.logger.debug(`Installing ${name} with fallback commands`)

                const parsedFallbackCommands = fallbackCommands(ARCH)
                for (const command of parsedFallbackCommands) {
                    await execPromise(command).catch((err) => {
                        this.logger.debug(
                            `Error installApp app: ${name}, fallback command failed: ${command}, error: ${err.stack}`,
                        )
                        throw err
                    })
                }
            }

            this.installMap.set(name, true)

            const successMsg = `Installed ${name}`
            spinner.succeed(successMsg)
            this.logger.debug(successMsg)
        } catch (error) {
            spinner.fail()
            this.logger.error(`Error installApp app: ${name}, error: ${error.message}`)
        }
    }
}
