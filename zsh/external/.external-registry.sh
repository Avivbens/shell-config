#! /usr/bin/env zsh

source "$HOME/shell-config/zsh/.utils.sh"

function get_all_external_files() {
    find "$1" -type f -not -name ".gitkeep" -print0 | xargs -0 -I {} basename {} | tr '\n' ' '
}

files=($(get_all_external_files "$HOME/shell-config/zsh/external/registry"))

for externalShell in "${files[@]}"; do
    echo "Loading external $externalShell"
    sourceIf "$HOME/shell-config/zsh/external/registry/$externalShell"
done