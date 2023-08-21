#! /usr/bin/env zsh

echo "extends.mongo.sh loaded"

function smongo(){
    mkdir ~/mongodb
    mongod --fork --logpath ~/mongodb/db-output.log --dbpath ~/mongodb
}