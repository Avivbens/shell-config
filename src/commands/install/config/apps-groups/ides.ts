import type { IAppSetup } from '@models/app-setup.model'
import { BREW_CASK } from '../common-commands'

export const IDES: Readonly<IAppSetup[]> = [
    {
        name: 'Visual Studio Code',
        group: 'IDEs',
        tags: ['engineering', 'devops'],
        commands: () => [BREW_CASK('visual-studio-code')],
    },
    {
        name: 'Webstorm',
        group: 'IDEs',
        tags: ['engineering', 'devops'],
        commands: () => [BREW_CASK('webstorm')],
    },
]
