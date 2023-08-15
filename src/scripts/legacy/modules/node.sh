#! /usr/bin/env zsh

echo -e "\e[32m--------------- Install Node ---------------\e[0m"


# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
exec /bin/zsh

echo -e "\e[33mInstall NVM\e[0m"
mkdir ~/.nvm
grant_permissions "~/.nvm"

mkdir ~/.npmrc
grant_permissions "~/.npmrc"

brew install nvm
exec /bin/zsh


# echo -e "\e[33mAdd NVM to environment\e[0m"
# echo "export NVM_DIR=\"$HOME/.nvm\"" >> ~/.zshrc
# export NVM_DIR="$HOME/.nvm"

# echo -e "\e[33mLoading NVM\e[0m"
# . "$NVM_DIR/nvm.sh"


echo -e "\e[33mInstall NodeJS\e[0m"
nvm install 16.14.0
nvm alias default 16.14.0

exec /bin/zsh


echo -e "\e[33mInstall ALL global NPM packages\e[0m"
source ~/shell-config/src/scripts/legacy/install-npm-packages.sh
exec /bin/zsh