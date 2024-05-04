import type { IAppSetup } from '@models/app-setup.model'
import { BREW_CASK, BREW_INSTALL, BROW_CASK, OPEN_APP_STORE_APP_LINK, OPEN_BROWSER_LINK } from '../common-commands'

export const APPS: Readonly<IAppSetup[]> = [
    {
        name: 'Alfred',
        group: 'apps',
        description: 'Productivity app, create custom shortcuts and workflows (paid)',
        tags: ['productivity'],
        paid: true,
        commands: () => [BREW_CASK('alfred')],
    },
    {
        name: 'Bar Tender',
        group: 'apps',
        description: 'Hide menu bar icons and manage them (paid)',
        tags: ['productivity'],
        paid: true,
        commands: () => [BREW_CASK('bartender')],
    },
    {
        name: 'Google Drive',
        description: 'Cloud storage service by Google (password needed)',
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
        name: 'MonitorControl',
        group: 'apps',
        description: 'Tool to control external monitor brightness and volume',
        commands: () => [BREW_CASK('monitorcontrol')],
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
        commands: () => [BREW_CASK('grammarly-desktop')],
    },
    {
        name: 'Cleanshot',
        description: 'Screen recorder and screenshot tool (paid)',
        group: 'apps',
        tags: ['productivity'],
        paid: true,
        commands: () => [BREW_CASK('cleanshot')],
    },
    {
        name: 'Paste',
        description: 'Clipboard manager (paid)',
        group: 'apps',
        tags: ['super-user'],
        paid: true,
        commands: () => [OPEN_APP_STORE_APP_LINK('paste-endless-clipboard/id967805235')],
    },
    {
        name: 'RCMD',
        description: 'Switch apps instantly using a Hotkey (paid)',
        group: 'apps',
        tags: ['super-user'],
        paid: true,
        commands: () => [OPEN_APP_STORE_APP_LINK('rcmd-app-switcher/id1596283165')],
    },
    {
        name: 'Amphetamine',
        description: 'Prevent your Mac from sleeping',
        group: 'apps',
        tags: ['super-user'],
        commands: () => [OPEN_APP_STORE_APP_LINK('amphetamine/id937984704')],
    },
    {
        name: 'BetterSnapTool',
        description: 'Easy window resize & organize',
        group: 'apps',
        tags: ['super-user'],
        commands: () => [OPEN_APP_STORE_APP_LINK('bettersnaptool/id417375580')],
    },
    {
        name: 'TextSniper',
        description: 'Extract and copy text from images (paid)',
        group: 'apps',
        tags: ['productivity'],
        paid: true,
        commands: () => [BREW_CASK('textsniper')],
    },
    {
        name: 'Rocket',
        description: 'Emoji shortcuts for faster typing',
        group: 'apps',
        tags: ['productivity'],
        commands: () => [BREW_CASK('rocket')],
    },
    {
        name: 'TinkerTool',
        description: 'Access hidden system settings on macOS',
        group: 'apps',
        tags: ['super-user'],
        commands: () => [OPEN_BROWSER_LINK('https://www.bresink.com/osx/0TinkerTool/download.php')],
    },
    {
        name: 'Dropover',
        description: 'Drag and drop files between apps with quick actions (paid)',
        group: 'apps',
        tags: ['super-user'],
        paid: true,
        commands: () => [OPEN_APP_STORE_APP_LINK('dropover-easier-drag-drop/id1355679052')],
    },
    {
        name: 'Hovrly',
        description: 'Easily see time zones in your menu bar',
        group: 'apps',
        commands: () => [BREW_INSTALL('hovrly')],
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
        fallbackCommands: () => [BROW_CASK('whatsapp')],
    },
    {
        name: 'WhatsApp (legacy)',
        description: 'WhatsApp legacy version',
        group: 'apps',
        commands: () => [
            BREW_CASK(
                'https://raw.githubusercontent.com/Homebrew/homebrew-cask/2f428f0d63c346637aafd8a8b2f474670c2e42f1/Casks/w/whatsapp.rb',
            ),
        ],
        fallbackCommands: () => [
            BROW_CASK(
                'https://raw.githubusercontent.com/Homebrew/homebrew-cask/2f428f0d63c346637aafd8a8b2f474670c2e42f1/Casks/w/whatsapp.rb',
            ),
        ],
    },
    {
        name: 'Telegram',
        group: 'apps',
        tags: ['personal'],
        commands: () => [BREW_CASK('telegram')],
        fallbackCommands: () => [BROW_CASK('telegram')],
    },
    {
        name: 'Dash',
        group: 'apps',
        description: 'Documentation browser',
        commands: () => [BREW_CASK('dash')],
    },
    {
        name: 'Vivid',
        group: 'apps',
        description: 'Unlocks the full brightness of your MacBook Pro (paid)',
        paid: true,
        commands: () => [BREW_CASK('vivid')],
    },
] as const
