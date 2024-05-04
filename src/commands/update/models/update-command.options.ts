export interface IUpdateCommandOptions {
    /**
     * The target version to update to
     * @default 'latest'
     */
    target: `v.${number}.${number}.${number}` | 'latest'

    /**
     * Whether to mute the update or not
     * @default false
     */
    mute: boolean
}
