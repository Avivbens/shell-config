import { DefaultTheme } from 'vitepress'

export const SIDEBAR: DefaultTheme.Sidebar = [
    {
        text: 'Commands',
        collapsed: false,
        base: '/app/commands/',
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
