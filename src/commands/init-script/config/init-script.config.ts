import { TELL_TERMINAL_EXECUTE_SCRIPT } from '@common/utils'

/** The tab `update` opens still has the previous version's shell-doctor: `;` keeps it from blocking init, and `exec /bin/zsh` loads the new entry point instead of running it again */
export const INIT_DYNAMIC_SCRIPT = `
${TELL_TERMINAL_EXECUTE_SCRIPT('shell-doctor; shell-config init && exec /bin/zsh')}
`

export const OPEN_TERMINAL = `
${TELL_TERMINAL_EXECUTE_SCRIPT('cd')}
`
