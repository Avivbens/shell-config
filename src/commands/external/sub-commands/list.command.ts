import { LoggerService } from '@services/logger.service'
import { CommandRunner, SubCommand } from 'nest-commander'
import { readFile } from 'node:fs/promises'
import { EXTERNAL_REGISTRY_LIST_PATH } from '../config/constants'

@SubCommand({
    name: 'list',
    description: 'Show list of all exists externals shells',
    options: { isDefault: false },
})
export class ListCommand extends CommandRunner {
    constructor(private readonly logger: LoggerService) {
        super()
        this.logger.setContext(ListCommand.name)
    }

    async run(inputs: string[], options: Record<string, any>): Promise<void> {
        try {
            const externals = await this.readList()

            externals.forEach((external) => {
                this.logger.log(`- ${external}`)
            })
        } catch (error) {
            this.logger.error(`Failed to show externals list, error: ${error.stack}`)
        }
    }

    private async readList(): Promise<string[]> {
        try {
            const list = (await readFile(EXTERNAL_REGISTRY_LIST_PATH, { encoding: 'utf-8' })).split(
                '\n',
            )
            const filteredList = list.filter((item) => Boolean(item))

            return filteredList
        } catch (error) {
            this.logger.error(`Error readList, error: ${error.stack}`)
            throw error
        }
    }
}
