import { BASE_PATH } from '@common/constants'
import type { IShellModule } from '@models/shell-module.model'
import { CheckUpdateService } from '@services/check-update.service'
import { LoggerService } from '@services/logger.service'
import { Command, CommandRunner } from 'nest-commander'
import { readdir, rename } from 'node:fs/promises'
import { resolve } from 'node:path'
import { MULTI_SELECT_MODULES_PROMPT } from './config/multi-select-modules.config'
import {
    EXTENDS_MODULES_DIR_PATH,
    LOCAL_MODULES_DIR_PATH,
    MODULES_MAP,
} from './config/shell-modules.config'

@Command({
    name: 'shell',
    description: 'Setup a shell configuration with a robust set of tools and architecture',
    options: { isDefault: false },
})
export class ShellCommand extends CommandRunner {
    constructor(
        private readonly logger: LoggerService,
        private readonly checkUpdateService: CheckUpdateService,
    ) {
        super()
        this.logger.setContext(ShellCommand.name)
    }

    async run(inputs: string[], options: Record<string, any>): Promise<void> {
        await this.checkUpdateService.checkForUpdates()

        try {
            const currentConfig = await readdir(LOCAL_MODULES_DIR_PATH)
            const modulesToDisable: IShellModule[] = await MULTI_SELECT_MODULES_PROMPT(
                currentConfig,
            )

            this.logger.debug(
                `Modules to disable: ${modulesToDisable.map((module) => module.name).join(', ')}`,
            )

            await this.enableAllModules()

            for (const module of modulesToDisable) {
                await this.disableModule(module)
            }
        } catch (error) {
            this.logger.error(`Error ShellCommand, error: ${error.stack}`)
        }
    }

    private async enableAllModules(): Promise<void> {
        try {
            const allModulesPaths: string[] = await readdir(LOCAL_MODULES_DIR_PATH)
            const allDisabledModulesPaths: string[] = allModulesPaths.filter((modulePath) =>
                modulePath.endsWith('.disabled'),
            )

            const allDisabledModules: IShellModule[] = allDisabledModulesPaths.map((modulePath) => {
                const relativePath =
                    `${EXTENDS_MODULES_DIR_PATH}/` + modulePath.replace('.disabled', '')
                return MODULES_MAP[relativePath]
            })

            this.logger.debug(
                `Modules to enable: ${allDisabledModules.map((module) => module.name).join(', ')}`,
            )

            for (const module of allDisabledModules) {
                await this.enableModule(module)
            }
        } catch (error) {
            this.logger.error(`Error enableAllModules, error: ${error.stack}`)
        }
    }

    private async enableModule(module: IShellModule): Promise<void> {
        try {
            const { path } = module
            const resolvedPath = resolve(BASE_PATH, `${path}.disabled`)
            const targetPath = resolve(BASE_PATH, path)

            this.logger.debug(`Enabling module ${module.name} at ${resolvedPath}`)

            await rename(resolvedPath, targetPath)
        } catch (error) {
            this.logger.error(`Error enableModule ${module.name}, error: ${error.stack}`)
        }
    }

    private async disableModule(module: IShellModule): Promise<void> {
        try {
            const { path } = module
            const resolvedPath = resolve(BASE_PATH, path)

            this.logger.debug(`Disabling module ${module.name} at ${resolvedPath}`)

            await rename(resolvedPath, `${resolvedPath}.disabled`)
        } catch (error) {
            this.logger.error(`Error disableModule ${module.name}, error: ${error.stack}`)
        }
    }
}
