import type { IAppSetup } from '@models/app-setup.model'
import { BREW_CASK, BREW_HOME } from '../common-commands'

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
