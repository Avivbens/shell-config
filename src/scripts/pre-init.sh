echo -e "\e[33mInstall Xcode Command Line Tools\e[0m"
softwareupdate -i "Command Line Tools for Xcode-13.3" --agree-to-license

echo -e "\e[33mInstall Homebrew\e[0m"
yes | /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

sudo chmod +a "user:$USER allow read,write,append,readattr,writeattr,readextattr,writeextattr,readsecurity" /etc/hosts && echo 127.0.0.1 dev.zoominfo.com >> /etc/hosts
