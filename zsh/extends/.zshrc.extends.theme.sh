#! /usr/bin/env zsh

echo "extends.theme.sh loaded"

# Load version control information
autoload -Uz vcs_info
precmd() { vcs_info }

# Format the vcs_info_msg_0_ variable
zstyle ':vcs_info:git:*' formats '(%b)'

# Set up the prompt (with git branch name)
setopt PROMPT_SUBST
PROMPT='%F{yellow}%(4~|.../%3~|%~) %F{red}: ${vcs_info_msg_0_} %F{reset_color}$ '
