# Permissions issues

`shell-config` requires permissions in order to be able to load all installed modules and configurations via Homebrew and NPM.

## Solution

In case of having permissions issue, try the following:

```bash
source <(shell-config init-script)
```
