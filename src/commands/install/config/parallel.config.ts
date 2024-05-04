export const TASKS_CONFIG = (parallelProcessAmount: number) => ({
    concurrent: parallelProcessAmount,
    exitOnError: false,
    renderer: 'default',
    rendererOptions: {
        showTimer: true,
        collapse: false,
        showSubtasks: true,
        clearOutput: false,
    },
})
