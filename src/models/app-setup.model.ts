import type { arch } from 'node:process'
import type { IGroup } from './group.model'
import type { ITag } from './tag.model'

export type Arch = typeof arch

export interface IAppSetup {
    name: string
    group: IGroup
    commands: (arch: Arch) => readonly string[]
    fallbackCommands?: (arch: Arch) => readonly string[]
    description?: string

    /**
     * @default false
     * @description If true, the app will be selected by default.
     */
    default?: boolean

    /**
     * @description Tags are used to group apps together.
     * For example, by selecting the tag "engineering", all apps with the tag "engineering" will be selected by default.
     */
    tags?: readonly ITag[]

    /**
     * @description Dependencies are used to install apps in a specific order.
     * Should be the name of the app.
     */
    deps?: readonly string[]

    /**
     * @description If true, the app require a paid subscription / license.
     * @default false
     */
    paid?: boolean

    /**
     * @default false
     * @description If true, the app will be installed last. Cannot be a dependency!
     */
    last?: boolean
}
