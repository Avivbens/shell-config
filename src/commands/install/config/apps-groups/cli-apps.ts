import type { IAppSetup } from '@models/app-setup.model'
import {
    BREW_CASK,
    BREW_HOME,
    BREW_INSTALL,
    BREW_TAP,
    BROW_ALIAS,
    BROW_CASK,
    BROW_INSTALL,
    BROW_TAP,
    NVM_COMMAND,
} from '../common-commands'

const DEFAULT_NODE_VERSION = '18.19.1'

export const CLI_APPS: Readonly<IAppSetup[]> = [
    {
        name: 'NVM',
        description: 'Node Version Manager (password needed)',
        group: 'cli-apps',
        tags: ['node-engineering', 'web-engineering', 'devops'],
        openUrl: () => BREW_HOME('nvm'),
        commands: () => [
            BREW_INSTALL('nvm'),
            '\\. "$(brew --prefix)/opt/nvm/nvm.sh"',
            `chmod +x $HOME/.nvm/nvm.sh`,
            NVM_COMMAND(`install ${DEFAULT_NODE_VERSION}`),
            NVM_COMMAND(`alias default ${DEFAULT_NODE_VERSION}`),
        ],
        fallbackCommands: () => [
            BROW_INSTALL('nvm'),
            `\\. "$(${BROW_ALIAS} --prefix)/opt/nvm/nvm.sh"`,
            `chmod +x $HOME/.nvm/nvm.sh`,
            NVM_COMMAND(`install ${DEFAULT_NODE_VERSION}`),
            NVM_COMMAND(`alias default ${DEFAULT_NODE_VERSION}`),
        ],
    },
    {
        name: 'Yarn',
        group: 'cli-apps',
        description: 'Node package manager by Facebook',
        tags: ['node-engineering'],
        openUrl: () => BREW_HOME('yarn'),
        commands: () => [BREW_INSTALL('yarn')],
    },
    {
        name: 'Go CLI',
        group: 'cli-apps',
        description: 'Go programming language CLI',
        openUrl: () => BREW_HOME('go'),
        commands: () => [BREW_INSTALL('go')],
    },
    {
        name: 'Rust CLI 🦀',
        group: 'cli-apps',
        description: 'Rust programming language CLI',
        openUrl: () => BREW_HOME('rust'),
        commands: () => [BREW_INSTALL('rust')],
    },
    {
        name: 'GitHub CLI',
        group: 'cli-apps',
        description: 'GitHub in your terminal',
        tags: ['engineering'],
        openUrl: () => BREW_HOME('gh'),
        commands: () => [BREW_INSTALL('gh')],
        fallbackCommands: () => [BROW_INSTALL('gh')],
    },
    {
        name: 'google-cloud-sdk',
        group: 'cli-apps',
        description: 'Integrate with Google Cloud Platform services',
        tags: ['engineering'],
        openUrl: () => BREW_HOME('google-cloud-sdk'),
        commands: () => [BREW_CASK('google-cloud-sdk')],
        fallbackCommands: () => [BROW_CASK('google-cloud-sdk')],
        deps: ['Python'],
    },
    {
        name: 'AWS CLI',
        group: 'cli-apps',
        description: 'Official Amazon AWS command-line interface',
        tags: ['devops'],
        openUrl: () => BREW_HOME('awscli'),
        commands: () => [BREW_INSTALL('awscli')],
        deps: ['Python'],
    },
    {
        name: 'Kubectx',
        group: 'cli-apps',
        description: 'Kubernetes CLI, Switch faster between Kubernetes contexts and namespaces',
        tags: ['devops'],
        openUrl: () => BREW_HOME('kubectx'),
        commands: () => [BREW_INSTALL('kubectx')],
    },
    {
        name: 'Mongodb',
        group: 'cli-apps',
        description: 'MongoDB Community Edition server',
        tags: ['engineering'],
        openUrl: () => BREW_HOME('mongodb-community@6.0'),
        commands: () => [BREW_TAP('mongodb/brew'), BREW_INSTALL('mongodb-community@6.0'), 'mkdir -p "$HOME/mongodb"'],
        fallbackCommands: () => [
            BROW_TAP('mongodb/brew'),
            BROW_INSTALL('mongodb-community@6.0'),
            'mkdir -p "$HOME/mongodb"',
        ],
    },
    {
        name: 'Redis',
        description: 'Redis server',
        group: 'cli-apps',
        tags: ['engineering'],
        openUrl: () => BREW_HOME('redis'),
        commands: () => [BREW_INSTALL('redis')],
        fallbackCommands: () => [BROW_INSTALL('redis')],
    },
    {
        name: 'Docker',
        description: 'Docker CLI',
        group: 'cli-apps',
        tags: ['node-engineering', 'devops'],
        openUrl: () => BREW_HOME('docker'),
        commands: () => [BREW_INSTALL('docker')],
    },
    {
        name: 'Terraform',
        description: 'Terraform CLI',
        group: 'cli-apps',
        tags: ['devops'],
        openUrl: () => BREW_HOME('terraform'),
        commands: () => [BREW_INSTALL('terraform')],
    },
    {
        name: 'Kubernetes Helm',
        description: 'Kubernetes package manager',
        group: 'cli-apps',
        tags: ['devops'],
        openUrl: () => BREW_HOME('helm'),
        commands: () => [BREW_INSTALL('helm')],
    },
    {
        name: 'Btop',
        description: 'Resource monitor over the terminal',
        group: 'cli-apps',
        tags: ['super-user'],
        openUrl: () => BREW_HOME('btop'),
        commands: () => [BREW_INSTALL('btop')],
    },
    {
        name: 'ncdu',
        description: 'Disk usage analyzer',
        group: 'cli-apps',
        tags: ['super-user'],
        openUrl: () => BREW_HOME('ncdu'),
        commands: () => [BREW_INSTALL('ncdu')],
    },
    {
        name: 'entr',
        description: 'Run arbitrary commands when files change',
        group: 'cli-apps',
        tags: ['productivity'],
        openUrl: () => BREW_HOME('entr'),
        commands: () => [BREW_INSTALL('entr')],
    },
] as const
