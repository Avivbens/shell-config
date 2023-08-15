import { IAppSetup } from '../../../../models/app-setup.model'
import { BREW_CASK } from '../utils'

export const TERMINAL_APPS: Readonly<IAppSetup[]> = [
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
