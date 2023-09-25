export const INIT_DYNAMIC_SCRIPT = `
osascript -e 'tell app "Terminal" to do script "shell-doctor && shell-config init && shell-doctor"'
`

export const OPEN_TERMINAL = `
osascript -e 'tell app "Terminal" to do script "cd"'
`
