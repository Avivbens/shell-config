import type { IAppSetup } from '@models/app-setup.model'
import { BREW_CASK, BREW_HOME, BROW_CASK } from '../common-commands'

export const IDES: Readonly<IAppSetup[]> = [
    {
        name: 'Visual Studio Code',
        group: 'IDEs',
        tags: ['engineering'],
        openUrl: () => BREW_HOME('visual-studio-code', true),
        commands: () => [BREW_CASK('visual-studio-code')],
    },
    {
        name: 'Webstorm',
        group: 'IDEs',
        tags: ['web-engineering', 'node-engineering'],
        paid: true,
        openUrl: () => BREW_HOME('webstorm', true),
        commands: () => [BROW_CASK('webstorm')],
        fallbackCommands: () => [BREW_CASK('webstorm')],
    },
    {
        name: 'Pycharm',
        group: 'IDEs',
        tags: ['python-engineering'],
        description: 'Python IDE',
        paid: true,
        openUrl: () => BREW_HOME('pycharm', true),
        commands: () => [BROW_CASK('pycharm')],
        fallbackCommands: () => [BREW_CASK('pycharm')],
    },
]
