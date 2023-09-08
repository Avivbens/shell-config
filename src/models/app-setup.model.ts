import { IGroup } from './group.model'
import { ITag } from './tag.model'

export interface IAppSetup {
    name: string
    group: IGroup
    commands: readonly string[]
    commandsFallback?: readonly string[]
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
    deps?: readonly string[]

    /**
     * @default false
     * @description If true, the app will be installed last. Cannot be a dependency!
     */
    last?: boolean
}
