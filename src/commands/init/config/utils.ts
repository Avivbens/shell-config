export const BREW_CASK = (app: string) => `brew install --cask ${app}`
export const BREW_INSTALL = (formula: string) => `brew install ${formula}`
export const BREW_TAP = (tapTo: string) => `brew tap ${tapTo}`
export const NODE_GLOBAL = (packageName: string) =>
    `npm install -g ${packageName} --registry=https://registry.npmjs.org/`
