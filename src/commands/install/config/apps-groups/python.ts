import type { Arch, IAppSetup } from '@models/app-setup.model'
import { BREW_INSTALL } from '../common-commands'

export const PYTHON: Readonly<IAppSetup[]> = [
    {
        name: 'Python',
        group: 'python',
        default: true,
        commands: (arch: Arch) => [BREW_INSTALL('python', arch)],
    },
    {
        name: 'Python PIP',
        group: 'python',
        default: true,
        commands: (arch: Arch) => [
            'curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py',
            'python3 get-pip.py',
            'rm get-pip.py',
        ],
        description: 'Python package manager, Python is required',
        deps: ['Python'],
    },
] as const
