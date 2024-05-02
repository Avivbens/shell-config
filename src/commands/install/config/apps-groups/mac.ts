import type { IAppSetup } from '@models/app-setup.model'

export const MACOS: Readonly<IAppSetup[]> = [
    {
        name: 'Sudo password with Touch ID',
        group: 'MacOS',
        default: true,
        commands: () => [
            'sudo -v',
            'sudo cp -f /etc/pam.d/sudo_local.template /etc/pam.d/sudo_local',
            `sudo /bin/bash -c "echo 'auth       sufficient     pam_tid.so' >> /etc/pam.d/sudo_local"`,
        ],
    },
    {
        name: 'Update MacOS version',
        group: 'MacOS',
        default: true,
        commands: () => ['softwareupdate -i -a --agree-to-license'],
        last: true,
    },
]
