import { execSync } from 'node:child_process'
import { env } from 'node:process'

const remoteOrigin =
    env.GITHUB_SERVER_URL && env.GITHUB_REPOSITORY
        ? `${env.GITHUB_SERVER_URL}/${env.GITHUB_REPOSITORY}.git`
        : execSync('git remote get-url origin').toString().trim()

export const REMOTE_BASE_URL = new URL(remoteOrigin).origin

export const REPOSITORY_LINK = remoteOrigin.replace(/\.git$/m, '')

export const REPOSITORY_FULLNAME = env.GITHUB_REPOSITORY || remoteOrigin.match(/^https:\/\/.*\/(.*\/.*).git$/m)?.[1]

export const getDocsBase = (): string => {
    if (!env.CI) {
        return `/pages/${REPOSITORY_FULLNAME}/`
    }

    const { GITHUB_REPOSITORY_OWNER: owner } = env

    const repoName = REPOSITORY_FULLNAME?.replace(`${owner}/`, '')
    return `/${repoName}/`
}

// TODO: dynamically get the default branch
export const remoteDefaultBranch = 'master'

if (!REMOTE_BASE_URL) {
    throw new Error('Could not find remote base URL!')
} else if (!REPOSITORY_LINK) {
    throw new Error('Could not find repository link!')
} else if (!REPOSITORY_FULLNAME) {
    throw new Error('Could not find repository fullname!')
} else if (!remoteDefaultBranch) {
    throw new Error('Could not find remote default branch!')
}
