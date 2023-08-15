# Shell Configuration - ZSH

## CLI Usage

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

### CLI Bootstrap

```bash
cd ~/shell-config
cat ~/shell-config/src/scripts/init.sh | pbcopy
sudo pbpaste | sh
```

**Open a new terminal window**

```bash
cd ~/shell-config
npm run build
sudo npm run start
```

<br>

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
