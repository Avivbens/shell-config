export const BREW_CASK = (app: string) =>
    `yes | HOMEBREW_NO_AUTO_UPDATE=1 NONINTERACTIVE=1 brew install --cask ${app}`
export const BREW_INSTALL = (formula: string) =>
    `yes | HOMEBREW_NO_AUTO_UPDATE=1 NONINTERACTIVE=1 brew install ${formula}`
export const BREW_TAP = (tapTo: string) =>
    `yes | HOMEBREW_NO_AUTO_UPDATE=1 NONINTERACTIVE=1 brew tap ${tapTo}`
export const NODE_GLOBAL = (packageName: string) =>
    `npm install -g ${packageName} --registry=https://registry.npmjs.org/`

export const NVM_COMMAND = (command: string) => `source $HOME/.nvm/nvm.sh && nvm ${command}`
