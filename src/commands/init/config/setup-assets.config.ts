// eslint-disable-next-line @typescript-eslint/no-var-requires
const inquirer: typeof import('inquirer') = require('inquirer')

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

export const ASK_FOR_EMAIL_PROMPT = async (): Promise<string> => {
    const { email } = await inquirer.prompt([
        {
            type: 'input',
            name: 'email',
            message: 'What is your email address?',
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
            message: 'What is your name?',
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
