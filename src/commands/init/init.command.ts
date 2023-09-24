import { BASE_PATH } from '@common/constants'
import { copyBundledAsset, execPromise, resolveBundledAsset } from '@common/utils'
import { CheckUpdateService } from '@services/check-update.service'
import { LoggerService } from '@services/logger.service'
import { Command, CommandRunner } from 'nest-commander'
import { existsSync } from 'node:fs'
import { appendFile, chmod, copyFile, mkdir, readFile, readdir, rename, rm } from 'node:fs/promises'
import { homedir } from 'node:os'
import { resolve } from 'node:path'
import ora from 'ora'
import {
    BREW_DIRECTORY,
    BREW_INSTALLATION_COMMAND,
    BROW_DIRECTORY,
    BROW_INSTALLATION_COMMAND,
} from './config/brew.config'
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

            await chmod(BASE_PATH, 0o770)

            await this.handleBrewInstallation()
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
        const spinner = ora('Backup root zsh')
        spinner.start()

        try {
            const rootZshPath = resolve(homedir(), '.zshrc')
            const backupRootZshPath = resolve(homedir(), 'Desktop', `zshrc.backup-${Date.now()}`)

            this.logger.debug(`Backing up root zsh at ${rootZshPath} to ${backupRootZshPath}`)

            await copyFile(rootZshPath, backupRootZshPath)
            spinner.succeed()
        } catch (error) {
            this.logger.error(`Error backupRootZsh, error: ${error.stack}`)
            spinner.fail()
        }
    }

    private async linkNewZsh(): Promise<void> {
        const spinner = ora('Setup .zshrc to load shell-config')
        spinner.start()

        try {
            const zshPath = resolve(homedir(), '.zshrc')
            const zshContent = await readFile(zshPath, { encoding: 'utf-8' })

            const isNeedToApplyLink = !LINK_SHELL_COMMAND_EXISTS(zshContent)

            if (!isNeedToApplyLink) {
                this.logger.debug('Link already exists, skipping...')
                spinner.succeed()
                return
            }

            this.logger.debug(`Linking new zsh to ${zshPath}`)
            await appendFile(zshPath, LINK_SHELL_COMMAND)
            spinner.succeed()
        } catch (error) {
            this.logger.error(`Error linkNewZsh, error: ${error.stack}`)
            spinner.fail()
        }
    }

    private async unpackBundledAssets(): Promise<void> {
        const spinner = ora('Unpacking bundled assets')
        spinner.start()

        try {
            this.logger.debug(`Unpacking bundled assets to ${BASE_PATH}`)

            const disabledExtendsFilesMap: Record<string, string> =
                await this.getCurrentExtendsDirDisabledFilesMap()

            await mkdir(`${BASE_PATH}/zsh`, { recursive: true }).catch(() => {})
            await rm(`${BASE_PATH}/zsh/extends`, { recursive: true, force: true }).catch(() => {})

            this.logger.debug(`Copying bundled assets to ${BASE_PATH}`)

            const zshPath = resolveBundledAsset(__dirname, 'zsh/')

            await copyBundledAsset(zshPath, `${BASE_PATH}/zsh`, this.logger)

            this.logger.debug(
                `Disabling files: ${Object.entries(disabledExtendsFilesMap)
                    .map(([originalName]) => originalName)
                    .join(', ')}`,
            )

            const extendsFiles: string[] = await this.getExtendsFiles()
            this.logger.debug(`Found extends files: ${extendsFiles.join(', ')}`)

            const prms = extendsFiles.map(async (fileOriginalName: string) => {
                const disabledName = disabledExtendsFilesMap[fileOriginalName]
                if (!disabledName) {
                    return
                }

                this.logger.debug(`Disabling file ${fileOriginalName} => ${disabledName}`)

                return rename(
                    `${BASE_PATH}/zsh/extends/${fileOriginalName}`,
                    `${BASE_PATH}/zsh/extends/${disabledName}`,
                )
            })

            await Promise.all(prms)

            this.logger.debug(`Finished unpacking bundled assets to ${BASE_PATH}`)
            spinner.succeed()
        } catch (error) {
            this.logger.error(`Error unpackBundledAssets, error: ${error.stack}`)
            spinner.fail()
            throw error
        }
    }

    private async handleBrewInstallation(): Promise<void> {
        const spinner = ora('Installing brew...')
        spinner.start()

        try {
            const brewExists: boolean = existsSync(BREW_DIRECTORY)
            const browExists: boolean = existsSync(BROW_DIRECTORY)

            let fails: 0 | 1 | 2 = 0

            if (!brewExists) {
                const brewInstalled = await this.installBrew()
                !brewInstalled && fails++
            }

            if (!browExists) {
                const browInstalled = await this.installBrow()
                !browInstalled && fails++
            }

            const spinnerStatus: Record<0 | 1 | 2, keyof ora.Ora> = {
                0: 'succeed',
                1: 'warn',
                2: 'fail',
            }

            const status = spinnerStatus[fails]
            spinner[status]?.()
        } catch (error) {
            this.logger.debug(`Error handleBrewInstallation, error: ${error.stack}`)
            spinner.fail()
        }
    }

    private async installBrew(): Promise<boolean> {
        const msg = 'Brew not installed, installing...'
        const innerSpinner = ora(msg)
        innerSpinner.start()

        this.logger.debug(msg)
        try {
            await execPromise(BREW_INSTALLATION_COMMAND)
            innerSpinner.succeed()
            return true
        } catch (error) {
            this.logger.debug(`Error installing brew, error: ${error.stack}`)
            innerSpinner.fail()
            return false
        }
    }

    private async installBrow(): Promise<boolean> {
        const msg = 'Brew with architecture of 64 is not installed, installing...'
        const innerSpinner = ora(msg)
        innerSpinner.start()

        this.logger.debug(msg)
        try {
            await execPromise(BROW_INSTALLATION_COMMAND)
            innerSpinner.succeed()
            return true
        } catch (error) {
            this.logger.debug(`Error installing brow, error: ${error.stack}`)
            innerSpinner.fail()
            return false
        }
    }

    private async getCurrentExtendsDirDisabledFilesMap(): Promise<Record<string, string>> {
        try {
            const extendsFiles: string[] = await this.getExtendsFiles()

            const disabledFiles = extendsFiles.filter((fileName: string) =>
                fileName.endsWith('.disabled'),
            )

            const disabledFilesMap: Record<string, string> = disabledFiles.reduce((acc, curr) => {
                const originalName = curr.replace('.disabled', '')
                acc[originalName] = curr
                return acc
            }, {})

            return disabledFilesMap
        } catch (error) {
            this.logger.error(`Error getCurrentExtendsDirDisabledFiles, error: ${error.stack}`)
            throw error
        }
    }

    private async getExtendsFiles(): Promise<string[]> {
        try {
            const dirPath = `${BASE_PATH}/zsh/extends`
            const extendsFiles: string[] = await readdir(dirPath).catch(() => [])

            return extendsFiles
        } catch (error) {
            this.logger.error(`Error getExtendsFiles, error: ${error.stack}`)
            throw error
        }
    }
}
