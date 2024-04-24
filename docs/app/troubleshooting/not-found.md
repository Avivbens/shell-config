# Not Found

In some cases, `shell-config` would be unavailable with the following error:

```bash
Error: Cannot find module '*/shell-config/*'
```

## Solution

In case you're facing this issue, **FORCE QUIT** the terminal and open a new one.

Then, run the following command within the native terminal app:

```bash
source <(shell-config init-script)
```
