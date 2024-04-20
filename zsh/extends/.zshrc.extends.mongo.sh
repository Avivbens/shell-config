#! /usr/bin/env zsh

function smongo() {
    mkdir "$HOME/mongodb"
    mongod --fork --logpath "$HOME/mongodb/db-output.log" --dbpath "$HOME/mongodb"
}
