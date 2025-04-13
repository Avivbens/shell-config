import { Command, CommandRunner } from 'nest-commander'
import { existsSync } from 'node:fs'
import { appendFile, chmod, copyFile, mkdir, readFile, readdir, rename, rm } from 'node:fs/promises'
import { homedir } from 'node:os'
import { resolve } from 'node:path'
import ora from 'ora'
import { BASE_PATH } from '@common/constants'
import { copyBundledAsset, execPromise, resolveBundledAsset } from '@common/utils'
import { CheckUpdateService } from '@services/check-update.service'
import { InjectLogger, LoggerService } from '@services/logger'
import {
    BREW_DIRECTORY,
    BREW_INSTALLATION_COMMAND,
    BROW_DIRECTORY,
    BROW_INSTALLATION_COMMAND,
} from './config/brew.config'
import { REDO_INIT_COMMAND_MESSAGE } from './config/init.config'
import { LINK_SHELL_COMMAND, LINK_SHELL_COMMAND_EXISTS } from './config/link-command.config'

@Command({
    name: 'init',
    description:
        'Init shell-config setup with this CLI version. Execute this command only when you want to force-apply the latest shell-config setup',
    options: { isDefault: false, hidden: true },
})
export class InitCommand extends CommandRunner {
    constructor(
        @InjectLogger(InitCommand.name) private readonly logger: LoggerService,
        private readonly checkUpdateService: CheckUpdateService,
    ) {
        super()
    }

    async run(inputs: string[], options: Record<string, unknown>): Promise<void> {
        await this.checkUpdateService.checkForUpdates()

        try {
            const results: boolean[] = []

            results.push(await this.ensureZshrcExists())

            results.push(await this.backupRootZsh())

            results.push(await this.unpackBundledAssets())
            results.push(await this.linkNewZsh())

            results.push(
                await chmod(BASE_PATH, 0o770)
                    .then(() => true)
                    .catch(() => false),
            )

            results.push(await this.handleBrewInstallation())

            const isAllSuccess = results.every((result) => result)

            if (!isAllSuccess) {
                console.log(REDO_INIT_COMMAND_MESSAGE)
            }
        } catch (error) {
            this.logger.error(`Error InitCommand, error: ${error.stack}`)
        }
    }

    private async ensureZshrcExists(): Promise<boolean> {
        try {
            const zshPath = resolve(homedir(), '.zshrc')
            await appendFile(zshPath, '')
            return true
        } catch (error) {
            this.logger.debug(`Error ensureZshrcExists, error: ${error.stack}`)
            return false
        }
    }

    private async backupRootZsh(): Promise<boolean> {
        const spinner = ora('Backup root zsh')
        spinner.start()

        try {
            const rootZshPath = resolve(homedir(), '.zshrc')
            const backupRootZshPath = resolve(homedir(), 'Desktop', `zshrc.backup-${Date.now()}`)

            this.logger.debug(`Backing up root zsh at ${rootZshPath} to ${backupRootZshPath}`)

            await copyFile(rootZshPath, backupRootZshPath)
            spinner.succeed()
            return true
        } catch (error) {
            this.logger.debug(`Error backupRootZsh, error: ${error.stack}`)
            spinner.fail()
            return false
        }
    }

    private async linkNewZsh(): Promise<boolean> {
        const spinner = ora('Setup .zshrc to load shell-config')
        spinner.start()

        try {
            const zshPath = resolve(homedir(), '.zshrc')
            const zshContent = await readFile(zshPath, { encoding: 'utf-8' })

            const isNeedToApplyLink = !LINK_SHELL_COMMAND_EXISTS(zshContent)

            if (!isNeedToApplyLink) {
                this.logger.debug('Link already exists, skipping...')
                spinner.succeed()
                return true
            }

            this.logger.debug(`Linking new zsh to ${zshPath}`)
            await appendFile(zshPath, LINK_SHELL_COMMAND)
            spinner.succeed()

            return true
        } catch (error) {
            this.logger.error(`Error linkNewZsh, error: ${error.stack}`)
            spinner.fail()
            return false
        }
    }

    private async unpackBundledAssets(): Promise<boolean> {
        const spinner = ora('Unpacking bundled assets')
        spinner.start()

        try {
            this.logger.debug(`Unpacking bundled assets to ${BASE_PATH}`)

            const disabledExtendsFilesMap: Record<string, string> = await this.getCurrentExtendsDirDisabledFilesMap()

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
            return true
        } catch (error) {
            this.logger.debug(`Error unpackBundledAssets, error: ${error.stack}`)
            spinner.fail()
            return false
        }
    }

    private async handleBrewInstallation(): Promise<boolean> {
        const spinner = ora('Verifing Homebrew...')
        spinner.start()

        try {
            let brewExists: boolean = existsSync(BREW_DIRECTORY)
            let browExists: boolean = existsSync(BROW_DIRECTORY)

            let fails: 0 | 1 | 2 = 0

            if (!brewExists) {
                const brewInstalled = await this.installBrew()
                if (!brewInstalled) {
                    fails++
                } else {
                    brewExists = true
                }
            }

            if (!browExists) {
                const browInstalled = await this.installBrow()
                if (!browInstalled) {
                    fails++
                } else {
                    browExists = true
                }
            }

            if (brewExists) {
                await this.updateBrew()
            }

            if (browExists) {
                await this.updateBrow()
            }

            const spinnerStatus: Record<0 | 1 | 2, keyof ora.Ora> = {
                0: 'succeed',
                1: 'warn',
                2: 'fail',
            }

            const status = spinnerStatus[fails]
            spinner.text = `Homebrew Verified`
            spinner[status]?.()

            return fails === 0
        } catch (error) {
            this.logger.debug(`Error handleBrewInstallation, error: ${error.stack}`)
            spinner.fail()
            return false
        }
    }

    private async installBrew(): Promise<boolean> {
        const msg = 'Homebrew not installed, installing...'
        const innerSpinner = ora(msg)
        innerSpinner.start()

        this.logger.debug(msg)
        try {
            const { stderr, stdout } = await execPromise(BREW_INSTALLATION_COMMAND)
            this.logger.debug(`installBrew | stdout: ${stdout}`)
            this.logger.debug(`installBrew | stderr: ${stderr}`)

            innerSpinner.text = 'Homebrew installed'
            innerSpinner.succeed()
            return true
        } catch (error) {
            this.logger.debug(`Error installBrew, error: ${error.stack}`)
            innerSpinner.text = 'Homebrew not installed'
            innerSpinner.fail()
            return false
        }
    }

    private async installBrow(): Promise<boolean> {
        const msg = 'Homebrew 64x arch is not installed, installing...'
        const innerSpinner = ora(msg)
        innerSpinner.start()

        this.logger.debug(msg)
        try {
            const { stderr, stdout } = await execPromise(BROW_INSTALLATION_COMMAND)
            this.logger.debug(`installBrow | stdout: ${stdout}`)
            this.logger.debug(`installBrow | stderr: ${stderr}`)

            innerSpinner.text = 'Homebrew 64x arch installed'
            innerSpinner.succeed()
            return true
        } catch (error) {
            this.logger.debug(`Error installBrow, error: ${error.stack}`)
            innerSpinner.text = 'Homebrew 64x arch not installed'
            innerSpinner.fail()
            return false
        }
    }

    private async updateBrew(): Promise<boolean> {
        const msg = 'Updating Homebrew...'
        const innerSpinner = ora(msg)
        innerSpinner.start()

        this.logger.debug(msg)
        try {
            await execPromise(`${BREW_DIRECTORY} update`)
            innerSpinner.text = 'Homebrew updated'
            innerSpinner.succeed()
            return true
        } catch (error) {
            this.logger.debug(`Error updateBrew, error: ${error.stack}`)
            innerSpinner.text = 'Homebrew not updated'
            innerSpinner.warn()
            return false
        }
    }

    private async updateBrow(): Promise<boolean> {
        const msg = 'Updating Homebrew 64x arch...'
        const innerSpinner = ora(msg)
        innerSpinner.start()

        this.logger.debug(msg)
        try {
            await execPromise(`${BROW_DIRECTORY} update`)
            innerSpinner.text = 'Homebrew 64x arch updated'
            innerSpinner.succeed()
            return true
        } catch (error) {
            this.logger.debug(`Error updateBrow, error: ${error.stack}`)
            innerSpinner.text = 'Homebrew 64x arch not updated'
            innerSpinner.warn()
            return false
        }
    }

    private async getCurrentExtendsDirDisabledFilesMap(): Promise<Record<string, string>> {
        try {
            const extendsFiles: string[] = await this.getExtendsFiles()

            const disabledFiles = extendsFiles.filter((fileName: string) => fileName.endsWith('.disabled'))

            const disabledFilesMap: Record<string, string> = disabledFiles.reduce((acc, curr) => {
                const originalName = curr.replace('.disabled', '')
                acc[originalName] = curr
                return acc
            }, {})

            return disabledFilesMap
        } catch (error) {
            this.logger.debug(`Error getCurrentExtendsDirDisabledFiles, error: ${error.stack}`)
            throw error
        }
    }

    private async getExtendsFiles(): Promise<string[]> {
        try {
            const dirPath = `${BASE_PATH}/zsh/extends`
            const extendsFiles: string[] = await readdir(dirPath).catch(() => [])

            return extendsFiles
        } catch (error) {
            this.logger.debug(`Error getExtendsFiles, error: ${error.stack}`)
            throw error
        }
    }
}
