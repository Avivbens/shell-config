import { LoggerService } from '@services/logger.service'
import { CommandRunner, SubCommand } from 'nest-commander'
import { existsSync } from 'node:fs'
import { copyFile, readFile, writeFile } from 'node:fs/promises'
import { EXTERNAL_REGISTRY_DIR_PATH, EXTERNAL_REGISTRY_LIST_PATH } from '../config/constants'

@SubCommand({
    name: 'install',
    description: 'Install external shell',
    options: { isDefault: false },
    arguments: 'file_path external_name',
    argsDescription: {
        file_path: 'File to set as external shell',
        external_name: 'Name to register under the registry',
    },
})
export class InstallCommand extends CommandRunner {
    constructor(private readonly logger: LoggerService) {
        super()
        this.logger.setContext(InstallCommand.name)
    }

    async run(inputs: string[], options: Record<string, any>): Promise<void> {
        try {
            const [filePath = '', externalName = ''] = inputs

            if (!filePath || !externalName) {
                this.logger.error(`Please provide a valid 'file_path' and 'external_name'`)
                return
            }

            const parsedExternalName = this.parseExternalName(externalName)

            const currentList: string[] = await this.readList()
            const isAlreadyExists: boolean = currentList.some((ex) => ex === parsedExternalName)

            if (isAlreadyExists) {
                this.logger.error(`External with name ${parsedExternalName} already exists!`)
                return
            }

            const isFileExists: boolean = existsSync(filePath)
            if (!isFileExists) {
                this.logger.error(`Unable to find the givin file_path!`)
                return
            }

            const newList: string[] = [...currentList, parsedExternalName]

            const prms = [
                copyFile(filePath, `${EXTERNAL_REGISTRY_DIR_PATH}/${parsedExternalName}`),
                this.writeList(newList),
            ]

            await Promise.allSettled(prms)

            this.logger.log(
                `Installed external shell with name '${parsedExternalName}' successfully`,
            )
        } catch (error) {
            this.logger.error(`Error InstallCommand, error: ${error.stack}`)
        }
    }

    private parseExternalName(name: string): string {
        const externalName = name.replace(/\.sh$/, '')
        const res = `${externalName}.sh`
        return res
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
