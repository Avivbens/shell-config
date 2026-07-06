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
        name: 'Full screen shortcut',
        description: 'Toggle full screen with Ctrl+Shift+F',
        group: 'MacOS',
        default: true,
        /**
         * Bind the standard Cocoa full screen menu commands to Ctrl+Shift+F via NSUserKeyEquivalents
         * (^ = Ctrl, $ = Shift) — the "App Shortcuts → All Applications" pane in System Settings.
         * All three menu-item titles are set so it works whether an app exposes a single "Toggle Full
         * Screen" command or the separate "Enter/Exit Full Screen" pair. `-dict-add` merges into the
         * existing dict instead of overwriting it. Applies to apps launched after this runs; a
         * logout/login fully propagates it.
         *
         * The value MUST be single-quoted: the command runs through a shell, and `$f` in double quotes
         * would be expanded as an (empty) shell variable, collapsing the shortcut to a bare `^`.
         */
        commands: () => [
            `defaults write -g NSUserKeyEquivalents -dict-add "Toggle Full Screen" '^$f'`,
            `defaults write -g NSUserKeyEquivalents -dict-add "Enter Full Screen" '^$f'`,
            `defaults write -g NSUserKeyEquivalents -dict-add "Exit Full Screen" '^$f'`,
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
