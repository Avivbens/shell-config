import { execPromise } from '@common/utils'
import { CheckUpdateService } from '@services/check-update.service'
import { LoggerService } from '@services/logger.service'
import { Command, CommandRunner, Option } from 'nest-commander'
import { existsSync } from 'node:fs'
import { setTimeout } from 'node:timers/promises'
import ora from 'ora'
import {
    DOWNLOAD_FILE_PATH,
    DOWNLOAD_SCRIPT_CUSTOM,
    DOWNLOAD_SCRIPT_LATEST,
    INIT_SCRIPT,
    MIGRATE_SCRIPT,
    UNZIP_SCRIPT,
} from './config/update-script.config'
import { IUpdateCommandOptions } from './models/update-command.options'

@Command({
    name: 'update',
    description: 'Update the CLI to the latest version',
    options: { isDefault: false },
})
export class UpdateCommand extends CommandRunner {
    constructor(
        private readonly logger: LoggerService,
        private readonly checkUpdateService: CheckUpdateService,
    ) {
        super()
        this.logger.setContext(UpdateCommand.name)
    }

    async run(inputs: string[], options: IUpdateCommandOptions): Promise<void> {
        const { target: version, mute } = options

        if (mute) {
            // abort check for update to prevent exceed api calls
            const randomAbort = Math.random() > 0.1
            if (randomAbort) {
                return
            }

            await this.checkUpdateService.checkForUpdates()
            return
        }

        const spinner = ora('Starting update...')
        spinner.start()

        try {
            let downloadScript: string

            switch (version) {
                case 'latest': {
                    downloadScript = DOWNLOAD_SCRIPT_LATEST
                    break
                }

                default: {
                    downloadScript = DOWNLOAD_SCRIPT_CUSTOM(version)
                    break
                }
            }

            if (version !== 'latest') {
                const isVerified: boolean = await this.verifyCustomVersion(version)
                if (!isVerified) {
                    spinner.fail('Failed to update')
                    this.logger.warn('No version found!')
                    return
                }
            }

            const downloadMsg = 'Downloading new Version...'
            this.logger.debug(downloadMsg)
            spinner.text = downloadMsg
            await execPromise(downloadScript)

            const unzipMsg = 'Unzipping new Version...'
            this.logger.debug(unzipMsg)
            spinner.text = unzipMsg
            const { stdout: fileName } = await execPromise(UNZIP_SCRIPT)
            const downloadPath = DOWNLOAD_FILE_PATH(fileName)

            const isExists: boolean = existsSync(downloadPath)
            if (!isExists) {
                this.logger.error(
                    `Error while trying to migrate to the new version.\nTry again later.`,
                )
                spinner.fail('Failed to update')
                return
            }

            const migrateMsg = 'Migrating to new Version...'
            spinner.text = migrateMsg
            this.logger.debug(migrateMsg)
            await execPromise(MIGRATE_SCRIPT(fileName))

            const applyMsg = 'Apply changes...'
            spinner.text = applyMsg
            this.logger.debug(applyMsg)
            await Promise.race([
                execPromise(INIT_SCRIPT),
                setTimeout(10_000).then(() => {
                    this.logger.warn('Failed to apply changes.')
                }),
            ])

            spinner.succeed('Updated successfully!')
        } catch (error) {
            this.logger.error(`Error UpdateCommand, Error: ${error.stack}`)
            spinner.fail('Failed to update')
        }
    }

    private async verifyCustomVersion(version: string): Promise<boolean> {
        try {
            const releases = await this.checkUpdateService.getGithubReleases()
            const targetVersion = releases.find((release) => {
                const { name } = release
                const isTargetVersion: boolean = name === version
                return isTargetVersion
            })

            if (!targetVersion) {
                this.logger.warn(`No version found!`)
                return false
            }

            return true
        } catch (error) {
            this.logger.error(`Error verifyCustomVersion, error: ${error.stack}`)
            return false
        }
    }

    @Option({
        flags: '-t, --target <target>',
        defaultValue: 'latest',
        description: 'Select update version',
    })
    private getVersion(version: string): string {
        if (version === 'latest') {
            return 'latest'
        }

        const parsedVersion = version.match(/v?(\d+\.\d+\.\d+)(\-beta\.\d+)?/)
        const [, target, suffixBeta] = parsedVersion ?? []
        if (!target) {
            throw new Error(`Invalid version: ${version}`)
        }
        return `v${target}${suffixBeta ?? ''}`
    }

    @Option({
        flags: '-m, --mute',
        defaultValue: false,
        description: 'Daemon check for update notification. When specified is true.',
    })
    private checkForUpdateMute(mute: string): boolean {
        return true
    }
}
