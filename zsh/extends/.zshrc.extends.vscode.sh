#! /usr/bin/env zsh

# Add VS Code to PATH
export PATH="/Applications/Visual Studio Code.app/Contents/Resources/app/bin:$PATH"

# open vscode in current directory
alias v="code ."

# open vscode for all directories in current directory
alias vall="ls -d */ | xargs -I {} sh -c 'code ./{}'"