import type { IAppSetup } from '@models/app-setup.model'
import { BREW_CASK } from '../common-commands'

export const BROWSERS: Readonly<IAppSetup[]> = [
    {
        name: 'Google Chrome',
        group: 'browsers',
        default: true,
        description: 'Web browser',
        commands: () => [BREW_CASK('google-chrome')],
    },
    {
        name: 'Firefox',
        group: 'browsers',
        description: 'Web browser',
        commands: () => [BREW_CASK('firefox')],
    },
]
