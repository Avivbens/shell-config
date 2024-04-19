# Update Command

The `update` command is used to update the shell-config CLI to the latest version.

You can also update the CLI to a specific version, by using the `-t / --target` flag, providing the version number as an argument.

With every update, you'd be asked to update the `shell-config` CLI. All existing configurations will be preserved, and new capabilities will be added.

## Usage

```bash
shell-config update
```

## Flags

### Upgrade / Downgrade to Specific Version

```bash
shell-config update -t <VERSION_HERE>
```

### Check for Updates

```bash
shell-config update -m
```
