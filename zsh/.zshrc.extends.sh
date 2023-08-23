#! /usr/bin/env zsh

echo "extends loaded"

function sourceIf() {
    if [ -f "$1" ]; then
        source $1
    fi
}

function get_all_enabled_files() {
    find "$1" -type f -not -name "*.disabled" -print0 | xargs -0 -I {} basename {} | tr '\n' ' '
}

files=($(get_all_enabled_files "$HOME/shell-config/zsh/extends"))

for file in "${files[@]}"; do
    sourceIf "$rHOME/shell-config/zsh/extends/$file"
done
