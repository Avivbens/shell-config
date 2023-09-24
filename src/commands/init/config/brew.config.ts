export const BREW_DIRECTORY = `/opt/homebrew/bin/brew`
export const BROW_DIRECTORY = `/usr/local/Homebrew/bin/brew`

export const BREW_INSTALLATION_COMMAND = `
yes | /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
`
export const BROW_INSTALLATION_COMMAND = `
yes | arch --x86_64 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)""
`
