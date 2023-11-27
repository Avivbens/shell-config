import type { IAppSetup } from '@models/app-setup.model'
import {
    BREW_CASK,
    BREW_INSTALL,
    BREW_TAP,
    BROW_CASK,
    BROW_INSTALL,
    BROW_TAP,
} from '../common-commands'

export const CLI_APPS: Readonly<IAppSetup[]> = [
    {
        name: 'google-cloud-sdk',
        group: 'cli-apps',
        description: 'Integrate with Google Cloud Platform services, Python is required',
        tags: ['engineering', 'devops'],
        commands: () => [BREW_CASK('google-cloud-sdk')],
        fallbackCommands: () => [BROW_CASK('google-cloud-sdk')],
        deps: ['Python'],
    },
    {
        name: 'AWS CLI',
        group: 'cli-apps',
        description: 'Official Amazon AWS command-line interface, Python is required',
        tags: ['devops'],
        commands: () => [BREW_INSTALL('awscli')],
        deps: ['Python'],
    },
    {
        name: 'Kubectx',
        group: 'cli-apps',
        description: 'Kubernetes CLI, Switch faster between Kubernetes contexts and namespaces',
        tags: ['devops'],
        commands: () => [BREW_INSTALL('kubectx')],
    },
    {
        name: 'Mongodb',
        group: 'cli-apps',
        description: 'MongoDB Community Edition server',
        tags: ['engineering', 'devops'],
        commands: () => [
            BREW_TAP('mongodb/brew'),
            BREW_INSTALL('mongodb-community@6.0'),
            'mkdir -p "$HOME/mongodb"',
        ],
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
        tags: ['engineering', 'devops'],
        commands: () => [BREW_INSTALL('redis')],
        fallbackCommands: () => [BROW_INSTALL('redis')],
    },
    {
        name: 'Docker',
        description: 'Docker CLI',
        group: 'cli-apps',
        tags: ['devops'],
        commands: () => [BREW_INSTALL('docker')],
    },
    {
        name: 'Terraform',
        description: 'Terraform CLI',
        group: 'cli-apps',
        tags: ['devops'],
        commands: () => [BREW_INSTALL('terraform')],
    },
    {
        name: 'Kubernetes Helm',
        description: 'Kubernetes package manager',
        group: 'cli-apps',
        tags: ['devops'],
        commands: () => [BREW_INSTALL('helm')],
    },
] as const
