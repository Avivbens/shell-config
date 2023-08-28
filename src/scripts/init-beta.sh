#! /usr/bin/env zsh

function grant_permissions(){
  sudo chown -R "$USER":admin "$1"
  sudo chmod -R 700 "$1"
}

function get_remote_execute_file() {
  local url="$1"
  local response=$(curl -s "$url")
  local raw_lines=$(echo "$response" | sed -n 's/.*"rawLines":\[\([^]]*\)\].*/\1/p' | tr -d '[]"')
  echo "$raw_lines" | tr '\n' ' '
}

echo -e "\e[33mInstall Xcode Command Line Tools\e[0m"
softwareupdate -i "Command Line Tools for Xcode-13.3" --agree-to-license

# install homebrew if not installed
if ! command -v brew &> /dev/null
then
    echo -e "\e[33mInstall Homebrew\e[0m"
    yes | /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

grant_permissions ~/Desktop

mkdir -p ~/.npmrcs
grant_permissions "~/.npmrcs"

grant_permissions "/usr/local" || {}
grant_permissions "/Library/Caches/Homebrew" || {}

mkdir ~/.nvm
grant_permissions "~/.nvm"

mkdir -p ~/shell-config/downloads
mkdir -p ~/shell-config/executable
mkdir -p ~/shell-config/zsh
mkdir -p ~/shell-config/private
grant_permissions "~/shell-config"

# save all terminal output to a file
# exec &> ~/Desktop/init.log


# download the CLI
version="v2.0.0-beta.30"
curl "https://github.com/Avivbens/shell-config/releases/download/$version/cli-$version.zip" -L -A "Mozilla/5.0" -o "$HOME/shell-config/downloads/cli-update.zip"

unzip "$HOME/shell-config/downloads/cli-update.zip" -d "$HOME/shell-config/downloads"
filename="$(basename $HOME/shell-config/downloads/bin/*)"
mv "$HOME/shell-config/downloads/bin/$filename" "$HOME/shell-config/downloads/$filename"

rm "$HOME/shell-config/downloads/cli-update.zip"
rm -rf "$HOME/shell-config/downloads/bin"


# link the downloaded file to entry point
ln -f "$HOME/shell-config/downloads/$filename" "$HOME/shell-config/executable/shell-config"


# put new entry export in .zshrc
echo '\nexport PATH="$HOME/shell-config/executable:$PATH"\n' >> "$HOME/.zshrc"

# allow apps from anywhere - avoid certificate issues
sudo spctl --master-disable

# for non Apple silicon macs
yes 'a' | softwareupdate --install-rosetta

source "$HOME/.zshrc"

sudo shell-config init

# disallow apps from anywhere
sudo spctl --master-enable