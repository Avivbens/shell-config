import type { IAppSetup } from '@models/app-setup.model'
import { BREW_CASK, BREW_INSTALL, BREW_TAP, BROW_ALIAS, BROW_INSTALL, BROW_TAP } from '../common-commands'

export const TERMINAL_APPS: Readonly<IAppSetup[]> = [
    {
        name: 'Wrap',
        description: 'Terminal with a power of code editor',
        group: 'terminal',
        commands: () => [BREW_CASK('warp')],
    },
    {
        name: 'iTerm2',
        description: 'Terminal replacement',
        group: 'terminal',
        commands: () => [BREW_CASK('iterm2')],
    },
    {
        name: 'Fig',
        group: 'terminal',
        tags: ['engineering', 'devops', 'productivity'],
        commands: () => [BREW_CASK('fig')],
    },
    {
        name: 'Mcfly',
        description: 'Search & execute through your shell history, with context-aware suggestions and neural network.',
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
            BREW_INSTALL('zsh-autosuggestions'),
            BREW_INSTALL('zsh-syntax-highlighting'),
            BREW_INSTALL('zsh-completions'),
            `chmod go-w "$(brew --prefix)/share"`,
            `chmod -R go-w "$(brew --prefix)/share/zsh"`,
        ],
        fallbackCommands: () => [
            BROW_INSTALL('zsh-autosuggestions'),
            BROW_INSTALL('zsh-syntax-highlighting'),
            BROW_INSTALL('zsh-completions'),
            `chmod go-w "$(brew --prefix)/share"`,
            `chmod -R go-w "$(brew --prefix)/share/zsh"`,
            `chmod go-w "$(${BROW_ALIAS} --prefix)/share"`,
            `chmod -R go-w "$(${BROW_ALIAS} --prefix)/share/zsh"`,
        ],
    },
] as const
