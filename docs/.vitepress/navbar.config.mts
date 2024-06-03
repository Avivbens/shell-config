import { DefaultTheme } from 'vitepress'
// @ts-expect-error
import { version } from '../../package.json'
import { REPOSITORY_FULLNAME } from './constants/repository.mjs'

export const NAVBAR: DefaultTheme.NavItem[] = [
    { text: 'Home', link: '/' },
    {
        text: version,
        items: [
            {
                text: 'Changelog',
                link: `https://github.com/${REPOSITORY_FULLNAME}/blob/v${version}/CHANGELOG.md`,
            },
            {
                text: 'Contributing',
                link: `https://github.com/${REPOSITORY_FULLNAME}/blob/v${version}/CONTRIBUTING.md`,
            },
            {
                text: 'License',
                link: `https://github.com/${REPOSITORY_FULLNAME}/blob/v${version}/LICENSE`,
            },
            {
                text: 'Security',
                link: `https://github.com/${REPOSITORY_FULLNAME}/blob/v${version}/SECURITY.md`,
            },
        ],
    },
]
