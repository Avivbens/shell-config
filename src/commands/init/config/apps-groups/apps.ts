import { IAppSetup } from '../../../../models/app-setup.model'
import { BREW_CASK } from '../utils'

export const APPS: Readonly<IAppSetup[]> = [
    {
        name: 'Google Chrome',
        group: 'apps',
        default: true,
        commands: [BREW_CASK('google-chrome')],
    },
    {
        name: 'Alfred',
        group: 'apps',
        description: 'Productivity app, create custom shortcuts and workflows',
        commands: [BREW_CASK('alfred')],
    },
    {
        name: 'Bar Tender',
        group: 'apps',
        description: 'Hide menu bar icons and manage them',
        commands: [BREW_CASK('bartender')],
    },
    {
        name: 'Google Drive',
        group: 'apps',
        default: true,
        commands: [BREW_CASK('google-drive')],
    },
    {
        name: 'Rectangle',
        group: 'apps',
        commands: [BREW_CASK('rectangle')],
    },
    {
        name: 'Visual Studio Code',
        group: 'apps',
        default: true,
        commands: [BREW_CASK('visual-studio-code')],
    },
    {
        name: 'Dash',
        group: 'apps',
        commands: [BREW_CASK('dash')],
    },
    {
        name: 'Mongodb Compass',
        group: 'apps',
        default: true,
        commands: [BREW_CASK('mongodb-compass')],
        description: 'MongoDB GUI, MongoDB is required',
        deps: ['Mongodb'],
    },
    {
        name: 'Another Redis Desktop Manager',
        group: 'apps',
        default: true,
        commands: [
            BREW_CASK('another-redis-desktop-manager'),
            'sudo xattr -rd com.apple.quarantine /Applications/Another Redis Desktop Manager.app',
        ],
        description: 'Redis GUI, Redis is required',
        deps: ['Redis'],
    },
    {
        name: 'Slack',
        group: 'apps',
        default: true,
        commands: [BREW_CASK('slack')],
    },
    {
        name: 'UTM',
        group: 'apps',
        description: 'Virtual machine MacOS',
        commands: [BREW_CASK('utm')],
    },
    {
        name: '1Password',
        group: 'apps',
        default: true,
        commands: [BREW_CASK('1password')],
    },
    {
        name: 'iTerm2',
        description: 'Terminal replacement',
        group: 'apps',
        commands: [BREW_CASK('iterm2')],
    },
    {
        name: 'Grammarly',
        group: 'apps',
        default: true,
        commands: [BREW_CASK('grammarly')],
    },
    {
        name: 'Cleanshot',
        description: 'Screen recorder and screenshot tool',
        group: 'apps',
        commands: [BREW_CASK('cleanshot')],
    },
    {
        name: 'VLC',
        group: 'apps',
        commands: [BREW_CASK('vlc')],
    },
    {
        name: 'Notion',
        group: 'apps',
        commands: [BREW_CASK('notion')],
    },
    {
        name: 'Webstorm',
        group: 'apps',
        commands: [BREW_CASK('webstorm')],
    },
    {
        name: 'Rancher',
        description: 'Kubernetes and Docker UI tool',
        group: 'apps',
        commands: [BREW_CASK('rancher')],
    },
    {
        name: 'Postman',
        description: 'API client',
        group: 'apps',
        commands: [BREW_CASK('postman')],
    },
] as const
