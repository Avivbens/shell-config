import type { IAppSetup } from '@models/app-setup.model'
import { BREW_CASK, BREW_HOME } from '../common-commands'

export const ENGINEERING_APPS: Readonly<IAppSetup[]> = [
    {
        name: 'Mongodb Compass',
        description: 'MongoDB GUI',
        group: 'engineering-apps',
        tags: ['engineering'],
        openUrl: () => BREW_HOME('mongodb-compass', true),
        commands: () => [BREW_CASK('mongodb-compass')],
    },
    {
        name: 'Another Redis Desktop Manager',
        description: 'Redis GUI (password needed)',
        group: 'engineering-apps',
        tags: ['engineering'],
        openUrl: () => BREW_HOME('another-redis-desktop-manager', true),
        commands: () => [
            BREW_CASK('another-redis-desktop-manager'),
            `sudo xattr -rd com.apple.quarantine "/Applications/Another Redis Desktop Manager.app"`,
        ],
    },
    {
        name: 'Rancher',
        description: 'Kubernetes and Docker UI tool',
        group: 'engineering-apps',
        openUrl: () => BREW_HOME('rancher', true),
        commands: () => [BREW_CASK('rancher')],
    },
    {
        name: 'Lens',
        description: 'Kubernetes IDE',
        group: 'engineering-apps',
        tags: ['devops'],
        openUrl: () => BREW_HOME('lens', true),
        commands: () => [BREW_CASK('lens')],
    },
    {
        name: 'Postman',
        description: 'API client',
        group: 'engineering-apps',
        tags: ['engineering'],
        openUrl: () => BREW_HOME('postman', true),
        commands: () => [BREW_CASK('postman')],
    },
]
