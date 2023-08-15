# Shell Configuration - ZSH

## Core
* Autosuggest
* Autocomplete
* Colored correct code


<br>

## Terminal Apps
* homebrew
* nvm
* google-cloud-sdk
* fig


<br>

## Supported Features
* System commands
* Git commands
* Node & NPM commands
* Mongodb
* Redis
* Angular
* NestJS
* Typescript


<br>

# Modules federation

### Entry points
* [.zshrc](.zshrc) - main entry point, cloned to home directory as linked file
* [.entry-point](.entry-point.sh) - entry point from `.zshrc`, contains `source` commands for all modules, load the `.zshrc.extends` file
* [.zshrc.extends](.zshrc.extends.sh) - entry point for all modules, imports them from `.zshrc.extends.*.sh` files



### Modules
* [Git](zsh/extends/.zshrc.extends.git.sh)
* [Work](zsh/extends/.zshrc.extends.work.sh)
* [Npm](zsh/extends/.zshrc.extends.npm.sh)
* [Angular](zsh/extends/.zshrc.extends.angular.sh)
* [Nest](zsh/extends/.zshrc.extends.nest.sh)
* [Private](zsh/extends/.zshrc.extends.private.sh) - Use this file to add your own aliases and functions, it is ignored by git
