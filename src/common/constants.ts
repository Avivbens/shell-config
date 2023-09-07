import { homedir } from 'node:os'

export const GITHUB_REPO = 'Avivbens/shell-config'
export const GITHUB_RELEASES_API_URL = `https://api.github.com/repos/${GITHUB_REPO}/releases`
export const BASE_PATH = `${homedir()}/shell-config`
export const BOOTSTRAP_TIME = new Date().toISOString()
