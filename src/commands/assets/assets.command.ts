import { BASE_PATH } from '@common/constants'
import { execPromise } from '@common/utils'
import { CheckUpdateService } from '@services/check-update.service'
import { LoggerService } from '@services/logger.service'
import { Command, CommandRunner } from 'nest-commander'
import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import ora from 'ora'
import {
    ASK_FOR_ARTIFACTORY_KEY_PROMPT,
    ASK_FOR_EMAIL_PROMPT,
    ASK_FOR_GIT_KEY_PROMPT,
    ASK_FOR_NAME_PROMPT,
    ASK_FOR_PERSONAL_EMAIL_PROMPT,
    ASK_FOR_PERSONAL_GIT_KEY_PROMPT,
    ASSETS_TEMPLATES,
    SETUP_ASSETS_ALSO_PERSONAL_CONFIRM_PROMPT,
} from './config/setup-assets.config'
import { ReplacementTemplate } from './template-handle/models/replacement.enum'
import { replaceInTemplate } from './template-handle/replace-in-template'

@Command({
    name: 'assets',
    description: 'Configure your shell assets, such as `gitprofile` and `npmrc`',
    options: { isDefault: false },
})
export class AssetsCommand extends CommandRunner {
    constructor(
        private readonly logger: LoggerService,
        private readonly checkUpdateService: CheckUpdateService,
    ) {
        super()
        this.logger.setContext(AssetsCommand.name)
    }

    async run(inputs: string[], options: unknown): Promise<void> {
        await this.checkUpdateService.checkForUpdates()

        const spinner = ora('Setting up assets')

        try {
            const alsoPersonalAssets: boolean = await SETUP_ASSETS_ALSO_PERSONAL_CONFIRM_PROMPT()
            let personalEmail: string = ''
            let personalGitKey: string = ''
            if (alsoPersonalAssets) {
                personalEmail = await ASK_FOR_PERSONAL_EMAIL_PROMPT()
                personalGitKey = await ASK_FOR_PERSONAL_GIT_KEY_PROMPT()
            }

            const email = await ASK_FOR_EMAIL_PROMPT()
            const name = await ASK_FOR_NAME_PROMPT()
            const gitKey = await ASK_FOR_GIT_KEY_PROMPT()
            const artifactoryKey = await ASK_FOR_ARTIFACTORY_KEY_PROMPT()

            const replacementObject: Record<ReplacementTemplate, string> = {
                [ReplacementTemplate.EMAIL]: email || ReplacementTemplate.EMAIL,
                [ReplacementTemplate.FULL_NAME]: name || ReplacementTemplate.FULL_NAME,
                [ReplacementTemplate.GIT_KEY]: gitKey || ReplacementTemplate.GIT_KEY,
                [ReplacementTemplate.ARTIFACTORY_AUTH]:
                    artifactoryKey || ReplacementTemplate.ARTIFACTORY_AUTH,
                [ReplacementTemplate.PERSONAL_EMAIL]:
                    personalEmail || ReplacementTemplate.PERSONAL_EMAIL,
                [ReplacementTemplate.PERSONAL_GIT_KEY]:
                    personalGitKey || ReplacementTemplate.PERSONAL_GIT_KEY,
            }

            spinner.start()

            for (const { filePath, copyTo, effects } of ASSETS_TEMPLATES) {
                const newFileContent = await replaceInTemplate(filePath, replacementObject)
                const destination = resolve(BASE_PATH, copyTo)
                await writeFile(destination, newFileContent)

                for (const effect of effects) {
                    await execPromise(effect)
                }
            }

            spinner.succeed()
        } catch (error) {
            this.logger.error(`Error AssetsCommand, Error: ${error.stack}`)
            spinner.fail('Failed to setup assets')
        }
    }
}
