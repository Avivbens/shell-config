import type { IAppSetup } from '@models/app-setup.model'
import { BREW_CASK } from '../common-commands'

export const MEDIA_APPS: Readonly<IAppSetup[]> = [
    {
        name: 'Downie',
        description: 'Video downloader for YouTube and other video sites (paid)',
        group: 'media',
        paid: true,
        commands: () => [BREW_CASK('downie')],
    },
    {
        name: 'VLC',
        group: 'media',
        commands: () => [BREW_CASK('vlc')],
    },
    {
        name: 'Subler',
        description: 'MP4 metadata editor, video converter, and muxer',
        group: 'media',
        commands: () => [BREW_CASK('subler')],
    },
] as const
