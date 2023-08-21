import { execPromise } from '@common/utils'
import { CheckUpdateService } from '@services/check-update.service'
import { LoggerService } from '@services/logger.service'
import { Command, CommandRunner, Option } from 'nest-commander'
import { existsSync } from 'node:fs'
import ora from 'ora'
import {
    DOWNLOAD_FILE_PATH,
    DOWNLOAD_SCRIPT_CUSTOM,
    DOWNLOAD_SCRIPT_LATEST,
    UNZIP_SCRIPT,
    UPDATE_SCRIPT,
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
    }

    async run(inputs: string[], options: IUpdateCommandOptions): Promise<void> {
        const spinner = ora('Starting update...')
        spinner.start()

        try {
            const { version } = options
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
            this.logger.log(downloadMsg)
            spinner.text = downloadMsg
            await execPromise(downloadScript)

            const unzipMsg = 'Unzipping new Version...'
            this.logger.log(unzipMsg)
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
            this.logger.log(migrateMsg)
            await execPromise(UPDATE_SCRIPT(fileName))

            spinner.succeed('Updated successfully!')
        } catch (error) {
            this.logger.error(`Failed to update: ${error.stack}`)
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
                const msg = `No version found!`
                console.log(msg)
                this.logger.warn(msg)
                return false
            }

            return true
        } catch (error) {
            this.logger.error(`Failed to update: ${error.stack}`)
            return false
        }
    }

    @Option({
        flags: '-v, --version <version>',
        defaultValue: 'latest',
        description: 'Select update version',
        name: 'version',
    })
    private getVersion(version: string): string {
        const parsedVersion = version.match(/v?(\d+\.\d+\.\d+)/)
        const target = parsedVersion?.[1]
        if (!target) {
            throw new Error(`Invalid version: ${version}`)
        }
        return `v${target}`
    }
}