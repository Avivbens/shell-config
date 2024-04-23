import type { IAppSetup } from '@models/app-setup.model'
import {
    APPS,
    BROWSERS,
    CLI_APPS,
    ENGINEERING_APPS,
    IDES,
    MACOS,
    MEDIA_APPS,
    NODE_APPS,
    PYTHON,
    TERMINAL_APPS,
} from './apps-groups'
import { GIT_APPS } from './apps-groups/git'

export const APPS_CONFIG: Readonly<IAppSetup[]> = [
    ...GIT_APPS,
    ...BROWSERS,
    ...ENGINEERING_APPS,
    ...IDES,
    ...TERMINAL_APPS,
    ...CLI_APPS,
    ...APPS,
    ...MEDIA_APPS,
    ...NODE_APPS,
    ...PYTHON,
    ...MACOS,
] as const
