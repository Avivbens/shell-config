import type { IAppSetup } from '@models/app-setup.model'
import { NODE_GLOBAL, NPM_HOME } from '../common-commands'

export const NODE_APPS: Readonly<IAppSetup[]> = [
    {
        name: '@nestjs/cli',
        group: 'node',
        tags: ['node-engineering'],
        openUrl: () => NPM_HOME('@nestjs/cli'),
        commands: () => [NODE_GLOBAL('@nestjs/cli')],
    },
    {
        name: 'nx',
        group: 'node',
        tags: ['web-engineering', 'node-engineering'],
        openUrl: () => NPM_HOME('nx'),
        commands: () => [NODE_GLOBAL('nx')],
    },
    {
        name: 'tsx',
        description: 'The easiest way to run TypeScript in Node.js, including ESM / CJS',
        group: 'node',
        tags: ['node-engineering'],
        openUrl: () => NPM_HOME('tsx'),
        commands: () => [NODE_GLOBAL('tsx')],
    },
    {
        name: 'typescript',
        group: 'node',
        tags: ['web-engineering', 'node-engineering'],
        openUrl: () => NPM_HOME('typescript'),
        commands: () => [NODE_GLOBAL('typescript')],
    },
    {
        name: 'cost-of-modules',
        description: 'Full report of all the modules in node_modules and their sizes',
        group: 'node',
        tags: ['web-engineering', 'node-engineering'],
        openUrl: () => NPM_HOME('cost-of-modules'),
        commands: () => [NODE_GLOBAL('cost-of-modules')],
    },
    {
        name: 'npmrc',
        description: 'Manage multiple .npmrc files effortlessly',
        group: 'node',
        tags: ['web-engineering', 'node-engineering', 'devops'],
        openUrl: () => NPM_HOME('npmrc'),
        commands: () => [NODE_GLOBAL('npmrc')],
    },
    {
        name: 'DPDM',
        description: 'A robust static dependency analyzer for your JavaScript and TypeScript projects',
        group: 'node',
        tags: ['node-engineering', 'web-engineering'],
        openUrl: () => NPM_HOME('dpdm'),
        commands: () => [NODE_GLOBAL('dpdm')],
    },
    {
        name: 'TS Prune',
        description:
            'Find potentially unused exports in your Typescript project with zero configuration (legacy - superseded by Knip)',
        group: 'node',
        tags: ['node-engineering', 'web-engineering'],
        openUrl: () => NPM_HOME('ts-prune'),
        commands: () => [NODE_GLOBAL('ts-prune')],
    },
    {
        name: 'Knip',
        description: 'Find unused files, dependencies and exports in JS/TS projects',
        group: 'node',
        tags: ['node-engineering', 'web-engineering'],
        openUrl: () => NPM_HOME('knip'),
        commands: () => [NODE_GLOBAL('knip')],
    },
    {
        name: 'npkill',
        description: 'List & clear any node_modules directories in your system',
        group: 'node',
        openUrl: () => NPM_HOME('npkill'),
        commands: () => [NODE_GLOBAL('npkill')],
    },
] as const
