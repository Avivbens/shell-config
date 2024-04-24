export const GROUPS = [
    'apps',
    'media',
    'security-privacy',
    'cli-apps',
    'terminal',
    'python',
    'node',
    'MacOS',
    'git',
    'IDEs',
    'browsers',
    'engineering-apps',
] as const

export type IGroup = (typeof GROUPS)[number]
