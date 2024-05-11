import { defineConfig } from 'vitepress'
import { GOOGLE_ANALYTICS_ID, GOOGLE_ANALYTICS_SCRIPT } from './analytics/google-analytics.config'
import { REPOSITORY_FULLNAME, getDocsBase, remoteDefaultBranch } from './constants/repository.mjs'
import { NAVBAR } from './navbar.config.mjs'
import { SIDEBAR } from './sidebar.config.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Shell Config',
    description: 'CLI Tool for MacOS setup - apps, shell, assets, etc',
    base: getDocsBase(),
    cleanUrls: true,
    ignoreDeadLinks: false,
    outDir: '../dist/docs/',
    head: [
        ['link', { rel: 'icon', href: 'favicon/favicon.ico' }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: 'favicon/favicon-32x32.png' }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: 'favicon/favicon-16x16.png' }],
        ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: 'favicon/apple-touch-icon.png' }],
        ['link', { rel: 'manifest', href: 'favicon/site.webmanifest' }],
        ['script', { async: '', src: `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}` }],
        ['script', {}, GOOGLE_ANALYTICS_SCRIPT],
    ],
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
        siteTitle: '',
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
        footer: {
            message: 'Released under the MIT License',
            copyright: 'Copyright © 2023-present Aviv Ben Shahar',
        },
    },
})
