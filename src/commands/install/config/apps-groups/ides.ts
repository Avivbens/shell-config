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
        commands: () => [BREW_CASK('webstorm')],
        fallbackCommands: () => [BROW_CASK('webstorm')],
    },
    {
        name: 'IntelliJ IDEA Ultimate',
        group: 'IDEs',
        paid: true,
        openUrl: () => BREW_HOME('intellij-idea', true),
        commands: () => [BREW_CASK('intellij-idea')],
        fallbackCommands: () => [BROW_CASK('intellij-idea')],
    },
    {
        name: 'Pycharm',
        group: 'IDEs',
        tags: ['python-engineering'],
        description: 'Python IDE',
        paid: true,
        openUrl: () => BREW_HOME('pycharm', true),
        commands: () => [BREW_CASK('pycharm')],
        fallbackCommands: () => [BROW_CASK('pycharm')],
    },
]
