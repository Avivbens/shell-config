---
prev:
  text: 'Shell Command'
  link: '/app/commands/shell'

next:
  text: 'Update Command'
  link: '/app/commands/update'
---

<script setup>
    const repoUrl = 'https://github.com/Avivbens/shell-config/tree/HEAD'
</script>

# Assets Command

The `assets` command is used to configure your MacOS assets, such as `gitconfig` and `npmrc`.

## Usage

```bash
shell-config assets
```

Select and customize the assets according to your needs, by using the arrow keys and space bar to enter into menus. Press `Enter` to apply the selected assets.

For each selected asset, you'd be asked to provide the required information.

::: warning **Note ❗**
For some configuration, you may be asked to provide your password.
Pay attention to the password inputs if needed! _( 🔑 - key icon)_
:::

## Multi Profiles Support

Both `gitconfig` and `npmrc` assets support multi profiles.

You can create as many profiles as you wish, and simply switch between them using the `npmrc` NPM package / `swgit` command for `gitprofile`.

## Assets

-   [Git Profile](https://github.com/Avivbens/shell-config/tree/HEAD/assets/.gitconfig.template)
-   [npmrc Default](https://github.com/Avivbens/shell-config/tree/HEAD/assets/.npmrc.template)
-   [npmrc Custom](https://github.com/Avivbens/shell-config/tree/HEAD/assets/.npmrc.custom.template)

## Examples

![Assets Page](/assets-command.png)
