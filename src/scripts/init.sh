#! /usr/bin/env zsh

function grant_permissions(){
  sudo chown -R "$USER":admin "$1"
  chmod -R 700 "$1"
}

# install git if not installed
if ! command -v git &> /dev/null
then
    echo -e "\e[33mInstall GIT CLI\e[0m"
    brew install git
fi

mkdir -p ~/.npmrcs
grant_permissions "~/.npmrcs"

grant_permissions "/usr/local" || {}
grant_permissions "/Library/Caches/Homebrew" || {}

mkdir ~/.nvm
grant_permissions "~/.nvm"

# save all terminal output to a file
# exec &> ~/Desktop/init.log

# TODO - download bundled build
npm i --no-package-lock
