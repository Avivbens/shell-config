# Shell Configuration - ZSH

## Remote Installation - No dependencies needed

<details>
<summary>Click to expand</summary>

### Pre Install

```bash
sudo cd
function get_remote_execute_file() {
  local file_path="$1"
  local url="https://raw.githubusercontent.com/avivbens/shell-config/master/$file_path"
  local response=$(curl -s "$url")
  echo "$response"
}

get_remote_execute_file "src/scripts/pre-init.sh" | sh
```

**Open a new terminal window**

<hr>

### CLI Installation

```bash
sudo cd
function get_remote_execute_file() {
  local file_path="$1"
  local url="https://raw.githubusercontent.com/avivbens/shell-config/master/$file_path"
  local response=$(curl -s "$url")
  echo "$response"
}

get_remote_execute_file "src/scripts/init.sh" | sh
```

### Post Install and Configuration - after done with CLI usage

```bash
sudo cd
function get_remote_execute_file() {
  local file_path="$1"
  local url="https://raw.githubusercontent.com/avivbens/shell-config/master/$file_path"
  local response=$(curl -s "$url")
  echo "$response"
}

get_remote_execute_file "src/scripts/post-init.sh" | sh
```

<br>
<hr>

</details>

## Manual Installation - Git needed

<details>
<summary>Click to expand</summary>

### Pre Install

```bash
cd
git clone https://github.com/Avivbens/shell-config.git
```

```bash
cat ~/shell-config/src/scripts/pre-init.sh | pbcopy
sudo pbpaste | sh
```

**Open a new terminal window**

<hr>

### CLI Installation

```bash
cat ~/shell-config/src/scripts/init.sh | pbcopy
sudo pbpaste | sh
```

<!-- <br> -->

<!-- Download CLI executable
<br>
[CLI Download](https://github.com/Avivbens/shell-config/releases/latest) - Download the `cli.zip` file and extract it to your Desktop -->

### Post Install and Configuration - after done with CLI usage

```bash
cat ~/shell-config/src/scripts/post-init.sh | pbcopy
sudo pbpaste | sh
```

</details>

## CLI Usage

<!-- ```bash
# Non Apple Silicon Macs
softwareupdate --install-rosetta
``` -->

```bash
# Must be done BEFORE EACH running the CLI in a new terminal window
cd ~/Desktop
sudo ~/Desktop/cli-v* --help
```

```bash
# Better to start with
~/Desktop/cli-v* shell # install shell configuration as described in this readme

# Open a new terminal window, run the before each command again, and then
~/Desktop/cli-v* init # init system configuration, ask for credentials of NPM and git, select apps to install
```

## Supported Terminal Features

-   System commands
-   Git commands
-   Node & NPM commands
-   Google-Cloud-Sdk
-   Homebrew
-   Fig
-   Autosuggest
-   Autocomplete
-   Colored Correct Code
-   Mongodb
-   Redis
-   Angular
-   Nestjs
-   Typescript

<br>

# Modules federation

### Entry points

-   [.zshrc](zsh/.zshrc) - main entry point, cloned to home directory as linked file
-   [.entry-point](zsh/.entry-point.sh) - entry point from `.zshrc`, contains `source` commands for all modules, load the `.zshrc.extends` file
-   [.zshrc.extends](zsh/.zshrc.extends.sh) - entry point for all modules, imports them from `.zshrc.extends.*.sh` files

### Modules

-   [Git](zsh/extends/.zshrc.extends.git.sh)
-   [Work](zsh/extends/.zshrc.extends.work.sh)
-   [Npm](zsh/extends/.zshrc.extends.npm.sh)
-   [Angular](zsh/extends/.zshrc.extends.angular.sh)
-   [Nest](zsh/extends/.zshrc.extends.nest.sh)
-   [Private](zsh/extends/.zshrc.extends.private.sh) - Use this file to add your own aliases and functions, it is ignored by git
