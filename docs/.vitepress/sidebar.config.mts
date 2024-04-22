import { DefaultTheme } from 'vitepress'

export const SIDEBAR: DefaultTheme.Sidebar = [
    {
        text: 'Commands',
        base: '/app/commands/',
        link : '../setup',
        collapsed: false,
        items: [
            {
                text: 'Install',
                link: '/install.md',
            },
            {
                text: 'Shell',
                link: '/shell.md',
            },
            {
                text: 'Assets',
                link: '/assets.md',
            },
            {
                text: 'Update',
                link: '/update.md',
            },
        ],
    },
    {
        text: 'Troubleshooting',
        base: '/app/troubleshooting/',
        link: 'index',
        collapsed: false,
        items: [
            {
                text: 'Permissions',
                link: '/permissions.md',
            },
            {
                text: 'Not Found',
                link: '/not-found.md',
            },
        ],
    },
]
