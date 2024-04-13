import type { IAppSetup } from '@models/app-setup.model'
import { BREW_INSTALL, BROW_INSTALL } from '../common-commands'

export const PYTHON: Readonly<IAppSetup[]> = [
    {
        name: 'Python',
        group: 'python',
        default: true,
        commands: () => [BREW_INSTALL('python')],
        fallbackCommands: () => [BROW_INSTALL('python')],
    },
    {
        name: 'Python PIP',
        group: 'python',
        default: true,
        commands: () => [
            'curl -fsSLk https://bootstrap.pypa.io/get-pip.py -o /tmp/get-pip.py',
            'python3 /tmp/get-pip.py',
            'rm /tmp/get-pip.py',
        ],
        description: 'Python package manager, Python is required',
        deps: ['Python'],
    },
] as const
