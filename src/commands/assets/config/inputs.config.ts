import { inquirer } from '@common/inquirer'
import { AVAILABLE_ACTIONS, AvailableActionIds } from './ constants.config'

export const ASK_FOR_PROFILE_NAME_PROMPT = async (): Promise<string> => {
    const { name } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the new profile name',
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

export const ASK_FOR_EMAIL_PROMPT = async (): Promise<string> => {
    const { email } = await inquirer.prompt([
        {
            type: 'input',
            name: 'email',
            message: 'Enter your email address',
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
            message: 'Enter your full name',
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

export const ASK_FOR_GIT_KEY_PROMPT = async (profileName: string): Promise<string> => {
    const { key } = await inquirer.prompt([
        {
            type: 'input',
            name: 'key',
            message: `Enter your git auth key from Github. \nYou can leave it empty and fill this out later under ~/.gitprofiles/${profileName}`,
            default: '',
        },
    ])

    return key
}

export const ASK_FOR_ARTIFACTORY_KEY_PROMPT = async (profileName: string): Promise<string> => {
    const { key } = await inquirer.prompt([
        {
            type: 'input',
            name: 'key',
            message: `Enter your artifactory auth key. \nYou can leave it empty and fill this out later under ~/.npmrcs/${profileName}`,
            default: '',
        },
    ])

    return key
}

export const ASK_FOR_CUSTOM_REGISTRY_PROMPT = async (profileName: string): Promise<string> => {
    const { key } = await inquirer.prompt([
        {
            type: 'input',
            name: 'key',
            message: `Enter your custom registry (example: https://registry.npmjs.org/). \nYou can leave it empty and fill this out later under ~/.npmrcs/${profileName}`,
            default: '',
        },
    ])

    return key
}

export const ASK_FOR_CUSTOM_REGISTRY_AUTH_PROMPT = async (profileName: string): Promise<string> => {
    const { key } = await inquirer.prompt([
        {
            type: 'input',
            name: 'key',
            message: `Enter your custom registry auth endpoint (example: //your-company.jfrog.io/artifactory/api/npm/virtual-npm). \nYou can leave it empty and fill this out later under ~/.npmrcs/${profileName}`,
            default: '',
        },
    ])

    return key
}

export const SELECT_ACTION_PROMPT = async (): Promise<AvailableActionIds> => {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: `Select your action`,
            choices: AVAILABLE_ACTIONS,
        },
    ])

    return action
}
