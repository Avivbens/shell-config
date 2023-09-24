#! /usr/bin/env zsh

function grant_permissions(){
  sudo chown -R "$USER":admin "$1"
  sudo chmod -R 770 "$1"
}

function get_remote_execute_file() {
  local url="$1"
  local response=$(curl -s "$url")
  local raw_lines=$(echo "$response" | sed -n 's/.*"rawLines":\[\([^]]*\)\].*/\1/p' | tr -d '[]"')
  echo "$raw_lines" | tr '\n' ' '
}

echo -e "\e[33mInstall Xcode Command Line Tools\e[0m"
softwareupdate -i "Command Line Tools for Xcode-13.3" --agree-to-license

grant_permissions "$HOME/Desktop"

mkdir -p "$HOME/.gitprofiles"
grant_permissions "$HOME/.gitprofiles"

mkdir -p "$HOME/.npmrcs"
grant_permissions "$HOME/.npmrcs"

grant_permissions "/usr/local" || {}
grant_permissions "/Library/Caches" || {}

mkdir "$HOME/.nvm"
grant_permissions "$HOME/.nvm"

mkdir -p "$HOME/shell-config/downloads"
mkdir -p "$HOME/shell-config/executable"
mkdir -p "$HOME/shell-config/zsh"
grant_permissions "$HOME/shell-config"

# download the CLI
curl -s "https://api.github.com/repos/Avivbens/shell-config/releases/latest" \
| grep "browser_download_url.*cli-v.*.zip" \
| cut -d : -f 2,3 \
| xargs curl -L -A "Mozilla/5.0" -o "$HOME/shell-config/downloads/cli-update.zip"


unzip "$HOME/shell-config/downloads/cli-update.zip" -d "$HOME/shell-config/downloads"
filename="$(basename $HOME/shell-config/downloads/bin/*)"
mv "$HOME/shell-config/downloads/bin/$filename" "$HOME/shell-config/downloads/$filename"

rm "$HOME/shell-config/downloads/cli-update.zip"
rm -rf "$HOME/shell-config/downloads/bin"


# link the downloaded file to entry point
ln -f "$HOME/shell-config/downloads/$filename" "$HOME/shell-config/executable/shell-config"

# allow apps from anywhere - avoid certificate issues
sudo spctl --master-disable

# for non Apple silicon macs
yes 'a' | softwareupdate --install-rosetta

source "$HOME/.zshrc"

sudo $HOME/shell-config/executable/shell-config init

# disallow apps from anywhere
sudo spctl --master-enable

grant_permissions "$HOME/shell-config"