import { IAppSetup } from '@models/app-setup.model'
import { BREW_INSTALL_64_ARM } from '../common-commands'

export const GIT_APPS: Readonly<IAppSetup[]> = [
    {
        name: 'Git',
        description: 'Common Code Version Manager',
        group: 'git',
        default: true,
        commands: [BREW_INSTALL_64_ARM('git')],
    },
    {
        name: 'VSCode as rebase editor',
        group: 'git',
        commands: [
            `git config --global core.editor "/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code --wait"`,
        ],
    },
] as const
