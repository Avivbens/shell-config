import type { IAppSetup } from '@models/app-setup.model'
import { BREW_CASK, OPEN_APP_STORE_APP_LINK } from '../common-commands'

export const SECURITY_PRIVACY: Readonly<IAppSetup[]> = [
    {
        name: 'Unplug Alarm',
        description: 'Protect your device from theft (paid)',
        group: 'security-privacy',
        paid: true,
        commands: () => [OPEN_APP_STORE_APP_LINK('unplug-alarm-anti-theft-app/id1489026302')],
    },
    {
        name: 'Radio Silence',
        description: 'Firewall to detect and block any application from accessing the internet (paid)',
        group: 'security-privacy',
        paid: true,
        commands: () => [BREW_CASK('radio-silence')],
    },
]
