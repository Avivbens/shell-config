import { Listr, ListrTask } from 'listr2'
import { Command, CommandRunner, Option } from 'nest-commander'
import { cpus } from 'node:os'
import { arch as ARCH, exit } from 'node:process'
import ora from 'ora'
import { BREW_INSTALL_RETRIES, BREW_NON_ERRORS } from '@common/constants'
import { execPromise } from '@common/utils'
import type { IAppSetup } from '@models/app-setup.model'
import { ITag, TAGS_DEPS } from '@models/tag.model'
import { CheckUpdateService } from '@services/check-update.service'
import { LoggerService } from '@services/logger.service'
import { APPS_CONFIG_MAP } from './config/apps.config'
import { MULTI_SELECT_APPS_PROMPT_V2 } from './config/multi-select-apps.config'
import { HELP_BOX_MESSAGE, TASKS_CONFIG } from './config/parallel.config'
import { USER_TAGS_PROMPT } from './config/user-tags.config'
import { IInstallCommandOptions } from './models/install-command.options'

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

    @Option({
        name: 'noParallel',
        flags: '--no-parallel',
        defaultValue: false,
        description: 'Disable parallel mode for installation',
    })
    private isNoParallel(): boolean {
        return true
    }

    @Option({
        name: 'parallelCount',
        flags: '-p --parallel-count <parallelCount>',
        defaultValue: cpus().length / 2 + 1,
        description: 'Amount of parallel processes for installation',
    })
    private parallelCount(count: string): number {
        const parsed = Number(count)
        if (isNaN(parsed)) {
            this.logger.error('Parallel count should be a number')
            exit(1)
        }

        return parsed
    }

    async run(inputs: string[], options: IInstallCommandOptions): Promise<void> {
        const { noParallel, parallelCount } = options
        await this.checkUpdateService.checkForUpdates()

        try {
            const tags = await USER_TAGS_PROMPT()
            const tagsWithDeps: ITag[] = tags.flatMap((tag) => {
                const deps: ITag[] = TAGS_DEPS[tag] ?? []
                return [tag, ...deps]
            })
            const uniqueTags = [...new Set(tagsWithDeps)]

            const toInstall = await MULTI_SELECT_APPS_PROMPT_V2(uniqueTags)

            const resolvedDeps = this.resolveDeps(toInstall)

            this.logger.debug(`Installing apps, resolvedDeps: ${resolvedDeps.map((app) => app.name).join(', ')}`)
            this.logger.debug(`Current arch ${ARCH}`)

            const firstApps = resolvedDeps.filter((app) => app.first)
            const lastApps = resolvedDeps.filter((app) => app.last)
            const restApps = resolvedDeps.filter((app) => !app.first && !app.last)

            if (noParallel) {
                this.logger.debug('No parallel installation!')

                this.logger.debug(`Installing apps, firstApps: ${firstApps.map((app) => app.name).join(', ')}`)
                for (const app of firstApps) {
                    await this.installApp(app)
                }

                this.logger.debug(`Installing apps, restApps: ${restApps.map((app) => app.name).join(', ')}`)
                for (const app of restApps) {
                    await this.installApp(app)
                }

                this.logger.debug(`Installing apps, lastApps: ${lastApps.map((app) => app.name).join(', ')}`)
                for (const app of lastApps) {
                    await this.installApp(app)
                }

                return
            }

            /**
             * Parallel installation
             */
            console.log(HELP_BOX_MESSAGE)
            await execPromise(`sudo -v`)

            this.logger.debug(`Installing apps, firstApps: ${firstApps.map((app) => app.name).join(', ')}`)
            for (const app of firstApps) {
                await this.installApp(app)
            }

            this.logger.debug(`Installing apps, restApps: ${restApps.map((app) => app.name).join(', ')}`)

            const tasksChunks = this.generateParallelTasks(restApps, parallelCount)

            for (const tasks of tasksChunks) {
                const spinners = new Listr(tasks, TASKS_CONFIG(parallelCount))

                await spinners.run()
            }

            this.logger.debug(`Installing apps, lastApps: ${lastApps.map((app) => app.name).join(', ')}`)

            for (const app of lastApps) {
                await this.installApp(app)
            }
        } catch (error) {
            this.logger.debug(`Error InstallCommand, error: ${error.stack}`)
        }
    }

    /**
     * Resolve dependencies order for apps
     * @returns All apps within the resolved order
     * @throws - If any dependency is not listed
     */
    private resolveDeps(
        apps: IAppSetup[],
        res: IAppSetup[] = [],
        depsMap: Record<string, boolean> = {},
        round = 0,
    ): IAppSetup[] {
        try {
            const [withDeps, noDeps] = this.splitAppsDeps(apps)

            noDeps.forEach((app) => (depsMap[app.name] = true))

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

    /**
     * Get splitted apps by deps / no deps
     * @param apps - List of apps
     * @returns [withDeps, noDeps]
     */
    private splitAppsDeps(apps: IAppSetup[]): [IAppSetup[], IAppSetup[]] {
        const [withDeps, noDeps] = apps.reduce(
            (acc, app) => {
                const { deps } = app
                if (deps?.length) {
                    acc[0].push(app)
                } else {
                    acc[1].push(app)
                }

                return acc
            },
            [[] as IAppSetup[], [] as IAppSetup[]],
        )

        return [withDeps, noDeps]
    }

    /**
     * Build parallel tasks for installation whit dependencies as subtasks
     * @returns Chunks of tasks
     */
    private generateParallelTasks(apps: IAppSetup[], parallelProcessAmount: number): ListrTask[][] {
        const CHUNKS_SIZE = 15
        try {
            /**
             * All selected apps deps enrichment
             *
             * @example
             * {
             *  'Python': [<ALL_PYTHON_DEPS>]
             * }
             */
            const appsDeps: Record<string, IAppSetup[]> = apps.reduce((acc, app) => {
                const { deps } = app
                if (deps?.length) {
                    acc[app.name] = deps.map((dep) => APPS_CONFIG_MAP[dep])
                }

                return acc
            }, {})

            /**
             * All selected apps depend by enrichment
             *
             * @example
             * {
             *  'Python': [<ALL_APPS_DEPEND_ON_PYTHON>]
             * }
             */
            const appsDependBy: Record<string, IAppSetup[]> = apps.reduce((acc, app) => {
                const { deps } = app
                if (!deps?.length) {
                    return acc
                }

                deps.forEach((dep) => {
                    acc[dep] ??= []
                    acc[dep].push(app)
                })

                return acc
            }, {})

            const nonDeps = apps.filter((app) => !appsDeps[app.name])

            /**
             * Build tasks and subtasks by dependencies
             * @param entries - List of apps
             * @returns - List of tasks within inner deps processing
             */
            const buildByDeps = (entries: IAppSetup[]): ListrTask[] => {
                const tasks: ListrTask[] = entries.map((app) => {
                    const { name } = app
                    const dependBy = appsDependBy[name]

                    return {
                        title: `Installing ${name}`,
                        retry: BREW_INSTALL_RETRIES,
                        task: async (ctx, task) => {
                            try {
                                await this.installAppV2(app)

                                if (!dependBy?.length) {
                                    return
                                }

                                const subTasks = buildByDeps(dependBy)
                                return task.newListr(subTasks, TASKS_CONFIG(parallelProcessAmount))
                            } catch (error) {
                                throw new Error(`${name}: ${error.message}`)
                            }
                        },
                    }
                })

                return tasks
            }

            const allTasks = buildByDeps(nonDeps)

            const tasksChunks = this.splitToChunks(allTasks, CHUNKS_SIZE)

            return tasksChunks
        } catch (error) {
            this.logger.error(`Error generateParallelTasks, error: ${error.stack}`)
            throw error
        }
    }

    /**
     * Get splitted entities by chunks
     * @param entities - List of entities
     * @param chunkSize - Size of chunk
     */
    private splitToChunks<T = unknown>(entities: T[], chunkSize: number): T[][] {
        const chunks: T[][] = []
        let i = 0

        while (i < entities.length) {
            chunks.push(entities.slice(i, (i += chunkSize)))
        }

        return chunks
    }

    /**
     * Install app by commands with spinner
     * @param app - App to install
     * @deprecated - Use {@link installAppV2} instead
     */
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
                let forceStop = false

                for (const command of parsedCommands) {
                    if (forceStop) {
                        break
                    }

                    await execPromise(command).catch((err) => {
                        this.logger.debug(
                            `Error installApp app: ${name}, command failed: ${command}, error: ${err.stack}`,
                        )

                        this.processInstallError(err)

                        forceStop = true
                    })
                }
            } catch (error) {
                if (!fallbackCommands) {
                    throw error
                }

                this.logger.debug(`Installing ${name} with fallback commands`)

                const parsedFallbackCommands = fallbackCommands(ARCH)
                let forceStop = false

                for (const command of parsedFallbackCommands) {
                    if (forceStop) {
                        break
                    }

                    await execPromise(command).catch((err) => {
                        this.logger.debug(
                            `Error installApp app: ${name}, fallback command failed: ${command}, error: ${err.stack}`,
                        )

                        this.processInstallError(err)

                        forceStop = true
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

    /**
     * Install app by commands
     * @param app - App to install
     * @throws - If any command fails (including fallback commands)
     */
    private async installAppV2(app: IAppSetup): Promise<void> {
        const { name, commands, fallbackCommands } = app

        try {
            try {
                const parsedCommands = commands(ARCH)
                let forceStop = false

                for (const command of parsedCommands) {
                    if (forceStop) {
                        break
                    }

                    await execPromise(command).catch((err) => {
                        this.logger.debug(
                            `Error installApp app: ${name}, command failed: ${command}, error: ${err.stack}`,
                        )

                        this.processInstallError(err)

                        forceStop = true
                    })
                }
            } catch (error) {
                if (!fallbackCommands) {
                    throw error
                }

                this.logger.debug(`Installing ${name} with fallback commands`)

                const parsedFallbackCommands = fallbackCommands(ARCH)
                let forceStop = false

                for (const command of parsedFallbackCommands) {
                    if (forceStop) {
                        break
                    }

                    await execPromise(command).catch((err) => {
                        this.logger.debug(
                            `Error installApp app: ${name}, fallback command failed: ${command}, error: ${err.stack}`,
                        )

                        this.processInstallError(err)

                        forceStop = true
                    })
                }
            }

            this.installMap.set(name, true)

            const successMsg = `Installed ${name}`
            this.logger.debug(successMsg)
        } catch (error) {
            this.logger.debug(`Error installApp2 app: ${name}, error: ${error.message}`)
            throw error
        }
    }

    /**
     * Checks if an error should be treated as a non-error
     * @returns true - if error should be treated as a non-error
     * @throws - If error should be an error
     */
    private processInstallError(error: Error): void {
        const { message } = error
        const isOk = BREW_NON_ERRORS.some((nonErrorMsg) => message?.includes(nonErrorMsg))
        if (isOk) {
            return
        }

        throw error
    }
}
