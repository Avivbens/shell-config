import { BASE_PATH } from '@common/constants'
import { inquirer } from '@common/inquirer'

export const SETUP_ASSETS_CONFIRM_PROMPT = async (): Promise<boolean> => {
    const { setupAssets } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'setupAssets',
            message: 'Would you like to setup assets? (NPM profile and Git profile)',
            default: true,
        },
    ])

    return setupAssets
}

export const SETUP_ASSETS_ALSO_PERSONAL_CONFIRM_PROMPT = async (): Promise<boolean> => {
    const { setupPersonalAssets } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'setupPersonalAssets',
            message:
                'Would you like to setup private assets too? We support a few git profiles and npmrcs (NPM profile and Git profile)',
            default: false,
        },
    ])

    return setupPersonalAssets
}

export const ASK_FOR_EMAIL_PROMPT = async (): Promise<string> => {
    const { email } = await inquirer.prompt([
        {
            type: 'input',
            name: 'email',
            message: 'What is your WORK email address?',
            default: '',
            validate: (value: string): boolean | string => {
                const errorMsg = 'Please enter a valid email address'
                if (!value) {
                    return errorMsg
                }

                const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                if (!emailRegex.test(value)) {
                    return errorMsg
                }

                return true
            },
        },
    ])

    return email
}

export const ASK_FOR_PERSONAL_EMAIL_PROMPT = async (): Promise<string> => {
    const { email } = await inquirer.prompt([
        {
            type: 'input',
            name: 'email',
            message: 'What is your PERSONAL email address?',
            default: '',
            validate: (value: string): boolean | string => {
                const errorMsg = 'Please enter a valid email address'
                if (!value) {
                    return errorMsg
                }

                const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                if (!emailRegex.test(value)) {
                    return errorMsg
                }

                return true
            },
        },
    ])

    return email
}

export const ASK_FOR_NAME_PROMPT = async (): Promise<string> => {
    const { name } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your full name?',
            default: '',
            validate: (value: string): boolean | string => {
                const errorMsg = 'Please enter a name'
                if (!value) {
                    return errorMsg
                }

                return true
            },
        },
    ])

    return name
}

export const ASK_FOR_GIT_KEY_PROMPT = async (): Promise<string> => {
    const { key } = await inquirer.prompt([
        {
            type: 'input',
            name: 'key',
            message:
                'Enter your git key from Github Enterprise, you can leave it empty and fill this out later under ~/.gitconfig.work',
            default: '',
        },
    ])

    return key
}

export const ASK_FOR_PERSONAL_GIT_KEY_PROMPT = async (): Promise<string> => {
    const { key } = await inquirer.prompt([
        {
            type: 'input',
            name: 'key',
            message:
                'Enter your PERSONAL git key from your Github, you can leave it empty and fill this out later under ~/.gitconfig.personal',
            default: '',
        },
    ])

    return key
}

export const ASK_FOR_ARTIFACTORY_KEY_PROMPT = async (): Promise<string> => {
    const { key } = await inquirer.prompt([
        {
            type: 'input',
            name: 'key',
            message:
                'Enter your artifactory auth key, you can leave it empty and fill this out later under ~/.npmrcs/work',
            default: '',
        },
    ])

    return key
}

export const ASSETS_TEMPLATES = [
    {
        filePath: `assets/.npmrc.work.template`,
        copyTo: `private/.npmrc.work`,
        effects: [
            `ln -f "${BASE_PATH}/private/.npmrc.work" "$HOME/.npmrcs/work"`,
            `ln -f "$HOME/.npmrcs/work" "$HOME/.npmrc"`,
        ],
    },
    {
        filePath: `assets/.gitconfig.work.template`,
        copyTo: `private/.gitconfig.work`,
        effects: [
            `ln -f "${BASE_PATH}/private/.gitconfig.work" "$HOME/.gitconfig.work"`,
            `ln -f "$HOME/.gitconfig.work" "$HOME/.gitconfig"`,
        ],
    },
    {
        filePath: `assets/.gitconfig.personal.template`,
        copyTo: `private/.gitconfig.personal`,
        effects: [`ln -f "${BASE_PATH}/private/.gitconfig.personal" "$HOME/.gitconfig.personal"`],
    },
] as const
