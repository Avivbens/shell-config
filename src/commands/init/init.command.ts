import { BASE_PATH } from '@common/constants'
import { copyBundledAsset, resolveBundledAsset } from '@common/utils'
import { LoggerService } from '@services/logger.service'
import { Command, CommandRunner } from 'nest-commander'
import { copyFile, mkdir, rm, symlink } from 'node:fs/promises'
import { homedir } from 'node:os'
import { resolve } from 'node:path'

@Command({
    name: 'init',
    description:
        'Init shell-config setup with this CLI version. Execute this command only when you want to force-apply the latest shell-config setup',
    options: { isDefault: false },
})
export class InitCommand extends CommandRunner {
    constructor(private readonly logger: LoggerService) {
        super()
    }

    async run(inputs: string[], options: Record<string, any>): Promise<void> {
        try {
            // const isBackupRoot: boolean = await BACKUP_ROOT_ZSH_CONFIRM_PROMPT()

            // if (isBackupRoot) {
            // }

            await this.backupRootZsh()

            await this.unpackBundledAssets()

            await this.linkNewZsh()
        } catch (error) {
            this.logger.error(`Failed to init shell-config CLI, error: ${error.stack}`)
        }
    }

    private async backupRootZsh(): Promise<void> {
        try {
            const rootZshPath = resolve(homedir(), '.zshrc')
            const backupRootZshPath = resolve(homedir(), 'Desktop', `zshrc.backup-${Date.now()}`)

            this.logger.debug(`Backing up root zsh at ${rootZshPath} to ${backupRootZshPath}`)

            await copyFile(rootZshPath, backupRootZshPath)
        } catch (error) {
            this.logger.error(`Failed to backup root zsh: ${error.stack}`)
        }
    }

    private async linkNewZsh(): Promise<void> {
        try {
            const zshPath = resolve(homedir(), '.zshrc')
            const newZshPath = resolve(BASE_PATH, 'zsh', '.zshrc')

            this.logger.debug(`Linking new zsh at ${newZshPath} to ${zshPath}`)
            await rm(zshPath).catch(() => {})
            await symlink(newZshPath, zshPath)
        } catch (error) {
            this.logger.error(`Failed to link new zsh: ${error.stack}`)
        }
    }

    private async unpackBundledAssets(): Promise<void> {
        try {
            this.logger.debug(`Unpacking bundled assets to ${BASE_PATH}`)
            const prmsMake = [
                mkdir(`${BASE_PATH}/zsh`, { recursive: true }),
                mkdir(`${BASE_PATH}/assets`, { recursive: true }),
            ]
            await Promise.allSettled(prmsMake)

            this.logger.debug(`Copying bundled assets to ${BASE_PATH}`)

            const assetsPath = resolveBundledAsset(__dirname, 'assets/')
            const zshPath = resolveBundledAsset(__dirname, 'zsh/')

            const prmsCopy = [
                copyBundledAsset(assetsPath, `${BASE_PATH}/assets`, this.logger),
                copyBundledAsset(zshPath, `${BASE_PATH}/zsh`, this.logger),
            ]

            await Promise.all(prmsCopy)

            this.logger.debug(`Finished unpacking bundled assets to ${BASE_PATH}`)
        } catch (error) {
            this.logger.error(`Failed unpacking bundled assets, error: ${error.stack}`)
            throw error
        }
    }
}
