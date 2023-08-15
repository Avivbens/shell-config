#! /usr/bin/env zsh

echo -e "\e[32m--------------- Install Terminal ---------------\e[0m"


echo -e "\e[33mInstall terminal tools\e[0m"

git clone https://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-completions.git ~/.zsh/zsh-completions
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.zsh/zsh-syntax-highlighting


echo -e "\e[33mInstall Fig\e[0m"
brew install --cask fig


exec /bin/zsh