import boxen from 'boxen'

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

const EXPLAIN_FEATURE = `
Enter sudo password in order to proceed with parallel installation
`

export const HELP_BOX_MESSAGE = boxen(EXPLAIN_FEATURE, {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    title: 'Parallel Installation',
    titleAlignment: 'center',
    textAlignment: 'left',
    float: 'center',
    backgroundColor: '#d38320',
    borderColor: 'yellow',
    dimBorder: true,
})
