#! /usr/bin/env zsh

echo "extends loaded"

source "$HOME/shell-config/zsh/.utils.sh"

function get_all_enabled_files() {
    find "$1" -type f -not -name "*.disabled" -print0 | xargs -0 -I {} basename {} | tr '\n' ' '
}

files=($(get_all_enabled_files "$HOME/shell-config/zsh/extends"))

for file in "${files[@]}"; do
    sourceIf "$HOME/shell-config/zsh/extends/$file"
done

# loads external registry
sourceIf "$HOME/shell-config/zsh/external/.external-registry.sh"
