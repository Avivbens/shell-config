import { defineConfig } from 'vitepress'
import { remoteDefaultBranch, repositoryFullname } from './constants/repository.mjs'
import { NAVBAR } from './navbar.config.mjs'
import { SIDEBAR } from './sidebar.config.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Shell Config',
    description: 'CLI Tool for MacOS setup - apps, shell, assets, etc',
    base: `/pages/${repositoryFullname}/`,
    cleanUrls: true,
    ignoreDeadLinks: false,
    outDir: '../dist/docs/',
    markdown: {
        defaultHighlightLang: 'typescript',
        breaks: true,
        lineNumbers: true,
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: NAVBAR,
        sidebar: SIDEBAR,
        socialLinks: [
            //
            { icon: 'github', link: `https://github.com/${repositoryFullname}#readme` },
        ],
        search: { provider: 'local' },
        editLink: {
            pattern: `https://github.com/${repositoryFullname}/edit/${remoteDefaultBranch}/docs/:path`,
            text: 'Edit this page on GitHub',
        },
        lastUpdated: {
            formatOptions: { dateStyle: 'medium' },
        },
    },
})
