# Shell Configuration - ZSH

## Remote Installation - No dependencies needed

<details>
<summary>Click to expand</summary>

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

</details>

## CLI Usage

```bash
# Must be done BEFORE EACH running the CLI in a new terminal window
sudo shell-config --help
```

```bash
# Start with this command in order to configure your ZSH shell
shell-config shell
```

```bash
# Select secrets to apply, and choose apps to install
shell-config install
```

```bash
# Select CLI version / update version
shell-config update --version {target version}
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
