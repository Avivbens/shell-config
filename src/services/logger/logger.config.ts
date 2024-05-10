export const COLORS_CONFIG = {
    black: `\x1b[30m`,
    red: `\x1b[31m`,
    green: `\x1b[32m`,
    yellow: `\x1b[33m`,
    blue: `\x1b[34m`,
    magenta: `\x1b[35m`,
    cyan: `\x1b[36m`,
    white: `\x1b[37m`,
    'black-background': `\x1b[40m`,
    'red-background': `\x1b[41m`,
    'green-background': `\x1b[42m`,
    'yellow-background': `\x1b[43m`,
    'blue-background': `\x1b[44m`,
    'magenta-background': `\x1b[45m`,
    'cyan-background': `\x1b[46m`,
    'white-background': `\x1b[47m`,
} as const

export type Color = keyof typeof COLORS_CONFIG
