import { Command, CommandRunner, Option } from 'nest-commander'
import { exit } from 'node:process'
import { InstallCommand } from '@commands/install/install.command'
import { execPromise } from '@common/utils'
import { LoggerService } from '@nestjs/common'
import { InjectLogger } from '@services/logger'
import { HOMEPAGE_URL, RELEASE_NOTES_URL } from './config/cli-assets.config'
import { IInfoCommandOptions } from './models/info.options'

@Command({
    name: 'info',
    description: 'View the shell-config CLI assets - release notes, homepage, etc 🚀',
    options: { isDefault: false },
})
export class InfoCommand extends CommandRunner {
    constructor(@InjectLogger(InstallCommand.name) private readonly logger: LoggerService) {
        super()
    }

    @Option({
        name: 'homepage',
        flags: '--homepage',
        defaultValue: false,
        description: 'Open the homepage of the shell-config CLI',
    })
    private homepage(): boolean {
        return true
    }

    @Option({
        name: 'releaseNotes',
        flags: '--release-notes, -r',
        defaultValue: true,
        description: 'Open the release notes of the shell-config CLI',
    })
    private releaseNote(): boolean {
        return true
    }

    private async openAsset(asset: string): Promise<void> {
        try {
            const command = `open "${asset}"`
            await execPromise(command)
        } catch (error) {
            this.logger.debug(`Error openAsset | error: ${error.stack}`)
            throw error
        }
    }

    async run(inputs: string[], options: IInfoCommandOptions): Promise<void> {
        try {
            const { homepage, releaseNotes } = options
            if (homepage) {
                return this.openAsset(HOMEPAGE_URL)
            }

            if (releaseNotes) {
                return this.openAsset(RELEASE_NOTES_URL)
            }
        } catch (error) {
            this.logger.debug(`Error InstallCommand, error: ${error.stack}`)
            this.logger.error(`Unknown error - please try again.`)
            exit(1)
        }
    }
}
