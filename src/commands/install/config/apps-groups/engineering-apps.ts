import type { IAppSetup } from '@models/app-setup.model'
import { BREW_CASK } from '../common-commands'

export const ENGINEERING_APPS: Readonly<IAppSetup[]> = [
    {
        name: 'Mongodb Compass',
        group: 'engineering-apps',
        tags: ['engineering', 'devops'],
        commands: () => [BREW_CASK('mongodb-compass')],
        description: 'MongoDB GUI, MongoDB is required',
    },
    {
        name: 'Another Redis Desktop Manager',
        group: 'engineering-apps',
        tags: ['engineering', 'devops'],
        commands: () => [
            BREW_CASK('another-redis-desktop-manager'),
            `sudo xattr -rd com.apple.quarantine "/Applications/Another Redis Desktop Manager.app"`,
        ],
        description: 'Redis GUI, Redis is required',
    },
    {
        name: 'Rancher',
        description: 'Kubernetes and Docker UI tool',
        group: 'engineering-apps',
        tags: ['engineering', 'devops'],
        commands: () => [BREW_CASK('rancher')],
    },
    {
        name: 'Postman',
        description: 'API client',
        group: 'engineering-apps',
        tags: ['engineering', 'devops'],
        commands: () => [BREW_CASK('postman')],
    },
]
