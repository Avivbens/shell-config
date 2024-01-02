import { LoggerService } from '@services/logger.service'
import { CommandRunner, SubCommand } from 'nest-commander'
import { existsSync } from 'node:fs'
import { CheckUpdateService } from '@services/check-update.service'
import { copyFile, readdir } from 'node:fs/promises'
import { EXTERNAL_REGISTRY_DIR_PATH } from '../config/constants'

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
export class InstallSubCommand extends CommandRunner {
    constructor(
        private readonly logger: LoggerService,
        private readonly checkUpdateService: CheckUpdateService,
    ) {
        super()
        this.logger.setContext(InstallSubCommand.name)
    }

    async run(inputs: string[], options: Record<string, unknown>): Promise<void> {
        await this.checkUpdateService.checkForUpdates()

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

            await copyFile(filePath, `${EXTERNAL_REGISTRY_DIR_PATH}/${parsedExternalName}`)

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
            const externals: string[] = await readdir(EXTERNAL_REGISTRY_DIR_PATH)
            const filteredList = externals.filter((item) => Boolean(item) && item !== '.gitkeep')

            return filteredList
        } catch (error) {
            this.logger.error(`Error readList, error: ${error.stack}`)
            throw error
        }
    }
}
