export const AVAILABLE_TAGS = ['engineering', 'devops', 'ui-ux', 'productivity', 'work', 'personal'] as const

export type ITag = (typeof AVAILABLE_TAGS)[number]
