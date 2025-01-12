import type { IAppSetup } from '@models/app-setup.model'
import { BREW_CASK, BREW_HOME, BREW_INSTALL, BROW_ALIAS, BROW_INSTALL } from '../common-commands'

export const TERMINAL_APPS: Readonly<IAppSetup[]> = [
    {
        name: 'Wrap',
        description: 'Terminal with a power of code editor',
        group: 'terminal',
        tags: ['super-user'],
        openUrl: () => BREW_HOME('warp', true),
        commands: () => [BREW_CASK('warp')],
    },
    {
        name: 'iTerm2',
        description: 'Terminal replacement',
        group: 'terminal',
        tags: ['productivity'],
        openUrl: () => BREW_HOME('iterm2', true),
        commands: () => [BREW_CASK('iterm2')],
    },
    {
        name: 'Mcfly',
        description: 'Search & execute through your shell history, with context-aware suggestions and neural network.',
        group: 'terminal',
        tags: ['productivity'],
        openUrl: () => BREW_HOME('mcfly'),
        commands: () => [BREW_INSTALL('mcfly')],
        fallbackCommands: () => [BROW_INSTALL('mcfly')],
    },
    {
        name: 'Fd',
        description: 'A simple, fast and user-friendly alternative to find',
        group: 'terminal',
        tags: ['productivity'],
        openUrl: () => BREW_HOME('fd'),
        commands: () => [BREW_INSTALL('fd')],
        fallbackCommands: () => [BROW_INSTALL('fd')],
    },
    {
        name: 'TL;DR',
        description: 'Simplified and community-driven man pages',
        group: 'terminal',
        tags: ['productivity'],
        openUrl: () => BREW_HOME('tldr'),
        commands: () => [BREW_INSTALL('tldr')],
        fallbackCommands: () => [BROW_INSTALL('tldr')],
    },
    {
        name: 'Bat',
        description: 'Syntax highlighting for cat',
        group: 'terminal',
        tags: ['productivity'],
        openUrl: () => BREW_HOME('bat'),
        commands: () => [BREW_INSTALL('bat')],
        fallbackCommands: () => [BROW_INSTALL('bat')],
    },
    {
        name: 'Zoxide',
        description: 'A faster way to navigate your filesystem - replace your native `cd` with memory-based autojump',
        group: 'terminal',
        tags: ['productivity'],
        openUrl: () => BREW_HOME('zoxide'),
        commands: () => [BREW_INSTALL('zoxide')],
        fallbackCommands: () => [BROW_INSTALL('zoxide')],
    },
    {
        name: 'Eza',
        description: 'Modern, maintained replacement for ls',
        group: 'terminal',
        tags: ['productivity'],
        openUrl: () => BREW_HOME('eza'),
        commands: () => [BREW_INSTALL('eza')],
        fallbackCommands: () => [BROW_INSTALL('eza')],
    },
    {
        name: 'ZSH Terminal Syntax Highlighting',
        group: 'terminal',
        tags: ['engineering'],
        openUrl: () => BREW_HOME('zsh-syntax-highlighting'),
        commands: () => [BREW_INSTALL('zsh-syntax-highlighting')],
        fallbackCommands: () => [BROW_INSTALL('zsh-syntax-highlighting')],
    },
    {
        name: 'ZSH Terminal Syntax Autosuggestions',
        group: 'terminal',
        tags: ['engineering'],
        openUrl: () => BREW_HOME('zsh-autosuggestions'),
        commands: () => [BREW_INSTALL('zsh-autosuggestions')],
        fallbackCommands: () => [BROW_INSTALL('zsh-autosuggestions')],
    },
    {
        name: 'ZSH Terminal Syntax Completions',
        description: 'Completions for zsh (password needed)',
        group: 'terminal',
        openUrl: () => BREW_HOME('zsh-completions'),
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
