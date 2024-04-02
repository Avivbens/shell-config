import type { IAppSetup } from '@models/app-setup.model'
import { BREW_CASK } from '../common-commands'

export const APPS: Readonly<IAppSetup[]> = [
    {
        name: 'Alfred',
        group: 'apps',
        description: 'Productivity app, create custom shortcuts and workflows',
        tags: ['productivity'],
        commands: () => [BREW_CASK('alfred')],
    },
    {
        name: 'Bar Tender',
        group: 'apps',
        description: 'Hide menu bar icons and manage them',
        tags: ['productivity'],
        commands: () => [BREW_CASK('bartender')],
    },
    {
        name: 'Google Drive',
        group: 'apps',
        default: true,
        commands: () => [BREW_CASK('google-drive')],
    },
    {
        name: 'Rectangle',
        group: 'apps',
        description: 'Move and resize windows in macOS using keyboard shortcuts',
        tags: ['productivity'],
        commands: () => [BREW_CASK('rectangle')],
    },
    {
        name: 'Vivid',
        group: 'apps',
        description: 'Unlocks the full brightness of your MacBook Pro',
        commands: () => [BREW_CASK('vivid')],
    },
    {
        name: 'MonitorControl',
        group: 'apps',
        description: 'Tool to control external monitor brightness and volume',
        commands: () => [BREW_CASK('monitorcontrol')],
    },
    {
        name: 'Dash',
        group: 'apps',
        description: 'Documentation browser',
        commands: () => [BREW_CASK('dash')],
    },
    {
        name: 'Slack',
        group: 'apps',
        tags: ['work'],
        commands: () => [BREW_CASK('slack')],
    },
    {
        name: 'UTM',
        group: 'apps',
        description: 'Virtual machine MacOS',
        commands: () => [BREW_CASK('utm')],
    },
    {
        name: '1Password',
        group: 'apps',
        tags: ['personal', 'work'],
        commands: () => [BREW_CASK('1password')],
    },
    {
        name: 'Grammarly',
        group: 'apps',
        default: true,
        commands: () => [BREW_CASK('grammarly')],
    },
    {
        name: 'Cleanshot',
        description: 'Screen recorder and screenshot tool',
        group: 'apps',
        tags: ['productivity'],
        commands: () => [BREW_CASK('cleanshot')],
    },
    {
        name: 'VLC',
        group: 'apps',
        commands: () => [BREW_CASK('vlc')],
    },
    {
        name: 'Subler',
        description: 'MP4 metadata editor, video converter, and muxer',
        group: 'apps',
        commands: () => [BREW_CASK('subler')],
    },
    {
        name: 'Notion',
        group: 'apps',
        tags: ['productivity'],
        commands: () => [BREW_CASK('notion')],
    },
    {
        name: 'WhatsApp',
        group: 'apps',
        tags: ['personal'],
        commands: () => [BREW_CASK('whatsapp')],
    },
    {
        name: 'Telegram Desktop',
        group: 'apps',
        tags: ['personal'],
        commands: () => [BREW_CASK('telegram-desktop')],
    },
] as const
