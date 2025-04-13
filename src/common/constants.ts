import { randomUUID } from 'node:crypto'
import { homedir } from 'node:os'
import { stdout } from 'node:process'
import * as packageJson from '../../package.json'

export const GITHUB_REPO = 'Avivbens/shell-config' as const
export const GITHUB_RELEASES_API_URL = `https://api.github.com/repos/${GITHUB_REPO}/releases` as const
export const BASE_PATH = `${homedir()}/shell-config` as const
export const BOOTSTRAP_UUID = randomUUID().slice(0, 8)

export const PACKAGE_VERSION = packageJson.version

export const CURL_COMMAND = `curl -fsSLk`

export const BREW_NON_ERRORS: string[] = [
    `Error: It seems there is already an App at`,
    `the latest version is already installed`,
]

export const BREW_LOCKING_STATE_ERROR = `process has already locked`
export const RANDOM_WAIT_BOUNDARY = 15_000
export const RANDOM_WAIT_MIN = 10_000

export const BREW_INSTALL_RETRIES = 5

export const WINDOW_WIDTH = () => stdout.getWindowSize().at(0)
export const WINDOW_HIGHT = () => stdout.getWindowSize().at(1)
