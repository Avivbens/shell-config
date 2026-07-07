import type { IAppSetup } from '@models/app-setup.model'
import { BREW_HOME, BREW_INSTALL, BROW_INSTALL } from '../common-commands'

export const GIT_APPS: Readonly<IAppSetup[]> = [
    {
        name: 'Git',
        description: 'Common Code Version Manager (with Git LFS for large files)',
        group: 'git',
        tags: ['engineering'],
        openUrl: () => BREW_HOME('git'),
        /**
         * `--skip-repo` sets up the global LFS filters (clean/smudge/process) in ~/.gitconfig without
         * installing hooks into the current repo. Plain `git lfs install` fails with "Hook already
         * exists: pre-push" when run from inside a repo that already has hooks (e.g. husky), which is
         * exactly the case when the CLI runs from a git checkout.
         */
        commands: () => [BREW_INSTALL('git'), BREW_INSTALL('git-lfs'), 'git lfs install --skip-repo'],
        fallbackCommands: () => [BROW_INSTALL('git'), BROW_INSTALL('git-lfs'), 'git lfs install --skip-repo'],
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
        name: 'MacOS Keychain store credentials for HTTPS remotes',
        description: 'Use macOS Keychain to store credentials',
        group: 'git',
        openUrl: () => `open https://git-scm.com/docs/gitcredentials`,
        commands: () => [
            // avoid lock for other `git config` options
            'sleep 2',
            `git config --global credential.helper osxkeychain`,
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
            'sleep 4',
            `git config --global --bool push.autoSetupRemote true`,
        ],
        deps: ['Git'],
    },
] as const
