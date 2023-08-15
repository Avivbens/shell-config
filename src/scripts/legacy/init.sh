#! /usr/bin/env zsh

CURRENT_DIR_PATH=$(pwd)
NEEDED_DIR_PATH=~/shell-config
echo -e "\e[33mCurrent directory: $CURRENT_DIR_PATH\e[0m"

if [ "$CURRENT_DIR_PATH" != "$NEEDED_DIR_PATH" ]; then
  echo -e "\e[31mPlease move 'scripts' folder to ~/shell-config, and follow the README intro\e[0m"
  exit 1
fi

# save all terminal output to a file
# exec &> ~/Desktop/init.log

mv -f ~/.zshrc ~/.zshrc.backup
# create a symbolic link
ln -f ~/shell-config/zsh/.zshrc ~/.zshrc

exec /bin/zsh
cd "/tmp" || exit


# install git if not installed
if ! command -v git &> /dev/null
then
    echo -e "\e[33mInstall GIT CLI\e[0m"
    brew install git
fi

exec /bin/zsh

# cp -f ~/shell-config/assets/.gitconfig.personal ~/.gitconfig.personal
# ln -f ~/.gitconfig.personal ~/.gitconfig

mkdir -p ~/.npmrcs
grant_permissions "~/.npmrcs"
# cp -f ~/shell-config/assets/.npmrc.personal ~/.npmrcs/personal
# ln -f ~/.npmrcs/personal ~/.npmrc


grant_permissions "/usr/local" || {}
grant_permissions "/Library/Caches/Homebrew" || {}


# install all modules
echo -e "\e[32m--------------- Install all modules ---------------\e[0m"

source ~/shell-config/src/scripts/legacy/modules/apps.sh
source ~/shell-config/src/scripts/legacy/modules/terminal.sh
source ~/shell-config/src/scripts/legacy/modules/cli-apps.sh
source ~/shell-config/src/scripts/legacy/modules/node.sh
source ~/shell-config/src/scripts/legacy/modules/python.sh

exec /bin/zsh


echo -e "\e[33mAdd host file record\e[0m"
sudo chmod +a "user:$USER allow read,write,append,readattr,writeattr,readextattr,writeextattr,readsecurity" /etc/hosts && echo 127.0.0.1 dev.zoominfo.com >> /etc/hosts


echo -e "\e[33mUpdate MacOS\e[0m"
softwareupdate -i -a --agree-to-license

