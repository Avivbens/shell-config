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
                link: '/install',
            },
            {
                text: 'Shell',
                link: '/shell',
            },
            {
                text: 'Assets',
                link: '/assets',
            },
            {
                text: 'Update',
                link: '/update',
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
                link: '/permissions',
            },
            {
                text: 'Not Found',
                link: '/not-found',
            },
        ],
    },
]
