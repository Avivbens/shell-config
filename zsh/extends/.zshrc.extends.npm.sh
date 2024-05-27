#! /usr/bin/env zsh

alias ns="npm run start"
alias nsd="npm run start:dev"
alias nb="npm run build"
alias nt="npm run test"
alias nte="npm run test:e2e"

# Get current working directory package name
function package_name () {
    cat package.json | jq '.name' | pbcopy
}

# Clear all node_modules and reinstall
function cnodem() {
    npm ci --only=prod
    npm ci
}
# set node path even with nvm
# sudo ln -s $(which node) /usr/local/bin/node

# create initial files for typescript lib
function tslib() {
    if [ -z "$1" ]; then
        echo 'No argument supplied'
    else
        copy_init https://github.com/Avivbens/lib-template.git $1
        echo -e '\033[31m Change the project name on package.json'
    fi
}
