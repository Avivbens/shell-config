import type { IAppSetup } from '@models/app-setup.model'
import { BREW_INSTALL } from '../common-commands'

export const GIT_APPS: Readonly<IAppSetup[]> = [
    {
        name: 'Git',
        description: 'Common Code Version Manager',
        group: 'git',
        tags: ['engineering', 'devops'],
        commands: () => [BREW_INSTALL('git')],
    },
    {
        name: 'VSCode as rebase editor',
        description: 'Apply rebase with VSCode UI editor',
        group: 'git',
        commands: () => [
            `git config --global core.editor "/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code --wait"`,
        ],
    },
] as const
