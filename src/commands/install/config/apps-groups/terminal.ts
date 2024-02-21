import type { IAppSetup } from '@models/app-setup.model'
import {
    BREW_CASK,
    BREW_INSTALL,
    BREW_TAP,
    BROW_ALIAS,
    BROW_INSTALL,
    BROW_TAP,
    NVM_COMMAND,
} from '../common-commands'

const DEFAULT_NODE_VERSION = '18.19.1'

export const TERMINAL_APPS: Readonly<IAppSetup[]> = [
    {
        name: 'NVM',
        description: 'Node Version Manager',
        group: 'terminal',
        tags: ['engineering', 'devops'],
        commands: () => [
            BREW_INSTALL('nvm'),
            '\\. "$(brew --prefix)/opt/nvm/nvm.sh"',
            `chmod +x $HOME/.nvm/nvm.sh`,
            NVM_COMMAND(`install ${DEFAULT_NODE_VERSION}`),
            NVM_COMMAND(`alias default ${DEFAULT_NODE_VERSION}`),
        ],
        fallbackCommands: () => [
            BROW_INSTALL('nvm'),
            `\\. "$(${BROW_ALIAS} --prefix)/opt/nvm/nvm.sh"`,
            `chmod +x $HOME/.nvm/nvm.sh`,
            NVM_COMMAND(`install ${DEFAULT_NODE_VERSION}`),
            NVM_COMMAND(`alias default ${DEFAULT_NODE_VERSION}`),
        ],
    },
    {
        name: 'Fig',
        group: 'terminal',
        tags: ['engineering', 'devops', 'productivity'],
        commands: () => [BREW_CASK('fig')],
    },
    {
        name: 'Mcfly',
        description:
            'Search & execute through your shell history, with context-aware suggestions and neural network.',
        group: 'terminal',
        tags: ['engineering', 'devops', 'productivity'],
        commands: () => [BREW_TAP('cantino/mcfly'), BREW_INSTALL('cantino/mcfly/mcfly')],
        fallbackCommands: () => [BROW_TAP('cantino/mcfly'), BROW_INSTALL('cantino/mcfly/mcfly')],
    },
    {
        name: 'ZSH Terminal Syntax Highlighting and Autosuggestions',
        group: 'terminal',
        tags: ['engineering', 'devops'],
        commands: () => [
            'rm -rf "$HOME/.zsh/zsh-autosuggestions" && git clone https://github.com/zsh-users/zsh-autosuggestions "$HOME/.zsh/zsh-autosuggestions"',
            'rm -rf "$HOME/.zsh/zsh-completions" && git clone https://github.com/zsh-users/zsh-completions.git "$HOME/.zsh/zsh-completions"',
            'rm -rf "$HOME/.zsh/zsh-syntax-highlighting" && git clone https://github.com/zsh-users/zsh-syntax-highlighting.git "$HOME/.zsh/zsh-syntax-highlighting"',
        ],
    },
] as const
