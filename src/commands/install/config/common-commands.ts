import { execSync } from 'node:child_process'
import { arch } from 'node:process'

export const BROW_ALIAS = `arch --x86_64 /usr/local/Homebrew/bin/brew`

/** Force native arm64 so brew runs correctly even when this Node process is translated by Rosetta 2. */
const BREW_ARM = `arch -arm64 /opt/homebrew/bin/brew`

/**
 * True hardware architecture, independent of how this Node process was launched.
 *
 * `process.arch` reports `x64` when Node runs under Rosetta 2 on Apple Silicon, which used to route
 * every install to the x86 brew (brow) even though native /opt/homebrew works when run manually.
 * `hw.optional.arm64` is `1` on Apple Silicon regardless of translation, and errors on Intel — so it
 * reflects the real CPU rather than the process personality.
 */
const isAppleSilicon = ((): boolean => {
    if (arch === 'arm64') {
        return true
    }

    try {
        return execSync('sysctl -n hw.optional.arm64 2>/dev/null').toString().trim() === '1'
    } catch {
        return false
    }
})()

/**
 * Primary brew binary, chosen by the true machine architecture.
 *
 * Apple Silicon uses the native /opt/homebrew (forced to arm64 so it works even under a Rosetta 2
 * Node process); Intel uses the x86 brew that InitCommand guarantees in /usr/local.
 */
const BREW_ALIAS = isAppleSilicon ? BREW_ARM : BROW_ALIAS

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
 * Install a free Mac App Store app via the `mas` CLI.
 *
 * Ensures `mas` is present first (idempotent), then `mas get` acquires/installs the app by id.
 * Unlike `open <store-url>`, `mas` exits non-zero on failure, so success is real. Requires a
 * one-time App Store sign-in and sudo (primed by `sudo -v` in the parallel install path).
 * Paid apps cannot be purchased from the CLI — those stay `manual`.
 */
export const MAS_APP_STORE = (id: string): readonly string[] => [BREW_INSTALL('mas'), `sudo mas get ${id}`]

/**
 * NodeJS
 */
const LOAD_NVM = `source $HOME/.nvm/nvm.sh`
export const NODE_GLOBAL = (packageName: string) =>
    `${LOAD_NVM} && npm install -g ${packageName} --registry=https://registry.npmjs.org/`
export const NPM_HOME = (packageName: string) => OPEN_BROWSER_LINK(`https://www.npmjs.com/package/${packageName}`)

export const NVM_COMMAND = (command: string) => `${LOAD_NVM} && nvm ${command}`
