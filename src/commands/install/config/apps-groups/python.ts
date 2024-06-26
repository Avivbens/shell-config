import { CURL_COMMAND } from '@common/constants'
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
        description: 'Python package manager',
        group: 'python',
        default: true,
        openUrl: () => `open https://pypi.org/project/pip/`,
        commands: () => [
            `${CURL_COMMAND} https://bootstrap.pypa.io/get-pip.py -o /tmp/get-pip.py`,
            'python3 /tmp/get-pip.py --break-system-packages',
            'rm /tmp/get-pip.py',
        ],
        deps: ['Python'],
    },
] as const
