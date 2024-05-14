import type { IAppSetup } from '@models/app-setup.model'
import { BREW_HOME, BREW_INSTALL } from '../common-commands'

export const GIT_APPS: Readonly<IAppSetup[]> = [
    {
        name: 'Git',
        description: 'Common Code Version Manager',
        group: 'git',
        tags: ['engineering'],
        openUrl: () => BREW_HOME('git'),
        commands: () => [BREW_INSTALL('git')],
    },
    {
        name: 'VSCode as rebase editor',
        description: 'Apply rebase with VSCode UI editor',
        group: 'git',
        tags: ['super-user'],
        openUrl: () =>
            `open https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration#:~:text=documentation%20mentioned%20above.-,core.editor,-By%20default%2C%20Git`,
        commands: () => [
            `git config --global core.editor "/Applications/Visual\\ Studio\\ Code.app/Contents/Resources/app/bin/code --wait"`,
        ],
        deps: ['Git'],
    },
    {
        name: 'Enable ReReRe',
        description: 'Enable reuse recorded resolution for merge conflicts',
        group: 'git',
        tags: ['super-user'],
        openUrl: () => `open https://git-scm.com/book/en/v2/Git-Tools-Rerere`,
        commands: () => [
            // avoid lock for other `git config` options
            'sleep 1',
            `git config --global rerere.enabled true`,
        ],
        deps: ['Git'],
    },
    {
        name: 'Increase credential cache timeout',
        description: 'Increase the cache time for using your credentials from Keychain - 1 month',
        group: 'git',
        openUrl: () => `open https://git-scm.com/docs/git-credential-cache`,
        commands: () => [
            // avoid lock for other `git config` options
            'sleep 2',
            `git config --global credential.helper 'cache --timeout 2592000'`,
        ],
        deps: ['Git'],
    },
    {
        name: 'Auto Setup Remote',
        description: 'Automatically setup remote tracking branches on git push',
        group: 'git',
        tags: ['productivity'],
        openUrl: () => `open https://git-scm.com/docs/git-push#Documentation/git-push.txt-pushautoSetupRemote`,
        commands: () => [
            // avoid lock for other `git config` options
            'sleep 3',
            `git config --global --bool push.autoSetupRemote true`,
        ],
        deps: ['Git'],
    },
] as const
