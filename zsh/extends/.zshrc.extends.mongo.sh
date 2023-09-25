#! /usr/bin/env zsh

echo "extends.mongo.sh loaded"

function smongo(){
    mkdir "$HOME/mongodb"
    mongod --fork --logpath "$HOME/mongodb/db-output.log" --dbpath "$HOME/mongodb"
}