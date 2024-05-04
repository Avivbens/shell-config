---
prev:
    text: 'Setup'
    link: '/app/setup'

next:
    text: 'Shell Command'
    link: '/app/commands/shell'
---

# Install Command

The `install` command is used to install useful MacOS applications and tools - according to your own profile preferences.

This command will install each of the selected applications and all of its dependencies.

::: info **Applications 👨‍💻**
You can see all supported applications [in here](https://github.com/Avivbens/shell-config/tree/HEAD/src/commands/install/config/apps.config.ts)
:::

::: tip **Parallel Mode 🚀**
`shell-config` support parallel mode for application installation!
This means that the applications will be installed in parallel, which will save you time 🎉
:::

## Usage

```bash
shell-config install
```

Select the applications you want to install by using the arrow keys and space bar to select/deselect the applications. Press `Enter` to install the selected applications.

::: warning **Note ❗**
**Relevant for non-parallel installation ONLY**
For some applications, you may be asked to provide your password
Pay attention to the password inputs if needed! _( 🔑 - key icon)_

_For parallel mode, you will be asked to provide your password only once_
:::

## Options

-   `--no-parallel` - Disable parallel mode for applications installation.
-   `-p --parallel-count <parallelCount>` - Set the number of parallel application installations. The default is based on the number of CPU cores.

## Profiles

You can set predefined selected applications by using the profiles feature. Simply select the relevant profiles you'd like to have, and press `Enter` to preselect relevant applications.

Some profiles have dependencies, such as `node-engineering` profile, which is dependent on the `engineering` profile.
You can select both, but under the hood, the `engineering` profile will be selected automatically.

::: info **Profiles 🗣️**
You can see all profiles dependencies [in here](https://github.com/Avivbens/shell-config/tree/HEAD/src/models/tag.model.ts)
:::

## Examples

![Install Profiles](/select-tags.png)
![Install Options](/install-options.png)
![Install Command](/install-command.png)
