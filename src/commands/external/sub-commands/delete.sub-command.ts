import { LoggerService } from '@services/logger.service'
import { CommandRunner, SubCommand } from 'nest-commander'
import { readFile, rm, writeFile } from 'node:fs/promises'
import { EXTERNAL_REGISTRY_DIR_PATH, EXTERNAL_REGISTRY_LIST_PATH } from '../config/constants'

@SubCommand({
    name: 'delete',
    description: 'Delete external shell',
    options: { isDefault: false },
})
export class DeleteCommand extends CommandRunner {
    constructor(private readonly logger: LoggerService) {
        super()
        this.logger.setContext(DeleteCommand.name)
    }

    async run(inputs: string[], options: Record<string, any>): Promise<void> {
        try {
            const [toDelete] = inputs

            if (!toDelete) {
                this.logger.error('Please provide name of external shell')
                return
            }

            const list = await this.readList()
            const filteredList = list.filter((item) => item !== toDelete)
            if (list.length === filteredList.length) {
                this.logger.error(`External shell with name ${toDelete} not found`)
                return
            }

            const prms = [
                rm(`${EXTERNAL_REGISTRY_DIR_PATH}/${toDelete}`),
                this.writeList(filteredList),
            ]

            await Promise.allSettled(prms)

            this.logger.log(`External shell with name '${toDelete}' deleted`)
        } catch (error) {
            this.logger.error(`Error delete external shell, error: ${error.stack}`)
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

    private async writeList(list: string[]): Promise<void> {
        try {
            const listWithEmptyLine = [...list, '']
            await writeFile(EXTERNAL_REGISTRY_LIST_PATH, listWithEmptyLine.join('\n'))
        } catch (error) {
            this.logger.error(`Error writeList, error: ${error.stack}`)
            throw error
        }
    }
}
