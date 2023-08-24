#! /usr/bin/env zsh

function sourceIf() {
    if [ -f "$1" ]; then
        source $1
    fi
}

externals=()

# Read all externals from list.txt into the array - must have an empty line at the end
while IFS= read -r line; do
    externals+=("$line")
done < <(grep -v '^$' "$HOME/shell-config/zsh/external/list.txt")

# Loop over each element in the array
for externalShell in "${externals[@]}"; do
    echo "Loading external $externalShell"
    sourceIf "$HOME/shell-config/zsh/external/registry/$externalShell"
done