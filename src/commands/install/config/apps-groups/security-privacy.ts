import type { IAppSetup } from '@models/app-setup.model'
import { BREW_CASK, BREW_HOME, OPEN_APP_STORE_APP_LINK } from '../common-commands'

export const SECURITY_PRIVACY: Readonly<IAppSetup[]> = [
    {
        name: 'Unplug Alarm',
        description: 'Protect your device from theft',
        group: 'security-privacy',
        paid: true,
        openUrl: () => `open https://unplugalarm.app/`,
        commands: () => [OPEN_APP_STORE_APP_LINK('unplug-alarm-anti-theft-app/id1489026302')],
    },
    {
        name: 'Radio Silence',
        description: 'Firewall to detect and block any application from accessing the internet',
        group: 'security-privacy',
        paid: true,
        openUrl: () => BREW_HOME('radio-silence', true),
        commands: () => [BREW_CASK('radio-silence')],
    },
]
