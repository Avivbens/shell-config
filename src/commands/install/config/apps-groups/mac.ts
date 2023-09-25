import type { IAppSetup } from '@models/app-setup.model'

export const MACOS: Readonly<IAppSetup[]> = [
    {
        name: 'Update MacOS version',
        group: 'MacOS',
        default: true,
        commands: () => ['softwareupdate -i -a --agree-to-license'],
        last: true,
    },
]
