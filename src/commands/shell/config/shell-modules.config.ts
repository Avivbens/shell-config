import { resolve } from 'node:path'
import { BASE_PATH } from '@common/constants'
import type { IShellModule } from '@models/shell-module.model'

export const EXTENDS_MODULES_DIR_PATH = 'zsh/extends'
export const LOCAL_MODULES_DIR_PATH = resolve(BASE_PATH, EXTENDS_MODULES_DIR_PATH)

export const SHELL_MODULES_OPTIONS: IShellModule[] = [
    {
        name: 'Git',
        path: `${EXTENDS_MODULES_DIR_PATH}/.zshrc.extends.git.sh`,
        description: 'Git aliases and functions',
    },
    {
        name: 'VSCode',
        path: `${EXTENDS_MODULES_DIR_PATH}/.zshrc.extends.vscode.sh`,
        description: 'VSCode aliases and functions',
    },
    {
        name: 'Theme',
        path: `${EXTENDS_MODULES_DIR_PATH}/.zshrc.extends.theme.sh`,
        description: 'Theme for the terminal, showing the current branch and more',
    },
    {
        name: 'GitHub CLI',
        path: `${EXTENDS_MODULES_DIR_PATH}/.zshrc.extends.github.sh`,
        description: 'GitHub CLI aliases and functions',
    },
    {
        name: 'NPM',
        path: `${EXTENDS_MODULES_DIR_PATH}/.zshrc.extends.npm.sh`,
        description: 'NPM aliases and functions',
    },
    {
        name: 'Network',
        path: `${EXTENDS_MODULES_DIR_PATH}/.zshrc.extends.network.sh`,
        description: 'Network helpers',
    },
    {
        name: 'Nest',
        path: `${EXTENDS_MODULES_DIR_PATH}/.zshrc.extends.nest.sh`,
        description: 'NestJS aliases',
    },
    {
        name: 'Angular',
        path: `${EXTENDS_MODULES_DIR_PATH}/.zshrc.extends.angular.sh`,
        description: 'Angular aliases',
    },
    {
        name: 'MongoDB',
        path: `${EXTENDS_MODULES_DIR_PATH}/.zshrc.extends.mongo.sh`,
        description: 'MongoDB aliases',
    },
    {
        name: 'Redis',
        path: `${EXTENDS_MODULES_DIR_PATH}/.zshrc.extends.redis.sh`,
        description: 'Redis aliases',
    },
    {
        name: 'Python',
        path: `${EXTENDS_MODULES_DIR_PATH}/.zshrc.extends.python.sh`,
        description: 'Python aliases',
    },
    {
        name: 'Kubectl',
        path: `${EXTENDS_MODULES_DIR_PATH}/.zshrc.extends.kubectl.sh`,
        description: 'Kubectl aliases',
    },
]

export const MODULES_MAP: Record<string, IShellModule> = SHELL_MODULES_OPTIONS.reduce((acc, module) => {
    const { path } = module
    acc[path] = module

    return acc
}, {})
