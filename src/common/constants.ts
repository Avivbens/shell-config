import { randomUUID } from 'node:crypto'
import { homedir } from 'node:os'

export const GITHUB_REPO = 'Avivbens/shell-config' as const
export const GITHUB_RELEASES_API_URL =
    `https://api.github.com/repos/${GITHUB_REPO}/releases` as const
export const BASE_PATH = `${homedir()}/shell-config` as const
export const BOOTSTRAP_UUID = randomUUID().slice(0, 8)
