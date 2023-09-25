import type { IAppSetup } from '@models/app-setup.model'
import { NODE_GLOBAL } from '../common-commands'

export const NODE_APPS: Readonly<IAppSetup[]> = [
    {
        name: '@angular/cli',
        group: 'node',
        tags: ['engineering'],
        commands: () => [NODE_GLOBAL('@angular/cli')],
    },
    {
        name: '@nestjs/cli',
        group: 'node',
        tags: ['engineering'],
        commands: () => [NODE_GLOBAL('@nestjs/cli')],
    },
    {
        name: 'nx',
        group: 'node',
        tags: ['engineering'],
        commands: () => [NODE_GLOBAL('nx')],
    },
    {
        name: 'ts-jest',
        group: 'node',
        tags: ['engineering'],
        commands: () => [NODE_GLOBAL('ts-jest')],
    },
    {
        name: 'ts-node-dev',
        group: 'node',
        tags: ['engineering'],
        commands: () => [NODE_GLOBAL('ts-node-dev')],
    },
    {
        name: 'ts-node',
        group: 'node',
        tags: ['engineering'],
        commands: () => [NODE_GLOBAL('ts-node')],
    },
    {
        name: 'typescript',
        group: 'node',
        tags: ['engineering'],
        commands: () => [NODE_GLOBAL('typescript')],
    },
    {
        name: '@githubnext/github-copilot-cli',
        group: 'node',
        tags: ['engineering', 'devops'],
        commands: () => [NODE_GLOBAL('@githubnext/github-copilot-cli')],
    },
    {
        name: 'nodemon',
        group: 'node',
        tags: ['engineering'],
        commands: () => [NODE_GLOBAL('nodemon')],
    },
    {
        name: 'npmrc',
        group: 'node',
        tags: ['engineering', 'devops'],
        commands: () => [NODE_GLOBAL('npmrc')],
    },
    {
        name: 'verdaccio',
        group: 'node',
        tags: ['engineering'],
        commands: () => [NODE_GLOBAL('verdaccio')],
    },
    {
        name: 'ttab',
        group: 'node',
        commands: () => [NODE_GLOBAL('ttab')],
    },
    {
        name: 'alfred-open-whatsapp',
        group: 'node',
        commands: () => [NODE_GLOBAL('alfred-open-whatsapp')],
    },
    {
        name: 'alfred-search-bookmark',
        group: 'node',
        commands: () => [NODE_GLOBAL('alfred-search-bookmark')],
    },
    {
        name: 'corepack',
        group: 'node',
        commands: () => [NODE_GLOBAL('corepack')],
    },
    {
        name: 'gulp-cli',
        group: 'node',
        commands: () => [NODE_GLOBAL('gulp-cli')],
    },
    {
        name: 'heroku',
        group: 'node',
        commands: () => [NODE_GLOBAL('heroku')],
    },
    {
        name: 'http-server',
        group: 'node',
        commands: () => [NODE_GLOBAL('http-server')],
    },
    {
        name: 'jest',
        group: 'node',
        commands: () => [NODE_GLOBAL('jest')],
    },
    {
        name: 'npkill',
        group: 'node',
        commands: () => [NODE_GLOBAL('npkill')],
    },
    {
        name: 'prettier',
        group: 'node',
        commands: () => [NODE_GLOBAL('prettier')],
    },
    {
        name: 'pretty-quick',
        group: 'node',
        commands: () => [NODE_GLOBAL('pretty-quick')],
    },
    {
        name: 'vercel',
        group: 'node',
        commands: () => [NODE_GLOBAL('vercel')],
    },
] as const
