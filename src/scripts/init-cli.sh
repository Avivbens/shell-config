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

# install git if not installed
if ! command -v git &> /dev/null
then
    echo -e "\e[33mInstall GIT CLI\e[0m"
    brew install git
fi

exec /bin/zsh

# TODO - move into CLI as optional with inputs
# cp -f ~/shell-config/assets/.gitconfig.personal ~/.gitconfig.personal
# ln -f ~/.gitconfig.personal ~/.gitconfig

mkdir -p ~/.npmrcs
grant_permissions "~/.npmrcs"

# TODO - move into CLI as optional with inputs
# cp -f ~/shell-config/assets/.npmrc.personal ~/.npmrcs/personal
# ln -f ~/.npmrcs/personal ~/.npmrc


grant_permissions "/usr/local" || {}
grant_permissions "/Library/Caches/Homebrew" || {}



# Install NodeJS to run the CLI
echo -e "\e[32m--------------- Install Node ---------------\e[0m"

echo -e "\e[33mInstall NVM\e[0m"
mkdir ~/.nvm
grant_permissions "~/.nvm"

mkdir ~/.npmrc
grant_permissions "~/.npmrc"

brew install nvm
exec /bin/zsh

echo -e "\e[33mInstall NodeJS\e[0m"
nvm install 16.14.0
nvm alias default 16.14.0

exec /bin/zsh


# Trigger CLI
cd ~/shell-config
npm ci
npm run build
npm run start