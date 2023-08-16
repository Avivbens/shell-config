echo -e "\e[33mInstall Xcode Command Line Tools\e[0m"
softwareupdate -i "Command Line Tools for Xcode-13.3" --agree-to-license

echo -e "\e[33mInstall Homebrew\e[0m"
yes | /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# copy shell files if not exists
if [ ! -d "$HOME/shell-config" ]; then
  cd $HOME
  mkdir -p shell-config
  cd shell-config

else
  cd $HOME/shell-config
fi

curl https://codeload.github.com/Avivbens/shell-config/tar.gz/master | \
tar -xz --strip=2 shell-config-master
