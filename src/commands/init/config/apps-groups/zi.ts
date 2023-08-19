import { IAppSetup } from '@models/app-setup.model'

export const ZI: Readonly<IAppSetup[]> = [
    {
        name: 'Update Hosts File',
        group: 'ZI',
        default: true,
        commands: [
            'sudo chmod +a "user:$USER allow read,write,append,readattr,writeattr,readextattr,writeextattr,readsecurity" /etc/hosts && echo 127.0.0.1 dev.zoominfo.com >> /etc/hosts',
        ],
    },
] as const
