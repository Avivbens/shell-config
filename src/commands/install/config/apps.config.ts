import type { IAppSetup } from '@models/app-setup.model'
import {
    APPS,
    BROWSERS,
    CLI_APPS,
    ENGINEERING_APPS,
    GIT_APPS,
    IDES,
    MACOS,
    MEDIA_APPS,
    NODE_APPS,
    PYTHON,
    SECURITY_PRIVACY,
    TERMINAL_APPS,
} from './apps-groups'

export const APPS_CONFIG: Readonly<IAppSetup[]> = [
    ...GIT_APPS,
    ...BROWSERS,
    ...ENGINEERING_APPS,
    ...IDES,
    ...TERMINAL_APPS,
    ...CLI_APPS,
    ...APPS,
    ...MEDIA_APPS,
    ...SECURITY_PRIVACY,
    ...MACOS,
    ...NODE_APPS,
    ...PYTHON,
] as const

export const APPS_CONFIG_MAP = APPS_CONFIG.reduce(
    (acc, app) => {
        acc[app.name] = app
        return acc
    },
    {} as Record<string, IAppSetup>,
)
