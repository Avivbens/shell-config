import { Arch, IAppSetup } from '@models/app-setup.model'
import { BREW_CASK, BREW_INSTALL, BREW_TAP, NVM_COMMAND } from '../common-commands'

export const TERMINAL_APPS: Readonly<IAppSetup[]> = [
    {
        name: 'NVM',
        description: 'Node Version Manager',
        group: 'terminal',
        tags: ['engineering', 'devops'],
        commands: (arch: Arch) => [
            BREW_INSTALL('nvm', arch),
            '\\. "$(brew --prefix)/opt/nvm/nvm.sh"',
            `chmod +x $HOME/.nvm/nvm.sh`,
            NVM_COMMAND('install 16.14.0'),
            NVM_COMMAND('alias default 16.14.0'),
        ],
    },
    {
        name: 'Fig',
        group: 'terminal',
        tags: ['engineering', 'devops', 'productivity'],
        commands: (arch: Arch) => [BREW_CASK('fig')],
    },
    {
        name: 'Mcfly',
        description:
            'Search & execute through your shell history, with context-aware suggestions and neural network.',
        group: 'terminal',
        tags: ['engineering', 'devops', 'productivity'],
        commands: (arch: Arch) => [BREW_TAP('cantino/mcfly'), BREW_INSTALL('cantino/mcfly/mcfly')],
    },
    {
        name: 'ZSH Terminal Syntax Highlighting and Autosuggestions',
        group: 'terminal',
        tags: ['engineering', 'devops'],
        commands: (arch: Arch) => [
            'rm -rf "$HOME/.zsh/zsh-autosuggestions" && git clone https://github.com/zsh-users/zsh-autosuggestions "$HOME/.zsh/zsh-autosuggestions"',
            'rm -rf "$HOME/.zsh/zsh-completions" && git clone https://github.com/zsh-users/zsh-completions.git "$HOME/.zsh/zsh-completions"',
            'rm -rf "$HOME/.zsh/zsh-syntax-highlighting" && git clone https://github.com/zsh-users/zsh-syntax-highlighting.git "$HOME/.zsh/zsh-syntax-highlighting"',
        ],
    },
] as const
