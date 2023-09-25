import boxen from 'boxen'

const MSG = `
Hi there! 👋
There was a problem with the initialization of the shell-config Setup.

Please run the following command to rerun the setup:

source <(shell-config init-script)
`
export const REDO_INIT_COMMAND_MESSAGE = boxen(MSG, {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    title: 'Rerun is required',
    titleAlignment: 'center',
    textAlignment: 'center',
    float: 'center',
    backgroundColor: '#C24E00',
    borderColor: 'yellow',
    dimBorder: true,
})
