import { Command, CommandRunner } from 'nest-commander'
import { mkdir, readdir, writeFile } from 'node:fs/promises'
import { execPromise } from '@common/utils'
import { CheckUpdateService } from '@services/check-update.service'
import { InjectLogger, LoggerService } from '@services/logger'
import type { AvailableActionIds } from './config/ constants.config'
import { GIT_PROFILES_TARGET, HELP_BOX_MESSAGE, NPM_PROFILES_TARGET } from './config/ constants.config'
import {
    ASK_FOR_ARTIFACTORY_KEY_PROMPT,
    ASK_FOR_CUSTOM_REGISTRY_AUTH_PROMPT,
    ASK_FOR_CUSTOM_REGISTRY_PROMPT,
    ASK_FOR_EMAIL_PROMPT,
    ASK_FOR_GIT_KEY_PROMPT,
    ASK_FOR_NAME_PROMPT,
    ASK_FOR_PROFILE_NAME_PROMPT,
    SELECT_ACTION_PROMPT,
} from './config/inputs.config'
import { ReplacementTemplate } from './template-handle/models/replacement.enum'
import { replaceInTemplate } from './template-handle/replace-in-template'

@Command({
    name: 'assets',
    description: 'Configure your shell assets, such as `gitprofile` and `npmrc`',
    options: { isDefault: false },
})
export class AssetsCommand extends CommandRunner {
    constructor(
        @InjectLogger(AssetsCommand.name) private readonly logger: LoggerService,
        private readonly checkUpdateService: CheckUpdateService,
    ) {
        super()
    }

    async run(inputs: string[], options: unknown): Promise<void> {
        await this.checkUpdateService.checkForUpdates()

        console.log(HELP_BOX_MESSAGE)
        try {
            while (true) {
                const nextSelection: AvailableActionIds = await SELECT_ACTION_PROMPT()
                if (!nextSelection) {
                    break
                }

                await this.actionMachine(nextSelection)
            }
        } catch (error) {
            this.logger.error(`Error AssetsCommand, Error: ${error.stack}`)
        }
    }

    private async actionMachine(nextSelection: AvailableActionIds) {
        try {
            const profileName = await ASK_FOR_PROFILE_NAME_PROMPT()

            const isExistChecker = async (dirPath: string): Promise<boolean> => {
                const currentProfiles: string[] = await readdir(dirPath).catch(async () => [])

                const isExists: boolean = currentProfiles.includes(profileName)
                return isExists
            }

            switch (nextSelection) {
                case 'create_new_custom_npmrc_profile': {
                    const isExists: boolean = await isExistChecker(NPM_PROFILES_TARGET)

                    if (isExists) {
                        this.logger.error(`Profile name ${profileName} already exists`)
                        return
                    }

                    const newFileContent = await this.askForCustomNpmrcProfileConfig(profileName)
                    await this.mkdirIfNotExists(NPM_PROFILES_TARGET)

                    const filePath = `${NPM_PROFILES_TARGET}/${profileName}`
                    await writeFile(filePath, newFileContent, {
                        encoding: 'utf-8',
                    })

                    await execPromise(`ln -fs ${filePath} "$HOME/.npmrc"`)

                    break
                }
                case 'create_new_npmrc_profile': {
                    const isExists: boolean = await isExistChecker(NPM_PROFILES_TARGET)

                    if (isExists) {
                        this.logger.error(`Profile name ${profileName} already exists`)
                        return
                    }

                    const newFileContent = await this.askForNpmrcProfileConfig(profileName)
                    await this.mkdirIfNotExists(NPM_PROFILES_TARGET)

                    const filePath = `${NPM_PROFILES_TARGET}/${profileName}`
                    await writeFile(filePath, newFileContent, {
                        encoding: 'utf-8',
                    })

                    await execPromise(`ln -fs ${filePath} "$HOME/.npmrc"`)

                    break
                }
                case 'create_new_git_profile': {
                    const isExists: boolean = await isExistChecker(GIT_PROFILES_TARGET)

                    if (isExists) {
                        this.logger.error(`Profile name ${profileName} already exists`)
                        return
                    }

                    const newFileContent = await this.askForGitProfileConfig(profileName)
                    await this.mkdirIfNotExists(GIT_PROFILES_TARGET)

                    const filePath = `${GIT_PROFILES_TARGET}/${profileName}`
                    await writeFile(filePath, newFileContent, {
                        encoding: 'utf-8',
                    })

                    await execPromise(`ln -fs ${filePath} "$HOME/.gitconfig"`)

                    break
                }
                default: {
                    this.logger.error(`Unknown action ${nextSelection}`)
                }
            }
        } catch (error) {
            this.logger.error(`Error actionMachine, Error: ${error.stack}`)
            throw error
        }
    }

    private async askForGitProfileConfig(profileName: string): Promise<string> {
        const name = await ASK_FOR_NAME_PROMPT()
        const email = await ASK_FOR_EMAIL_PROMPT()
        const gitKey = await ASK_FOR_GIT_KEY_PROMPT(profileName)

        const filePath = 'assets/.gitconfig.template'
        const replacementObject: Partial<Record<ReplacementTemplate, string>> = {
            [ReplacementTemplate.FULL_NAME]: name,
            [ReplacementTemplate.EMAIL]: email,
            [ReplacementTemplate.GIT_KEY]: gitKey,
        }
        const newFileContent = await replaceInTemplate(filePath, replacementObject)
        return newFileContent
    }

    private async askForNpmrcProfileConfig(profileName: string): Promise<string> {
        const artifactoryKey = await ASK_FOR_ARTIFACTORY_KEY_PROMPT(profileName)

        const filePath = 'assets/.npmrc.template'
        const replacementObject: Partial<Record<ReplacementTemplate, string>> = {
            [ReplacementTemplate.ARTIFACTORY_AUTH]: artifactoryKey,
        }
        const newFileContent = await replaceInTemplate(filePath, replacementObject)
        return newFileContent
    }

    private async askForCustomNpmrcProfileConfig(profileName: string): Promise<string> {
        const email = await ASK_FOR_EMAIL_PROMPT()
        const customRegistry = await ASK_FOR_CUSTOM_REGISTRY_PROMPT(profileName)
        const customRegistryAuthEndpoint = await ASK_FOR_CUSTOM_REGISTRY_AUTH_PROMPT(profileName)
        const artifactoryKey = await ASK_FOR_ARTIFACTORY_KEY_PROMPT(profileName)

        const filePath = 'assets/.npmrc.custom.template'
        const replacementObject: Partial<Record<ReplacementTemplate, string>> = {
            [ReplacementTemplate.EMAIL]: email,
            [ReplacementTemplate.ARTIFACTORY_AUTH]: artifactoryKey,
            [ReplacementTemplate.CUSTOM_REGISTRY]: customRegistry,
            [ReplacementTemplate.CUSTOM_REGISTRY_AUTH]: customRegistryAuthEndpoint,
        }
        const newFileContent = await replaceInTemplate(filePath, replacementObject)
        return newFileContent
    }

    private async mkdirIfNotExists(dirPath: string): Promise<void> {
        await mkdir(dirPath, { recursive: true }).catch(() => {})
    }
}
