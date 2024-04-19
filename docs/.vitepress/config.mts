import { defineConfig } from 'vitepress'
import { REPOSITORY_FULLNAME, getDocsBase, remoteDefaultBranch } from './constants/repository.mjs'
import { NAVBAR } from './navbar.config.mjs'
import { SIDEBAR } from './sidebar.config.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: ' ',
    description: 'CLI Tool for MacOS setup - apps, shell, assets, etc',
    base: getDocsBase(),
    cleanUrls: true,
    ignoreDeadLinks: false,
    outDir: '../dist/docs/',
    head: [['link', { rel: 'icon', href: 'favicon.ico' }]],
    markdown: {
        defaultHighlightLang: 'typescript',
        breaks: true,
        lineNumbers: true,
    },
    appearance: 'force-dark',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/logos/logo-short-no-bg.png',
        nav: NAVBAR,
        sidebar: SIDEBAR,
        socialLinks: [
            //
            { icon: 'github', link: `https://github.com/${REPOSITORY_FULLNAME}#readme` },
        ],
        search: { provider: 'local' },
        editLink: {
            pattern: `https://github.com/${REPOSITORY_FULLNAME}/edit/${remoteDefaultBranch}/docs/:path`,
            text: 'Edit this page on GitHub',
        },
        lastUpdated: {
            formatOptions: { dateStyle: 'medium' },
        },
    },
})
