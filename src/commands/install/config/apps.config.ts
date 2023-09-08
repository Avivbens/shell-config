import { IAppSetup } from '@models/app-setup.model'
import { APPS, CLI_APPS, MACOS, NODE_APPS, PYTHON, TERMINAL_APPS } from './apps-groups'
import { GIT_APPS } from './apps-groups/git'

export const APPS_CONFIG: Readonly<IAppSetup[]> = [
    ...GIT_APPS,
    ...APPS,
    ...TERMINAL_APPS,
    ...CLI_APPS,
    ...NODE_APPS,
    ...PYTHON,
    ...MACOS,
] as const

export const AVAILABLE_TAGS = [
    'engineering',
    'devops',
    'ui-ux',
    'productivity',
    'work',
    'personal',
] as const
