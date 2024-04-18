import type { Arch } from '@models/app-setup.model'

const ARCH_FLAG = (arch?: Arch): '' | `arch -${Arch}` => (arch ? `arch -${arch}` : '')
export const BROW_ALIAS = `arch --x86_64 /usr/local/Homebrew/bin/brew`

// BREW
export const BREW_CASK = (app: string) => `yes | HOMEBREW_NO_AUTO_UPDATE=1 NONINTERACTIVE=1 brew install --cask ${app}`
export const BREW_INSTALL = (formula: string) =>
    `yes | HOMEBREW_NO_AUTO_UPDATE=1 NONINTERACTIVE=1 brew install ${formula}`
export const BREW_TAP = (tapTo: string) => `yes | HOMEBREW_NO_AUTO_UPDATE=1 NONINTERACTIVE=1 brew tap ${tapTo}`

// BROW
export const BROW_CASK = (app: string) =>
    `yes | HOMEBREW_NO_AUTO_UPDATE=1 NONINTERACTIVE=1 ${BROW_ALIAS} install --cask ${app}`
export const BROW_INSTALL = (formula: string) =>
    `yes | HOMEBREW_NO_AUTO_UPDATE=1 NONINTERACTIVE=1 ${BROW_ALIAS} install ${formula}`
export const BROW_TAP = (tapTo: string) => `yes | HOMEBREW_NO_AUTO_UPDATE=1 NONINTERACTIVE=1 ${BROW_ALIAS} tap ${tapTo}`

// NODE
export const NODE_GLOBAL = (packageName: string) =>
    `source $HOME/.nvm/nvm.sh && npm install -g ${packageName} --registry=https://registry.npmjs.org/`

export const NVM_COMMAND = (command: string) => `source $HOME/.nvm/nvm.sh && nvm ${command}`
