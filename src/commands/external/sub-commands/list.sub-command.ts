import { CommandRunner, SubCommand } from 'nest-commander'
import { readdir } from 'node:fs/promises'
import { CheckUpdateService } from '@services/check-update.service'
import { InjectLogger, LoggerService } from '@services/logger'
import { EXTERNAL_REGISTRY_DIR_PATH } from '../config/constants'

@SubCommand({
    name: 'list',
    description: 'Show list of all exists externals shells',
    options: { isDefault: false },
})
export class ListSubCommand extends CommandRunner {
    constructor(
        @InjectLogger(ListSubCommand.name) private readonly logger: LoggerService,
        private readonly checkUpdateService: CheckUpdateService,
    ) {
        super()
    }

    async run(inputs: string[], options: Record<string, unknown>): Promise<void> {
        await this.checkUpdateService.checkForUpdates()

        try {
            const externals = await this.readList()

            if (!externals.length) {
                this.logger.warn('Externals list is empty')
            }

            externals.forEach((external) => {
                this.logger.log(`- ${external}`)
            })
        } catch (error) {
            this.logger.error(`Error ListCommand, error: ${error.stack}`)
        }
    }

    private async readList(): Promise<string[]> {
        try {
            const externals: string[] = await readdir(EXTERNAL_REGISTRY_DIR_PATH)
            const filteredList = externals.filter((item) => Boolean(item) && item !== '.gitkeep')

            return filteredList
        } catch (error) {
            this.logger.error(`Error readList, error: ${error.stack}`)
            throw error
        }
    }
}
