import { execPromise } from '@common/utils'
import { CheckUpdateService } from '@services/check-update.service'
import { LoggerService } from '@services/logger.service'
import { Command, CommandRunner, Option } from 'nest-commander'
import {
    DOWNLOAD_FILE_PATH,
    DOWNLOAD_SCRIPT_CUSTOM,
    DOWNLOAD_SCRIPT_LATEST,
    UNZIP_SCRIPT,
    UPDATE_SCRIPT,
} from './config/update-script.config'
import { IUpdateCommandOptions } from './models/update-command.options'
import { existsSync } from 'node:fs'

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
                    this.logger.warn('No version found!')
                    return
                }
            }

            this.logger.log('Downloading new Version...')
            await execPromise(downloadScript)

            this.logger.log('Unzipping new Version...')
            const { stdout: fileName } = await execPromise(UNZIP_SCRIPT)
            const downloadPath = DOWNLOAD_FILE_PATH(fileName)

            const isExists: boolean = existsSync(downloadPath)
            if (!isExists) {
                this.logger.error(
                    `Error while trying to migrate to the new version.\nTry again later.`,
                )
                return
            }

            this.logger.log('Migrating to new Version...')
            await execPromise(UPDATE_SCRIPT(fileName))
        } catch (error) {
            this.logger.error(`Failed to update: ${error.stack}`)
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
        if (!target) throw new Error(`Invalid version: ${version}`)
        return `v${target}`
    }
}
