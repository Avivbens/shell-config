# Contributing to shell-config

Thank you for your interest in contributing to `shell-config`! We welcome contributions from everyone.

## Getting Started

To get started, follow these steps:

1. Fork the repository
1. Clone your forked repository
1. Install dependencies with `npm ci --no-fund --no-audit --no-progress`
1. Make changes
1. Test your changes
1. Submit a pull request against the `beta` branch

## Add Some New Apps / Tools

1. Open the relevant file by the new app category [in here](src/commands/install/config/apps.config.ts)
1. Add the new app / tool to the relevant category, follow the [IAppSetup](src/models/app-setup.model.ts) type
1. Test your changes via the following command:

```bash
npm run start:dev -- install
```

4. Commit your changes, like `fix(apps): <Explain>`, and open a PR 🎉

## CLI Setup Flow

1. CLI is getting updated via the `shell-config update` command OR installed via the [init.sh](src/scripts/init.sh) script
1. Both the [.zshrc configuration](zsh/.entry-point.sh), and the [UpdateCommand](src/commands/update/update.command.ts) calling `source <(shell-config init-script)` in order to have the dynamic init command of the latest version.
1. The [InitCommand](src/commands/init/init.command.ts) kicks in, and checks all of the relevant files, tools, setups and configurations of the latest version, and update them if needed. Homebrew is been installed for both Apple Silicon and Intel based Macs. It will also backup the current `.zshrc` file

## Beta Releases

Betas are published automatically by [semantic-release](https://github.com/semantic-release/semantic-release) whenever commits land on the `beta` branch (configured in [.releaserc](.releaserc)). There is no manual version bumping — the version is derived from your [conventional commits](#commit-message-guidelines).

### Publish a beta

1. Merge your PR into the `beta` branch (PRs should target `beta` — see [Getting Started](#getting-started))
1. The [release workflow](.github/workflows/release-ci.yml) runs and publishes a prerelease named `vX.Y.Z-beta.N` to [GitHub Releases](https://github.com/Avivbens/shell-config/releases), with the packed `cli.zip` attached
1. Push more commits to `beta` to cut `-beta.2`, `-beta.3`, … ; merging `beta` into `master` later promotes it to the stable `vX.Y.Z`

### Install / test a beta

Use the built-in `update` command with the beta tag (the leading `v` is optional):

```bash
shell-config update --target v2.23.1-beta.1
```

It verifies the release exists, downloads that version's `cli.zip`, swaps the executable, and re-runs `init`. To go back, run `shell-config update` (equivalent to `--target latest`).

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. Make sure your commit messages follow the format below:

```git
<type>(optional scope): <description>
```

Available types:

1. `chore` - changes that should not affect production user code, e.g. update dev-dependencies
1. `fix` - bug fixes, e.g. fix linting errors
1. `feat` - new features, e.g. add new command
1. `docs` - changes to documentation
1. `ci` - changes to CI configuration
1. For breaking changes, add a `BREAKING CHANGE` section to the commit message body:

```git
feat: <description>

BREAKING CHANGE: <description>
```

## Contact

If you have any questions or concerns, please contact us at avivbens87@gmail.com.

Happy contributing!
