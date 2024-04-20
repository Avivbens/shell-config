#! /usr/bin/env zsh

function sredis() {
    osascript -e 'tell app "Terminal" to do script "cd /tmp && redis-server"'
}
