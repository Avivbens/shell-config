import { IAppSetup } from '@models/app-setup.model'
import { BREW_CASK, BREW_INSTALL_64_ARM, BREW_TAP } from '../common-commands'

export const CLI_APPS: Readonly<IAppSetup[]> = [
    {
        name: 'google-cloud-sdk',
        group: 'cli-apps',
        default: true,
        commands: [BREW_CASK('google-cloud-sdk')],
    },
    {
        name: 'Mongodb',
        group: 'cli-apps',
        description: 'MongoDB Community Edition server',
        default: true,
        commands: [
            BREW_TAP('mongodb/brew'),
            BREW_INSTALL_64_ARM('mongodb-community@6.0'),
            'mkdir -p ~/mongodb || {  }',
        ],
    },
    {
        name: 'Redis',
        description: 'Redis server',
        group: 'cli-apps',
        default: true,
        commands: [BREW_INSTALL_64_ARM('redis')],
    },
] as const
