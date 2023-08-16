import { IShellModule } from '../../../models/shell-module.model'

export const SHELL_MODULES_OPTIONS: IShellModule[] = [
    {
        name: 'Git',
        path: 'zsh/extends/.zshrc.extends.git.sh',
        default: true,
        description: 'Git aliases and functions',
    },
    {
        name: 'Work',
        path: 'zsh/extends/.zshrc.extends.work.sh',
        description: 'ZI aliases and functions',
    },
    {
        name: 'NPM',
        path: 'zsh/extends/.zshrc.extends.npm.sh',
        default: true,
        description: 'NPM aliases and functions',
    },
    {
        name: 'Nest',
        path: 'zsh/extends/.zshrc.extends.nest.sh',
        description: 'NestJS aliases',
    },
    {
        name: 'Private',
        path: 'zsh/extends/.zshrc.extends.private.sh',
        default: true,
        description: 'Your own aliases, put your scripts here',
    },
    {
        name: 'Angular',
        path: 'zsh/extends/.zshrc.extends.angular.sh',
        description: 'Angular aliases',
    },
]

export const MODULES_MAP: Record<string, IShellModule> = SHELL_MODULES_OPTIONS.reduce(
    (acc, module) => {
        const { path } = module
        acc[path] = module

        return acc
    },
    {},
)
