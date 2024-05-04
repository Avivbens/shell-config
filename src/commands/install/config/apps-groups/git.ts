import type { IAppSetup } from '@models/app-setup.model'
import { BREW_INSTALL } from '../common-commands'

export const GIT_APPS: Readonly<IAppSetup[]> = [
    {
        name: 'Git',
        description: 'Common Code Version Manager',
        group: 'git',
        tags: ['engineering'],
        commands: () => [BREW_INSTALL('git')],
    },
    {
        name: 'VSCode as rebase editor',
        description: 'Apply rebase with VSCode UI editor (Git required)',
        group: 'git',
        tags: ['super-user'],
        commands: () => [
            // avoid lock for other `git config` options
            'sleep 2',
            `git config --global core.editor "/Applications/Visual\\ Studio\\ Code.app/Contents/Resources/app/bin/code --wait"`,
        ],
        deps: ['Git'],
    },
    {
        name: 'Enable ReReRe',
        description: 'Enable reuse recorded resolution for merge conflicts (Git required)',
        group: 'git',
        tags: ['super-user'],
        commands: () => [`git config --global rerere.enabled true`],
        deps: ['Git'],
    },
    {
        name: 'Auto Setup Remote',
        description: 'Automatically setup remote tracking branches on git push (Git required)',
        group: 'git',
        tags: ['productivity'],
        commands: () => [
            'sleep 4', // avoid lock for other `git config` options
            `git config --global --bool push.autoSetupRemote true`,
        ],
        deps: ['Git'],
    },
] as const
