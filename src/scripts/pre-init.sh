echo -e "\e[33mInstall Xcode Command Line Tools\e[0m"
softwareupdate -i "Command Line Tools for Xcode-13.3" --agree-to-license


# echo -e "\e[33mAdd Homebrew to environment\e[0m"
# echo "eval \"$(/opt/homebrew/bin/brew shellenv)\"" >> ~/Desktop/.zshrc
# eval "$(/opt/homebrew/bin/brew shellenv)"


echo -e "\e[33mInstall Homebrew\e[0m"
yes | /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
