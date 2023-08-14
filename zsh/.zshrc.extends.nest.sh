#! /usr/bin/env zsh

echo "extends.nest.sh loaded"

# create initial files for nest project
function nestserver() {
    if [ -z "$1" ]; then
        echo 'No argument supplied'
    else
        copy_init https://github.com/Avivbens/nestjs-server-template.git $1
        echo -e '\033[31m Change the project name on package.json'
    fi
}

# create initial files for nest telegram bot
function telegrambot() {
    if [ -z "$1" ]; then
        echo 'No argument supplied'
    else
        copy_init https://github.com/Avivbens/telegram-bot-template.git $1
        echo -e '\033[31m Change the project name on package.json'
    fi
}
