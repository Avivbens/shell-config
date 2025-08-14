import type { IAppSetup } from '@models/app-setup.model'
import { BREW_CASK, BREW_HOME, BREW_INSTALL, OPEN_APP_STORE_APP_LINK } from '../common-commands'

export const MEDIA_APPS: Readonly<IAppSetup[]> = [
    {
        name: 'Downie',
        description: 'Video downloader for YouTube and other video sites',
        group: 'media',
        paid: true,
        openUrl: () => BREW_HOME('downie', true),
        commands: () => [BREW_CASK('downie')],
    },
    {
        name: 'IINA',
        group: 'media',
        description: 'Open-source modern video player for macOS',
        openUrl: () => BREW_HOME('iina', true),
        commands: () => [BREW_CASK('iina')],
    },
    {
        name: 'Cap Cut',
        group: 'media',
        description: 'Video editor for macOS',
        openUrl: () => BREW_HOME('capcut', true),
        commands: () => [BREW_CASK('capcut')],
    },
    {
        name: 'Pixelmator Pro',
        description: 'Incredibly powerful, beautiful, and easy-to-use image editor designed exclusively for Mac.',
        group: 'apps',
        openUrl: () => `open https://www.pixelmator.com/pro`,
        commands: () => [OPEN_APP_STORE_APP_LINK('pixelmator-pro/id1289583905')],
    },
    {
        name: 'Screen Studio',
        group: 'media',
        description: 'Screen recording and video editing tool - in one',
        paid: true,
        openUrl: () => BREW_HOME('screen-studio', true),
        commands: () => [BREW_CASK('screen-studio')],
    },
    {
        name: 'YT-DLP',
        group: 'media',
        description: 'CLI tool for audio/video downloading, with support for fragmented DASH streams',
        openUrl: () => BREW_HOME('yt-dlp'),
        commands: () => [BREW_INSTALL('yt-dlp')],
    },
    {
        name: 'VLC',
        group: 'media',
        description: 'Open-source multimedia player',
        openUrl: () => BREW_HOME('vlc', true),
        commands: () => [BREW_CASK('vlc')],
    },
    {
        name: 'Subler',
        description: 'MP4 metadata editor, video converter, and muxer',
        group: 'media',
        openUrl: () => BREW_HOME('subler', true),
        commands: () => [BREW_CASK('subler')],
    },
] as const
