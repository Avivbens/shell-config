import type { IAppSetup } from '@models/app-setup.model'
import { BREW_HOME, BREW_INSTALL, BROW_INSTALL } from '../common-commands'

export const PYTHON: Readonly<IAppSetup[]> = [
    {
        name: 'Python',
        group: 'python',
        default: true,
        commands: () => [BREW_INSTALL('python')],
        fallbackCommands: () => [BROW_INSTALL('python')],
    },
    {
        name: 'uv',
        description: 'Extremely fast Python package and project manager (pip/pipx replacement)',
        group: 'python',
        default: true,
        openUrl: () => BREW_HOME('uv'),
        commands: () => [BREW_INSTALL('uv')],
        fallbackCommands: () => [BROW_INSTALL('uv')],
        deps: ['Python'],
    },
] as const
