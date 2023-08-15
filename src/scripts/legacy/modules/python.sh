#! /usr/bin/env zsh

echo -e "\e[32m--------------- Install Python ---------------\e[0m"


echo -e "\e[33mInstall Python\e[0m"
brew install python


echo -e "\e[33mInstall pip\e[0m"
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python3 get-pip.py
rm get-pip.py


exec /bin/zsh