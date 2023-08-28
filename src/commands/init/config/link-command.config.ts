export const LINK_SHELL_COMMAND = `
if [ -f "$HOME/shell-config/zsh/.entry-point.sh" ]; then
  source "$HOME/shell-config/zsh/.entry-point.sh"
fi
`

export const LINK_SHELL_COMMAND_EXISTS = (zshrcNow: string): boolean => {
    const lookFor = `source "$HOME/shell-config/zsh/.entry-point.sh"`
    const exists = zshrcNow.includes(lookFor)
    return exists
}
