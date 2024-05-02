import type { IAppSetup } from '@models/app-setup.model'
import { BREW_CASK } from '../common-commands'

export const ENGINEERING_APPS: Readonly<IAppSetup[]> = [
    {
        name: 'Mongodb Compass',
        description: 'MongoDB GUI, MongoDB is required',
        group: 'engineering-apps',
        tags: ['engineering'],
        commands: () => [BREW_CASK('mongodb-compass')],
    },
    {
        name: 'Another Redis Desktop Manager',
        description: 'Redis GUI, Redis is required (password needed)',
        group: 'engineering-apps',
        tags: ['engineering'],
        commands: () => [
            BREW_CASK('another-redis-desktop-manager'),
            `sudo xattr -rd com.apple.quarantine "/Applications/Another Redis Desktop Manager.app"`,
        ],
    },
    {
        name: 'Rancher',
        description: 'Kubernetes and Docker UI tool',
        group: 'engineering-apps',
        commands: () => [BREW_CASK('rancher')],
    },
    {
        name: 'Postman',
        description: 'API client',
        group: 'engineering-apps',
        tags: ['engineering'],
        commands: () => [BREW_CASK('postman')],
    },
]
