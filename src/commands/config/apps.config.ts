import { IAppSetup } from 'src/models/app-setup.model';
import {
    APPS,
    CLI_APPS,
    MACOS,
    NODE_APPS,
    PYTHON,
    TERMINAL_APPS,
    ZI
} from './groups';

export const APPS_CONFIG: Readonly<IAppSetup[]> = [
    ...ZI,
    ...APPS,
    ...TERMINAL_APPS,
    ...CLI_APPS,
    ...NODE_APPS,
    ...PYTHON,
    ...MACOS,
] as const;
