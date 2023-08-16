import { inquirer } from '@common/inquirer'

export const BACKUP_ROOT_ZSH_CONFIRM_PROMPT = async (): Promise<boolean> => {
    const { backupRoot } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'backupRoot',
            message: `Would you like to backup your current ROOT .zshrc file? I'll be at the Desktop`,
            default: true,
        },
    ])

    return backupRoot
}
