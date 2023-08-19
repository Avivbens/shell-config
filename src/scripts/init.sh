#! /usr/bin/env zsh

function grant_permissions(){
  sudo chown -R "$USER":admin "$1"
  chmod -R 700 "$1"
}

function get_remote_execute_file() {
  local url="$1"
  local response=$(curl -s "$url")
  local raw_lines=$(echo "$response" | sed -n 's/.*"rawLines":\[\([^]]*\)\].*/\1/p' | tr -d '[]"')
  echo "$raw_lines" | tr '\n' ' '
}

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
curl -s https://api.github.com/repos/Avivbens/shell-config/releases/latest \
| grep "browser_download_url.*cli-v.*.zip" \
| cut -d : -f 2,3 \
| tr -d \" \
| xargs curl -L -A "Mozilla/5.0" -o ~/Desktop/cli.zip

# unzip the CLI
unzip ~/Desktop/cli.zip -d ~/Desktop
mv ~/Desktop/bin/* ~/Desktop
rm ~/Desktop/cli.zip
rm -rf ~/Desktop/bin

# allow apps from anywhere - avoid certificate issues
sudo spctl --master-disable

# for non Apple silicon macs
yes 'a' | softwareupdate --install-rosetta
