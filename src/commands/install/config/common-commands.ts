import type { Arch } from '@models/app-setup.model'

const ARCH_FLAG = (arch?: Arch): '' | `arch -${Arch}` => (arch ? `arch -${arch}` : '')
export const BROW_ALIAS = `arch --x86_64 /usr/local/Homebrew/bin/brew`
const BREW_ALIAS = `/opt/homebrew/bin/brew`

const BREW_NON_INTERACTIVE_FLAGS = `yes | HOMEBREW_NO_AUTO_UPDATE=1 NONINTERACTIVE=1`

/**
 * General
 */
export const OPEN_BROWSER_LINK = (link: string) => `open ${link}`

/**
 * HomeBrew
 */
export const BREW_CASK = (app: string) => `${BREW_NON_INTERACTIVE_FLAGS} ${BREW_ALIAS} install --cask ${app}`
export const BREW_HOME = (app: string, cask: boolean = false) =>
    `${BREW_NON_INTERACTIVE_FLAGS} ${BREW_ALIAS} home ${cask ? '--cask' : ''} ${app}`
export const BREW_INSTALL = (formula: string) => `${BREW_NON_INTERACTIVE_FLAGS} ${BREW_ALIAS} install ${formula}`
export const BREW_TAP = (tapTo: string) => `${BREW_NON_INTERACTIVE_FLAGS} ${BREW_ALIAS} tap ${tapTo}`

/**
 * HomeBrew - Rosetta
 */
export const BROW_CASK = (app: string) => `${BREW_NON_INTERACTIVE_FLAGS} ${BROW_ALIAS} install --cask ${app}`
export const BROW_INSTALL = (formula: string) => `${BREW_NON_INTERACTIVE_FLAGS} ${BROW_ALIAS} install ${formula}`
export const BROW_TAP = (tapTo: string) => `${BREW_NON_INTERACTIVE_FLAGS} ${BROW_ALIAS} tap ${tapTo}`

/**
 * App Store
 */
export const OPEN_APP_STORE_APP_LINK = (appPath: `${string}/id${number}`) =>
    OPEN_BROWSER_LINK(`https://apps.apple.com/us/app/${appPath}`)

/**
 * NodeJS
 */
const LOAD_NVM = `source $HOME/.nvm/nvm.sh`
export const NODE_GLOBAL = (packageName: string) =>
    `${LOAD_NVM} && npm install -g ${packageName} --registry=https://registry.npmjs.org/`
export const NPM_HOME = (packageName: string) => OPEN_BROWSER_LINK(`https://www.npmjs.com/package/${packageName}`)

export const NVM_COMMAND = (command: string) => `${LOAD_NVM} && nvm ${command}`
