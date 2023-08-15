#! /usr/bin/env zsh

echo -e "\e[32m--------------- Install CLI Apps ---------------\e[0m"


echo -e "\e[33mInstall MongoDB\e[0m"
brew tap mongodb/brew
brew install mongodb-community@6.0
mkdir -p ~/mongodb


echo -e "\e[33mInstall Redis\e[0m"
brew install redis


echo -e "\e[33mInstall GCP SDK\e[0m"
brew install --cask google-cloud-sdk


exec /bin/zsh