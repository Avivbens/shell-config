import type { IAppSetup } from '@models/app-setup.model'
import { BREW_HOME, BREW_INSTALL } from '../common-commands'

export const MACOS: Readonly<IAppSetup[]> = [
    {
        name: 'Sudo password with Touch ID',
        description: 'Enable Touch ID for sudo (password needed)',
        group: 'MacOS',
        default: true,
        first: true,
        openUrl: () => `open https://gist.github.com/windyinsc/26aaa8783c7734529998062a11d80b96`,
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
        openUrl: () => BREW_HOME('smartmontools'),
        commands: () => [BREW_INSTALL('smartmontools')],
    },
    {
        name: 'Allow repeat on key hold',
        description: 'Disable press-and-hold for keys in favor of key repeat',
        group: 'MacOS',
        default: true,
        commands: () => ['defaults write -g ApplePressAndHoldEnabled -bool false'],
    },
    {
        name: 'Update MacOS version',
        group: 'MacOS',
        default: true,
        commands: () => ['softwareupdate -i -a --agree-to-license'],
        last: true,
    },
]
