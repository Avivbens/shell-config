import { Command, CommandRunner } from 'nest-commander'
import { copyFile, readdir, rename, symlink } from 'node:fs/promises'
import { resolve } from 'node:path'
import { IShellModule } from '../../models/shell-module.model'
import { LoggerService } from '../../services/logger.service'
import { MULTI_SELECT_MODULES_PROMPT } from './config/multi-select-modules.config'
import { BACKUP_ROOT_ZSH_CONFIRM_PROMPT } from './config/setup-zsh-root.config'
import { MODULES_MAP } from './config/shell-modules.config'

@Command({
    name: 'shell',
    // arguments: '<task>',
    description: 'Setup a shell configuration with a robust set of tools and architecture',
    options: { isDefault: false },
})
export class ShellCommand extends CommandRunner {
    constructor(private readonly logger: LoggerService) {
        super()
    }

    async run(inputs: string[], options: Record<string, any>): Promise<void> {
        try {
            const isBackupRoot: boolean = await BACKUP_ROOT_ZSH_CONFIRM_PROMPT()

            if (isBackupRoot) {
                await this.backupRootZsh()
            }

            await this.linkNewZsh()

            const modulesToDisable: IShellModule[] = await MULTI_SELECT_MODULES_PROMPT()

            this.logger.debug(
                `Modules to disable: ${modulesToDisable.map((module) => module.name).join(', ')}`,
            )

            await this.enableAllModules()

            for (const module of modulesToDisable) {
                await this.disableModule(module)
            }
        } catch (error) {
            this.logger.error(`Failed to setup shell: ${error.stack}`)
            process.exit(1)
        }
    }

    private async backupRootZsh(): Promise<void> {
        try {
            const rootZshPath = resolve(process.env.HOME, '.zshrc')
            const backupRootZshPath = resolve(
                process.env.HOME,
                'Desktop',
                `zshrc.backup-${Date.now()}`,
            )

            this.logger.debug(`Backing up root zsh at ${rootZshPath} to ${backupRootZshPath}`)

            await copyFile(rootZshPath, backupRootZshPath)
        } catch (error) {
            this.logger.error(`Failed to backup root zsh: ${error.stack}`)
        }
    }

    private async linkNewZsh(): Promise<void> {
        try {
            const zshPath = resolve(process.env.HOME, '.zshrc')
            const newZshPath = resolve(process.cwd(), 'zsh', '.zshrc')
            await symlink(newZshPath, zshPath)
        } catch (error) {
            this.logger.error(`Failed to link new zsh: ${error.stack}`)
            throw error
        }
    }

    private async enableAllModules(): Promise<void> {
        try {
            const modulesDirPath = resolve(process.cwd(), 'zsh', 'extends')
            const allModulesPaths: string[] = await readdir(modulesDirPath)
            const allDisabledModulesPaths: string[] = allModulesPaths.filter((modulePath) =>
                modulePath.endsWith('.disabled'),
            )

            const allDisabledModules: IShellModule[] = allDisabledModulesPaths.map((modulePath) => {
                const relativePath = 'zsh/extends/' + modulePath.replace('.disabled', '')
                return MODULES_MAP[relativePath]
            })

            this.logger.debug(
                `Modules to enable: ${allDisabledModules.map((module) => module.name).join(', ')}`,
            )

            for (const module of allDisabledModules) {
                await this.enableModule(module)
            }
        } catch (error) {
            this.logger.error(`Failed to enable all modules: ${error.stack}`)
        }
    }

    private async enableModule(module: IShellModule): Promise<void> {
        try {
            const { path } = module
            const resolvedPath = resolve(process.cwd(), `${path}.disabled`)
            const targetPath = resolve(process.cwd(), path)

            this.logger.debug(`Enabling module ${module.name} at ${resolvedPath}`)

            await rename(resolvedPath, targetPath)
        } catch (error) {
            this.logger.error(`Failed to enable module ${module.name}, error: ${error.stack}`)
        }
    }

    private async disableModule(module: IShellModule): Promise<void> {
        try {
            const { path } = module
            const resolvedPath = resolve(process.cwd(), path)

            this.logger.debug(`Disabling module ${module.name} at ${resolvedPath}`)

            await rename(resolvedPath, `${resolvedPath}.disabled`)
        } catch (error) {
            this.logger.error(`Failed to disable module ${module.name}, error: ${error.stack}`)
        }
    }
}