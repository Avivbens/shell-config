import { DefaultTheme } from 'vitepress'
// @ts-expect-error
import { version } from '../../package.json'

export const NAVBAR: DefaultTheme.NavItem[] = [
    { text: 'Home', link: '/' },
    {
        text: version,
        items: [
            {
                text: 'Changelog',
                link: 'https://github.com/Avivbens/shell-config/blob/master/CHANGELOG.md',
            },
            {
                text: 'Contributing',
                link: 'https://github.com/Avivbens/shell-config/blob/master/CONTRIBUTING.md',
            },
        ],
    },
]
