import type { IAppSetup } from '@models/app-setup.model'
import { BREW_CASK, BREW_INSTALL, BREW_TAP, BROW_ALIAS, BROW_INSTALL, BROW_TAP } from '../common-commands'

export const TERMINAL_APPS: Readonly<IAppSetup[]> = [
    {
        name: 'Wrap',
        description: 'Terminal with a power of code editor',
        group: 'terminal',
        tags: ['super-user'],
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
        tags: ['productivity'],
        commands: () => [BREW_CASK('fig')],
    },
    {
        name: 'Mcfly',
        description: 'Search & execute through your shell history, with context-aware suggestions and neural network.',
        group: 'terminal',
        tags: ['productivity'],
        commands: () => [BREW_TAP('cantino/mcfly'), BREW_INSTALL('cantino/mcfly/mcfly')],
        fallbackCommands: () => [BROW_TAP('cantino/mcfly'), BROW_INSTALL('cantino/mcfly/mcfly')],
    },
    {
        name: 'Bat',
        description: 'Syntax highlighting for cat',
        group: 'terminal',
        tags: ['productivity'],
        commands: () => [BREW_INSTALL('bat')],
    },
    {
        name: 'Zoxide',
        description: 'A faster way to navigate your filesystem - replace your native `cd` with memory-based autojump',
        group: 'terminal',
        tags: ['productivity'],
        commands: () => [BREW_INSTALL('zoxide')],
    },
    {
        name: 'ZSH Terminal Syntax Highlighting',
        group: 'terminal',
        tags: ['engineering'],
        commands: () => [BREW_INSTALL('zsh-syntax-highlighting')],
        fallbackCommands: () => [BROW_INSTALL('zsh-syntax-highlighting')],
    },
    {
        name: 'ZSH Terminal Syntax Autosuggestions',
        group: 'terminal',
        tags: ['engineering'],
        commands: () => [BREW_INSTALL('zsh-autosuggestions')],
        fallbackCommands: () => [BROW_INSTALL('zsh-autosuggestions')],
    },
    {
        name: 'ZSH Terminal Syntax Completions',
        description: 'Completions for zsh (password needed)',
        group: 'terminal',
        commands: () => [
            BREW_INSTALL('zsh-completions'),
            `chmod go-w "$(brew --prefix)/share"`,
            `chmod -R go-w "$(brew --prefix)/share/zsh"`,
        ],
        fallbackCommands: () => [
            BROW_INSTALL('zsh-completions'),
            `chmod go-w "$(brew --prefix)/share"`,
            `chmod -R go-w "$(brew --prefix)/share/zsh"`,
            `chmod go-w "$(${BROW_ALIAS} --prefix)/share"`,
            `chmod -R go-w "$(${BROW_ALIAS} --prefix)/share/zsh"`,
        ],
    },
] as const
