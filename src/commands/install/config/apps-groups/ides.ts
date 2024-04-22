import type { IAppSetup } from '@models/app-setup.model'
import { BREW_CASK } from '../common-commands'

export const IDES: Readonly<IAppSetup[]> = [
    {
        name: 'Visual Studio Code',
        group: 'IDEs',
        tags: ['engineering'],
        commands: () => [BREW_CASK('visual-studio-code')],
    },
    {
        name: 'Webstorm',
        group: 'IDEs',
        tags: ['web-engineering', 'node-engineering'],
        paid: true,
        commands: () => [BREW_CASK('webstorm')],
    },
    {
        name: 'Pycharm',
        group: 'IDEs',
        tags: ['python-engineering'],
        description: 'Python IDE',
        paid: true,
        commands: () => [BREW_CASK('pycharm')],
    },
]
