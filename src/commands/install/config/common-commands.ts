import { Arch } from '@models/app-setup.model'

const ARCH_FLAG = (arch?: Arch): '' | `arch -${Arch}` => (arch ? `arch -${arch}` : '')
export const BREW_CASK = (app: string) =>
    `yes | HOMEBREW_NO_AUTO_UPDATE=1 NONINTERACTIVE=1 brew install --cask ${app}`
export const BREW_INSTALL = (formula: string, arch?: Arch) =>
    `yes | HOMEBREW_NO_AUTO_UPDATE=1 NONINTERACTIVE=1 ${ARCH_FLAG(arch)} brew install ${formula}`

export const BREW_TAP = (tapTo: string) =>
    `yes | HOMEBREW_NO_AUTO_UPDATE=1 NONINTERACTIVE=1 brew tap ${tapTo}`
export const NODE_GLOBAL = (packageName: string) =>
    `source $HOME/.nvm/nvm.sh && npm install -g ${packageName} --registry=https://registry.npmjs.org/`

export const NVM_COMMAND = (command: string) => `source $HOME/.nvm/nvm.sh && nvm ${command}`
