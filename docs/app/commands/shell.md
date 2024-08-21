---
prev:
  text: 'Install Command'
  link: '/app/commands/install'

next:
  text: 'Assets Command'
  link: '/app/commands/assets'
---

<script setup>
    const repoUrl = 'https://github.com/Avivbens/shell-config/tree/HEAD'
</script>

# Shell Command

The `shell` command is used to configure the MacOS shell environment.

The command allow you to enable / disable bash functions and aliases by their modules, and to configure the shell prompt.

## Usage

```bash
shell-config shell
```

Enable / disable the modules according to your preferences, by using the arrow keys and space bar to select/deselect the modules. Press `Enter` to apply the selected modules.

## Modules

-   [Git](https://github.com/Avivbens/shell-config/tree/HEAD/zsh/extends/.zshrc.extends.git.sh)
-   [GitHub CLI](https://github.com/Avivbens/shell-config/tree/HEAD/zsh/extends/.zshrc.extends.github.sh)
-   [VSCode](https://github.com/Avivbens/shell-config/tree/HEAD/zsh/extends/.zshrc.extends.vscode.sh)
-   [Npm](https://github.com/Avivbens/shell-config/tree/HEAD/zsh/extends/.zshrc.extends.npm.sh)
-   [Network](https://github.com/Avivbens/shell-config/tree/HEAD/zsh/extends/.zshrc.extends.network.sh)
-   [Angular](https://github.com/Avivbens/shell-config/tree/HEAD/zsh/extends/.zshrc.extends.angular.sh)
-   [MongoDB](https://github.com/Avivbens/shell-config/tree/HEAD/zsh/extends/.zshrc.extends.mongo.sh)
-   [Python](https://github.com/Avivbens/shell-config/tree/HEAD/zsh/extends/.zshrc.extends.python.sh)
-   [Redis](https://github.com/Avivbens/shell-config/tree/HEAD/zsh/extends/.zshrc.extends.redis.sh)
-   [Theme](https://github.com/Avivbens/shell-config/tree/HEAD/zsh/extends/.zshrc.extends.theme.sh)
<!-- -   [Nest](https://github.com/Avivbens/shell-config/tree/HEAD/zsh/extends/.zshrc.extends.nest.sh) -->

## Examples

![Shell Command](/shell-command.png)
