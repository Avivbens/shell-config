import { TELL_TERMINAL_EXECUTE_SCRIPT } from '@common/utils'

export const INIT_DYNAMIC_SCRIPT = `
${TELL_TERMINAL_EXECUTE_SCRIPT('shell-doctor && shell-config init && shell-doctor')}
`

export const OPEN_TERMINAL = `
${TELL_TERMINAL_EXECUTE_SCRIPT('cd')}
`
