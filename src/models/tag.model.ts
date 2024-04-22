export const AVAILABLE_TAGS = [
    'web-engineering',
    'node-engineering',
    'python-engineering',
    'engineering',
    'devops',
    'ui-ux',
    'productivity',
    'super-user',
    'work',
    'personal',
] as const

export type ITag = (typeof AVAILABLE_TAGS)[number]

/**
 * Holds all deps for a specific tag
 *
 * @example <TAG>: [<TAG_DEPS>]
 */
export const TAGS_DEPS: Partial<Record<ITag, ITag[]>> = {
    'python-engineering': ['engineering'],
    'node-engineering': ['engineering'],
    'web-engineering': ['engineering'],
    'super-user': ['productivity'],
}
