import type { IAppSetup } from '@models/app-setup.model'
import { BREW_INSTALL } from '../common-commands'

export const MACOS: Readonly<IAppSetup[]> = [
    {
        name: 'Sudo password with Touch ID',
        description: 'Enable Touch ID for sudo (password needed)',
        group: 'MacOS',
        default: true,
        first: true,
        commands: () => [
            'sudo -v',
            'sudo cp -f /etc/pam.d/sudo_local.template /etc/pam.d/sudo_local',
            `sudo /bin/bash -c "echo 'auth       sufficient     pam_tid.so' >> /etc/pam.d/sudo_local"`,
        ],
    },
    {
        name: 'smartmontools',
        description: 'Monitor your hard drive health',
        group: 'MacOS',
        commands: () => [BREW_INSTALL('smartmontools')],
    },
    {
        name: 'Update MacOS version',
        group: 'MacOS',
        default: true,
        commands: () => ['softwareupdate -i -a --agree-to-license'],
        last: true,
    },
]
