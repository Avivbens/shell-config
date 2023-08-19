import { execPromise } from '@common/utils'
import { LoggerService } from '@services/logger.service'
import { Command, CommandRunner, Option } from 'nest-commander'
import { DOWNLOAD_SCRIPT, UNZIP_SCRIPT, UPDATE_SCRIPT } from './config/update-script.config'

@Command({
    name: 'update',
    description: 'Update the CLI to the latest version',
    options: { isDefault: false },
})
export class UpdateCommand extends CommandRunner {
    constructor(private readonly logger: LoggerService) {
        super()
    }

    async run(inputs: string[], options: Record<string, any>): Promise<void> {
        try {
            this.logger.log('Downloading new Version...')
            await execPromise(DOWNLOAD_SCRIPT)

            this.logger.log('Unzipping new Version...')
            await execPromise(UNZIP_SCRIPT)

            this.logger.log('Migrating to new Version...')
            await execPromise(UPDATE_SCRIPT)
        } catch (error) {
            this.logger.error(`Failed to update: ${error.stack}`)
        }
    }

    @Option({
        flags: '-v, --version <version>',
        defaultValue: 'latest',
        description: 'Version to update to',
        name: 'version',
    })
    private getVersion(version: string): string {
        return version
    }
}
