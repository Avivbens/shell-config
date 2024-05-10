import { randomUUID } from 'node:crypto'
import { homedir } from 'node:os'
import { stdout } from 'node:process'

export const GITHUB_REPO = 'Avivbens/shell-config' as const
export const GITHUB_RELEASES_API_URL = `https://api.github.com/repos/${GITHUB_REPO}/releases` as const
export const BASE_PATH = `${homedir()}/shell-config` as const
export const BOOTSTRAP_UUID = randomUUID().slice(0, 8)

export const CURL_COMMAND = `curl -fsSLk`

export const BREW_NON_ERRORS: string[] = [
    `Error: It seems there is already an App at`,
    `the latest version is already installed`,
]

export const BREW_INSTALL_RETRIES = 3

export const WINDOW_WIDTH = () => stdout.getWindowSize().at(0)
export const WINDOW_HIGHT = () => stdout.getWindowSize().at(1)
