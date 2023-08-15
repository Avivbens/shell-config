import { IAppSetup } from '../../../models/app-setup.model'
import { BREW_INSTALL } from '../utils'

export const PYTHON: Readonly<IAppSetup[]> = [
    {
        name: 'Python',
        group: 'python',
        default: true,
        commands: [BREW_INSTALL('python')],
    },
    {
        name: 'Python PIP',
        group: 'python',
        default: true,
        commands: [
            'curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py',
            'python3 get-pip.py',
            'rm get-pip.py',
        ],
        description: 'Python package manager, Python is required',
        deps: ['Python'],
    },
] as const
