import { IAppSetup } from '@models/app-setup.model'
import { BREW_CASK, BREW_INSTALL, BREW_INSTALL_64_ARM, NVM_COMMAND } from '../common-commands'

export const TERMINAL_APPS: Readonly<IAppSetup[]> = [
    {
        name: 'NVM',
        description: 'Node Version Manager',
        group: 'terminal',
        default: true,
        commands: [
            BREW_INSTALL('nvm'),
            'sleep 5',
            `eval "$(/opt/homebrew/bin/brew shellenv)"`,
            `chmod +x $HOME/.nvm/nvm.sh`,
            NVM_COMMAND('install 16.14.0'),
            NVM_COMMAND('alias default 16.14.0'),
        ],
        commandsFallback: [
            BREW_INSTALL_64_ARM('nvm'),
            'sleep 5',
            `eval "$(/opt/homebrew/bin/brew shellenv)"`,
            `chmod +x $HOME/.nvm/nvm.sh`,
            NVM_COMMAND('install 16.14.0'),
            NVM_COMMAND('alias default 16.14.0'),
        ],
    },
    {
        name: 'Fig',
        group: 'terminal',
        default: true,
        commands: [BREW_CASK('fig')],
    },
    {
        name: 'ZSH Terminal Syntax Highlighting and Autosuggestions',
        group: 'terminal',
        default: true,
        commands: [
            'rm -rf ~/.zsh/zsh-autosuggestions && git clone https://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions',
            'rm -rf ~/.zsh/zsh-completions && git clone https://github.com/zsh-users/zsh-completions.git ~/.zsh/zsh-completions',
            'rm -rf ~/.zsh/zsh-syntax-highlighting && git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.zsh/zsh-syntax-highlighting',
        ],
    },
] as const
