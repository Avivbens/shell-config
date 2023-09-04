import { BASE_PATH } from '@common/constants'
import { copyBundledAsset, resolveBundledAsset } from '@common/utils'
import { CheckUpdateService } from '@services/check-update.service'
import { LoggerService } from '@services/logger.service'
import { Command, CommandRunner } from 'nest-commander'
import { appendFile, copyFile, mkdir, readFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { resolve } from 'node:path'
import { LINK_SHELL_COMMAND, LINK_SHELL_COMMAND_EXISTS } from './config/link-command.config'

@Command({
    name: 'init',
    description:
        'Init shell-config setup with this CLI version. Execute this command only when you want to force-apply the latest shell-config setup',
    options: { isDefault: false, hidden: true },
})
export class InitCommand extends CommandRunner {
    constructor(
        private readonly logger: LoggerService,
        private readonly checkUpdateService: CheckUpdateService,
    ) {
        super()
        this.logger.setContext(InitCommand.name)
    }

    async run(inputs: string[], options: Record<string, any>): Promise<void> {
        await this.checkUpdateService.checkForUpdates()

        try {
            await this.ensureZshrcExists()
            await this.backupRootZsh()

            await this.unpackBundledAssets()
            await this.linkNewZsh()
        } catch (error) {
            this.logger.error(`Error InitCommand, error: ${error.stack}`)
        }
    }

    private async ensureZshrcExists(): Promise<void> {
        try {
            const zshPath = resolve(homedir(), '.zshrc')
            await appendFile(zshPath, '')
        } catch (error) {
            this.logger.error(`Error ensureZshrcExists, error: ${error.stack}`)
        }
    }

    private async backupRootZsh(): Promise<void> {
        try {
            const rootZshPath = resolve(homedir(), '.zshrc')
            const backupRootZshPath = resolve(homedir(), 'Desktop', `zshrc.backup-${Date.now()}`)

            this.logger.debug(`Backing up root zsh at ${rootZshPath} to ${backupRootZshPath}`)

            await copyFile(rootZshPath, backupRootZshPath)
        } catch (error) {
            this.logger.error(`Error backupRootZsh, error: ${error.stack}`)
        }
    }

    private async linkNewZsh(): Promise<void> {
        try {
            const zshPath = resolve(homedir(), '.zshrc')
            const zshContent = await readFile(zshPath, { encoding: 'utf-8' })

            const isNeedToApplyLink: boolean = !LINK_SHELL_COMMAND_EXISTS(zshContent)

            if (!isNeedToApplyLink) {
                this.logger.debug('Link already exists, skipping...')
                return
            }

            this.logger.debug(`Linking new zsh to ${zshPath}`)
            await appendFile(zshPath, LINK_SHELL_COMMAND)
        } catch (error) {
            this.logger.error(`Error linkNewZsh, error: ${error.stack}`)
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
            this.logger.error(`Error unpackBundledAssets, error: ${error.stack}`)
            throw error
        }
    }
}
