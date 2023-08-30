import { LoggerService } from '@services/logger.service'
import { CommandRunner, SubCommand } from 'nest-commander'
import { readdir, rm } from 'node:fs/promises'
import { EXTERNAL_REGISTRY_DIR_PATH } from '../config/constants'

@SubCommand({
    name: 'delete',
    description: 'Delete external shell',
    options: { isDefault: false },
})
export class DeleteSubCommand extends CommandRunner {
    constructor(private readonly logger: LoggerService) {
        super()
        this.logger.setContext(DeleteSubCommand.name)
    }

    async run(inputs: string[], options: Record<string, any>): Promise<void> {
        try {
            const [toDelete] = inputs

            if (!toDelete) {
                this.logger.error('Please provide name of external shell')
                return
            }

            const list = await this.readList()

            const isExists: boolean = list.some((item) => item === toDelete)
            if (!isExists) {
                this.logger.error(`External shell with name '${toDelete}' not found`)
                return
            }

            await rm(`${EXTERNAL_REGISTRY_DIR_PATH}/${toDelete}`)

            this.logger.log(`External shell with name '${toDelete}' deleted`)
        } catch (error) {
            this.logger.error(`Error DeleteCommand, error: ${error.stack}`)
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
