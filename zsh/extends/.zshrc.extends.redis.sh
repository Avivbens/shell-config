#! /usr/bin/env zsh

echo "extends.redis.sh loaded"

function sredis(){
    osascript -e 'tell app "Terminal" to do script "cd /tmp && redis-server"'
}
