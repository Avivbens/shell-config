export interface IInstallCommandOptions {
    /**
     * Whether to disable parallel execution of install commands
     * @default false
     */
    noParallel: boolean

    /**
     * Number of parallel install commands to run
     * @default - (number of CPU cores) / 2 + 1
     */
    parallelCount: number
}
