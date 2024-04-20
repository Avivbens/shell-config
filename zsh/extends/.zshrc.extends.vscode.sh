#! /usr/bin/env zsh

export VSCODE="/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code"

# open vscode
alias code="$VSCODE"

# open vscode in current directory
alias v="code ."

# open vscode for all directories in current directory
alias vall="ls -d */ | xargs -I {} sh -c '$VSCODE ./{}'"
