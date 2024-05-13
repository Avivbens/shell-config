## [2.18.4](https://github.com/Avivbens/shell-config/compare/v2.18.3...v2.18.4) (2024-05-13)


### Bug Fixes

* **apps:** `mcfly` under the root repo of `HomeBrew` ([0e3517f](https://github.com/Avivbens/shell-config/commit/0e3517f017a8b9af14c51f3206cbe2452eb6bc00))

## [2.18.3](https://github.com/Avivbens/shell-config/compare/v2.18.2...v2.18.3) (2024-05-11)


### Bug Fixes

* **install-command:** better menu bar, responsive install list 🎉 ([bb2a042](https://github.com/Avivbens/shell-config/commit/bb2a04250b397ac2081cb5b3f951de9e645fbbc2))

## [2.18.2](https://github.com/Avivbens/shell-config/compare/v2.18.1...v2.18.2) (2024-05-10)


### Bug Fixes

* **apps:** remove `fig` - sunset ([f3dee3d](https://github.com/Avivbens/shell-config/commit/f3dee3d0af55b642653502ee7510b3ab3932a08a))

## [2.18.1](https://github.com/Avivbens/shell-config/compare/v2.18.0...v2.18.1) (2024-05-10)


### Bug Fixes

* **logger:** drop usage of all `Logger.setContext` - use `InjectLogger` ([ce205b1](https://github.com/Avivbens/shell-config/commit/ce205b1facb10f12ffa9ddcb2a8060517c3467dd))

# [2.18.0](https://github.com/Avivbens/shell-config/compare/v2.17.3...v2.18.0) (2024-05-10)


### Bug Fixes

* **apps:** add proper docs URL to all apps 🎉 ([3b0e57c](https://github.com/Avivbens/shell-config/commit/3b0e57c1c81bd0d1cdad88dfce3d89908ebef2bd))
* **git:** support `credentials helper` cache ([29b7290](https://github.com/Avivbens/shell-config/commit/29b7290a033a026377e6971e484b88fa0c5d91cb))


### Features

* **install-command:** support open documentation links with `o` key 🚀 ([5fcc950](https://github.com/Avivbens/shell-config/commit/5fcc950f96e807fe56cd55bfd6f5f1d71d751e3b))

## [2.17.3](https://github.com/Avivbens/shell-config/compare/v2.17.2...v2.17.3) (2024-05-10)


### Bug Fixes

* **apps:** support `smartmontools` for MacOS ([5aefd46](https://github.com/Avivbens/shell-config/commit/5aefd46cb6ed47791efaeeaed5bfc5c09c47e9cb))
* **git:** add flag `--ahead-behind` for `git status` ([65cb1a6](https://github.com/Avivbens/shell-config/commit/65cb1a652e316cfdab27ae4893fe41f87c190b0b))

## [2.17.2](https://github.com/Avivbens/shell-config/compare/v2.17.1...v2.17.2) (2024-05-06)


### Bug Fixes

* **apps:** `cost-of-modules` node package ([54a133a](https://github.com/Avivbens/shell-config/commit/54a133a862f7a5915b32d4c9ffba4cb2d2bde25b))

## [2.17.1](https://github.com/Avivbens/shell-config/compare/v2.17.0...v2.17.1) (2024-05-04)


### Bug Fixes

* **install:** better `parallel` sudo required message ([6dfe9cd](https://github.com/Avivbens/shell-config/commit/6dfe9cd1544caeca7772d443a8f9570027836f51))

# [2.17.0](https://github.com/Avivbens/shell-config/compare/v2.16.1...v2.17.0) (2024-05-04)


### Bug Fixes

* add retry for failed tasks ([701bc1b](https://github.com/Avivbens/shell-config/commit/701bc1bd56fd12ad3102fedf19b8921a1aa85680))
* **install:** better error handling for installing apps ([b1a561e](https://github.com/Avivbens/shell-config/commit/b1a561e292a25a16f375641ab2b734f2712add6b))


### Features

* support `parallelCount` set parallel count, suppot `first` property to install before all others ([0d117b5](https://github.com/Avivbens/shell-config/commit/0d117b50c8beb41867c451040df0098c40624d11))

## [2.16.1](https://github.com/Avivbens/shell-config/compare/v2.16.0...v2.16.1) (2024-05-04)


### Bug Fixes

* **apps:** support `Git autoSetupRemote` ([b0a17b0](https://github.com/Avivbens/shell-config/commit/b0a17b01c4efe429c68e3193bdeb6088e3a41ae1))

# [2.16.0](https://github.com/Avivbens/shell-config/compare/v2.15.0...v2.16.0) (2024-05-04)


### Bug Fixes

* **apps:** `pip` installation issue - `error: externally-managed-environment` ([07c5a79](https://github.com/Avivbens/shell-config/commit/07c5a7904552846798aebbd9ae3b91579c3f1eef))
* **apps:** fallback for `Intel` chip apps, dependencies of `git` ([5676cb5](https://github.com/Avivbens/shell-config/commit/5676cb5e6948bcd9551dee13f5e7a274374cb45c))
* **apps:** resolve deprecated `Grammarly`, move `telegram-desktop` => `telegram` ([fdc0312](https://github.com/Avivbens/shell-config/commit/fdc03127a553fc6b723cf17d9cd7bc0a4cb9538f))
* **apps:** support legacy `WhatsApp` app ([6aed381](https://github.com/Avivbens/shell-config/commit/6aed381a391203f3635b858e978c4c416bd80e6b))
* **deps:** drop `legacy-peer-deps` - `override` to CommonJS packages 🎉 ([d77c867](https://github.com/Avivbens/shell-config/commit/d77c86750e3f8a59e2770e0a7b25d3868bdb454c))


### Features

* support `parallel` installation mode 🚀 ([5842931](https://github.com/Avivbens/shell-config/commit/584293160bc35b5b6e38bdc1324465893ae5de65))

# [2.15.0](https://github.com/Avivbens/shell-config/compare/v2.14.6...v2.15.0) (2024-05-02)


### Bug Fixes

* add `password needed` label for all related apps ([9a414cc](https://github.com/Avivbens/shell-config/commit/9a414cc6643a3f467455792da87d6c34018c43a9))
* **git-extends:** support for both `branch all` and `branch` ([7089f11](https://github.com/Avivbens/shell-config/commit/7089f115d890066d030f51bcab0ea5d9ed5a2703))


### Features

* **apps:** support `Sudo with Touch ID` feature ([9e3f167](https://github.com/Avivbens/shell-config/commit/9e3f167fb9f219ba0b17166e67b842817ffdc983))

## [2.14.6](https://github.com/Avivbens/shell-config/compare/v2.14.5...v2.14.6) (2024-04-25)


### Bug Fixes

* **apps:** add `Hovrly` ([f540cdb](https://github.com/Avivbens/shell-config/commit/f540cdb0ae54897b476f3458ffc89cb46a746f90))

## [2.14.5](https://github.com/Avivbens/shell-config/compare/v2.14.4...v2.14.5) (2024-04-24)


### Bug Fixes

* **apps:** support `Unplug Alarm` and `Radio Silence` ([259661f](https://github.com/Avivbens/shell-config/commit/259661faf0c1f0c2c07e260c5f8538e2ab8bdb2a))

## [2.14.4](https://github.com/Avivbens/shell-config/compare/v2.14.3...v2.14.4) (2024-04-24)


### Bug Fixes

* **apps:** support `zoxide` and `bat` ([2424b81](https://github.com/Avivbens/shell-config/commit/2424b8103503132c726ae80599e86855878291be))

## [2.14.3](https://github.com/Avivbens/shell-config/compare/v2.14.2...v2.14.3) (2024-04-24)


### Bug Fixes

* support git `ReReRe` install option ([40d17e3](https://github.com/Avivbens/shell-config/commit/40d17e3b2f755bcfeccda5f5e21979f5d384029b))

## [2.14.2](https://github.com/Avivbens/shell-config/compare/v2.14.1...v2.14.2) (2024-04-23)


### Bug Fixes

* **apps:** add media group, add `Downie`, `Rocket` and `Dropover` ([17790af](https://github.com/Avivbens/shell-config/commit/17790af9d36e25b8f8312197f34cb910776d3388))

## [2.14.1](https://github.com/Avivbens/shell-config/compare/v2.14.0...v2.14.1) (2024-04-22)


### Bug Fixes

* **profiles:** change `devops` to be dependent on `engineering`, fix `web` <=> `node` ([afa60c3](https://github.com/Avivbens/shell-config/commit/afa60c3ed43756257769bb266dced54f12be0879))

# [2.14.0](https://github.com/Avivbens/shell-config/compare/v2.13.1...v2.14.0) (2024-04-22)


### Bug Fixes

* add paid label for paid apps ([54d7bd0](https://github.com/Avivbens/shell-config/commit/54d7bd05db24bec5afe90f898302214ba3342849))
* **apps:** add `TextSniper` and `Pycharm` ([73903cb](https://github.com/Avivbens/shell-config/commit/73903cbf84dd45745b4b24e213b319535b834479))


### Features

* support `NON-PAID` option to exclude all paid apps selections ([0bed54e](https://github.com/Avivbens/shell-config/commit/0bed54e2e23b6dfd3d009926f0018f01dd80e965))
* support more `profile tags`, drop unused node packages, change tags system - support tags dependencies ([4a7a3a4](https://github.com/Avivbens/shell-config/commit/4a7a3a4d2981533d4a5b52eeae7b3939a665f978))

## [2.13.1](https://github.com/Avivbens/shell-config/compare/v2.13.0...v2.13.1) (2024-04-22)


### Bug Fixes

* **app:** support `TinkerTool` app ([6ef56e8](https://github.com/Avivbens/shell-config/commit/6ef56e81d20b7a93414c3a738b7f85ae8042c482))

# [2.13.0](https://github.com/Avivbens/shell-config/compare/v2.12.0...v2.13.0) (2024-04-22)


### Bug Fixes

* **apps:** add `App Store` apps collection ([b080b26](https://github.com/Avivbens/shell-config/commit/b080b261dc94d742eac6d32c7aae7682668c961a))


### Features

* support open installation page on `App Store` apps within `shell-config` ([749bfdd](https://github.com/Avivbens/shell-config/commit/749bfdd2f40f9b36ac0d2794b765a2c7d8a1cec1))

# [2.12.0](https://github.com/Avivbens/shell-config/compare/v2.11.9...v2.12.0) (2024-04-21)


### Features

* support `GitHub CLI` terminal app, aliases and functions ([6916109](https://github.com/Avivbens/shell-config/commit/69161097ccab40309e577bcaa21c497fd209589c))

## [2.11.9](https://github.com/Avivbens/shell-config/compare/v2.11.8...v2.11.9) (2024-04-20)


### Bug Fixes

* drop unused aliases, use `local` in all shell functions ([68841fd](https://github.com/Avivbens/shell-config/commit/68841fdbdc87da6e6d44e8e81952061fa2b906e7))
* **load-time:** improve by `600` milliseconds 🚀 ([c33beb3](https://github.com/Avivbens/shell-config/commit/c33beb30acdd2aaa8f790aeb233d72c9278d42f5))
* **logs:** drop all logs for loaded modules ([8f89a8a](https://github.com/Avivbens/shell-config/commit/8f89a8ac52164f3f2a42bcb3a2de0ed265eb4e59))
* split `ZSH Terminal Syntax` packages ([08511ba](https://github.com/Avivbens/shell-config/commit/08511ba3c8f07dd572285870d01bdd8fd032182f))

## [2.11.8](https://github.com/Avivbens/shell-config/compare/v2.11.7...v2.11.8) (2024-04-18)


### Bug Fixes

* **deps:** bump up all deps, migrate to `lint-staged` ([b5c1391](https://github.com/Avivbens/shell-config/commit/b5c139141a2acba9ffc495db094c7529f8b53d19))

### [2.11.7](https://github.com/Avivbens/shell-config/compare/v2.11.6...v2.11.7) (2024-04-15)

### Bug Fixes

-   rebase with VSCode command ([5e5aa96](https://github.com/Avivbens/shell-config/commit/5e5aa96e32564bd8506791693b81b6e2e242cdaa))

### [2.11.6](https://github.com/Avivbens/shell-config/compare/v2.11.5...v2.11.6) (2024-04-13)

### Bug Fixes

-   better `shell-doctor` command ([91394df](https://github.com/Avivbens/shell-config/commit/91394df5c1b70c39bb5dec24de7739638db82117))

### [2.11.5](https://github.com/Avivbens/shell-config/compare/v2.11.4...v2.11.5) (2024-04-13)

### Bug Fixes

-   add `insecure` flag to all cURL fix SSL block download, change docs to support that ([5fa2de8](https://github.com/Avivbens/shell-config/commit/5fa2de85e033a1b4ff72765db0faa2a0a78db077))
-   compinit issues ([75e8619](https://github.com/Avivbens/shell-config/commit/75e8619f31264ccbeca3ade8868aa23b9f0f08d1))

### [2.11.4](https://github.com/Avivbens/shell-config/compare/v2.11.3...v2.11.4) (2024-04-13)

### Bug Fixes

-   support `sizeof` alias ([b5f0337](https://github.com/Avivbens/shell-config/commit/b5f033761651266cd84e662d07def60b687244ec))

### [2.11.3](https://github.com/Avivbens/shell-config/compare/v2.11.2...v2.11.3) (2024-04-02)

### Bug Fixes

-   bump-up to node 20, add readme section for error handling `Cannot find module` ([484434a](https://github.com/Avivbens/shell-config/commit/484434a70013dab71e95aac7112ef29de4b6f5d5))

### [2.11.2](https://github.com/Avivbens/shell-config/compare/v2.11.1...v2.11.2) (2024-04-02)

### Bug Fixes

-   add `compaudit` handler for doctor ([d4d1d00](https://github.com/Avivbens/shell-config/commit/d4d1d009255fc6d6cae5d59d5f33e38d8047eb8d))

### [2.11.1](https://github.com/Avivbens/shell-config/compare/v2.11.0...v2.11.1) (2024-04-02)

### Bug Fixes

-   `pkg` deprecated => `@yao-pkg/pkg` ([99dafc5](https://github.com/Avivbens/shell-config/commit/99dafc5a725d21ad7e112f44c568b5b2ba974f5a))

## [2.11.0](https://github.com/Avivbens/shell-config/compare/v2.10.1...v2.11.0) (2024-04-02)

### Features

-   add Vivid and MonitorControl ([adcc123](https://github.com/Avivbens/shell-config/commit/adcc123857e5773822f7032f7b73372c9f818312))
-   re-organize all groups for `install` command ([46dc372](https://github.com/Avivbens/shell-config/commit/46dc372fb18fce7b0e196ae580bc566850f38a37))

### [2.10.1](https://github.com/Avivbens/shell-config/compare/v2.10.0...v2.10.1) (2024-03-10)

### Bug Fixes

-   compinit only for `zsh-completions` exists ([1574ee5](https://github.com/Avivbens/shell-config/commit/1574ee5e8cb5d0585c1052c39a1e294c3bf6811b))

## [2.10.0](https://github.com/Avivbens/shell-config/compare/v2.9.2...v2.10.0) (2024-03-03)

### Features

-   support `theme` shell module for all colors setup ([c6161fc](https://github.com/Avivbens/shell-config/commit/c6161fc7349362979f3e41c824b4baf7da6ddee9))

### Bug Fixes

-   add dpdm as nodejs package ([3a72511](https://github.com/Avivbens/shell-config/commit/3a72511a5cc6ce6e5634d1b5289bd347e46af5bd))
-   support zsh colors and autocomplete by brew ([5a6f6b3](https://github.com/Avivbens/shell-config/commit/5a6f6b30525cc4a703a23f401ff9cf3d39dce2e5))

### [2.9.2](https://github.com/Avivbens/shell-config/compare/v2.9.1...v2.9.2) (2024-02-21)

### Bug Fixes

-   setup nodejs default version to 18.19.1 - EOL for nodejs 16 ([4c144d6](https://github.com/Avivbens/shell-config/commit/4c144d62804f050badc478102a03d9d4c92c053b))

### [2.9.1](https://github.com/Avivbens/shell-config/compare/v2.9.0...v2.9.1) (2024-02-20)

### Bug Fixes

-   homebrew setup on root (both arch64 and native brew) ([aa65eb1](https://github.com/Avivbens/shell-config/commit/aa65eb11cb2bfdf114d736fa19dc890057086f33))

## [2.9.0](https://github.com/Avivbens/shell-config/compare/v2.8.5...v2.9.0) (2024-01-26)

### Features

-   support git log better padding with less ([ab024ff](https://github.com/Avivbens/shell-config/commit/ab024ffcbaa40bc355b7157cda1727cea78a5344))
-   support vscode shell module ([5f2b932](https://github.com/Avivbens/shell-config/commit/5f2b9324ebdaaa7a82ca396b80b3ac0455bf5ab4))

### Bug Fixes

-   add subler as an app ([0cd0ad6](https://github.com/Avivbens/shell-config/commit/0cd0ad67f6f42ac2202262ff577e6eb5dce50e69))
-   bump up deps ([4e8ccb9](https://github.com/Avivbens/shell-config/commit/4e8ccb92b7a68d9dac4c9f165d3035a1f45d306f))
-   page size for install command ([5075eae](https://github.com/Avivbens/shell-config/commit/5075eaec3a9612bfa85ed29db75702c5d692f98b))

### 2.8.5 (2024-01-07)

### Bug Fixes

-   add vall commad for opening vscode for all sub-directories ([9477dbe](https://github.com/Avivbens/shell-config/commit/9477dbede78c251628723eead983b29dfc65204b))

### 2.8.4 (2024-01-06)

### Bug Fixes

-   failing to install google-cloud-sdk for apple silicon chip ([2d9cf38](https://github.com/Avivbens/shell-config/commit/2d9cf38795cbcb975d0c44cbddf7b173a810c7d6))

### 2.8.3 (2024-01-02)

### Bug Fixes

-   workflow for release ([dab9fd7](https://github.com/Avivbens/shell-config/commit/dab9fd79b154826a3e3bc4294de4bf8ce13a12b0))

### 2.8.2 (2023-12-01)

### Bug Fixes

-   support btop terminal app ([#46](https://github.com/Avivbens/shell-config/issues/46)) ([f144c8c](https://github.com/Avivbens/shell-config/commit/f144c8cd577a00f896c824794357b062433b9524))

### 2.8.1 (2023-11-28)

### Bug Fixes

-   add kubectx support ([#45](https://github.com/Avivbens/shell-config/issues/45)) ([17c2fab](https://github.com/Avivbens/shell-config/commit/17c2fabad4da679316e201a8176fca8ae11c01f3))

## 2.8.0 (2023-11-07)

### Features

-   support devops features, fix: node & google-cloud sdk issues ([#44](https://github.com/Avivbens/shell-config/issues/44)) ([edf3bac](https://github.com/Avivbens/shell-config/commit/edf3bac0ed30486ff080c99ec3c88e5047ecc313)), closes [#43](https://github.com/Avivbens/shell-config/issues/43)

### 2.7.3 (2023-09-25)

### Bug Fixes

-   un-triggered commands over the terminal ([1c53a10](https://github.com/Avivbens/shell-config/commit/1c53a1052dbf84ef7bf94fadcd42e6966b645bda))

### 2.7.2 (2023-09-25)

### Bug Fixes

-   non-execution of terminal scripts ([216aed0](https://github.com/Avivbens/shell-config/commit/216aed074d201242d0231c2ef83abc4e6191293e))

### 2.7.1 (2023-09-25)

### Bug Fixes

-   update command load of the init-script ([94ae839](https://github.com/Avivbens/shell-config/commit/94ae839ba2e7769c10ef0f1c5ebec64390239e98))

## 2.7.0 (2023-09-25)

### Features

-   support multiple architectures ([#42](https://github.com/Avivbens/shell-config/issues/42)) ([c17650d](https://github.com/Avivbens/shell-config/commit/c17650d095c68cfa8a72692d8162df2a3682b41d))

### 2.6.8 (2023-09-11)

### Bug Fixes

-   another-redis-desktop-manager command with quotes ([5ea121e](https://github.com/Avivbens/shell-config/commit/5ea121e006e1f9c6c277f8d4b5b9e932b37efebb))

### 2.6.7 (2023-09-11)

### Bug Fixes

-   compinit load with autoload to fix completion for all macs ([de17543](https://github.com/Avivbens/shell-config/commit/de175439762f6852875dd94222465327e219cb4d))

### 2.6.6 (2023-09-10)

### Bug Fixes

-   better auto-doctor in less time, handle recursive permissions issues ([106b2a1](https://github.com/Avivbens/shell-config/commit/106b2a1413643a1fc5d8d84e8fd113c7ec7075f4))

### 2.6.5 (2023-09-10)

### Bug Fixes

-   auto-doctor if shell-config directory does not have permissions ([26e99f7](https://github.com/Avivbens/shell-config/commit/26e99f7f2005bc38e05ce7422d44c9b1ee6a6c9e))

### 2.6.4 (2023-09-10)

### Bug Fixes

-   shell-doctor entry point command ([a9354d1](https://github.com/Avivbens/shell-config/commit/a9354d1203abcb58a803a5b21c713906667032e1))

### 2.6.3 (2023-09-10)

### Bug Fixes

-   change files permissions mode to 770 ([2f7fe06](https://github.com/Avivbens/shell-config/commit/2f7fe06e4ca508a629a0c934ccad7c85b31e4ea4))

### 2.6.2 (2023-09-09)

### Bug Fixes

-   another-redis-desktop-manager command spaces escapes ([614c556](https://github.com/Avivbens/shell-config/commit/614c5569c4e4d463dcf3d4bcfa2070f883bf966f))

### 2.6.1 (2023-09-09)

### Bug Fixes

-   another-redis-desktop-manager command spaces escapes ([0349259](https://github.com/Avivbens/shell-config/commit/03492593879dcd27ef6dede7e9bc12cb39bd9aca))

## 2.6.0 (2023-09-09)

### Features

-   support shell command current state by current files config ([#41](https://github.com/Avivbens/shell-config/issues/41)) ([4465e2b](https://github.com/Avivbens/shell-config/commit/4465e2b961a4d2a90d59824f793035ece98072a7))

### 2.5.1 (2023-09-08)

### Bug Fixes

-   remove tags off a few items ([90a2c09](https://github.com/Avivbens/shell-config/commit/90a2c09872db2c27f6bb652c4eaf28638988de9d))

## 2.5.0 (2023-09-08)

### Features

-   support user tags to setup default values ([#40](https://github.com/Avivbens/shell-config/issues/40)) ([2ceeb3e](https://github.com/Avivbens/shell-config/commit/2ceeb3e947ed70d083e9d215b504ffc81948fe79))

### 2.4.3 (2023-09-07)

### Bug Fixes

-   duplicates over entry point ([04268c7](https://github.com/Avivbens/shell-config/commit/04268c742e1957d0f14c457046b2f04df47cab76))

### 2.4.2 (2023-09-07)

### Bug Fixes

-   unpack files with admin permission mode ([effab19](https://github.com/Avivbens/shell-config/commit/effab19caf1e6319877ed9630249e04ff40caaab))

### 2.4.1 (2023-09-07)

### Bug Fixes

-   support instance id as part of logger ([60bf988](https://github.com/Avivbens/shell-config/commit/60bf988c246d4992c520b1bcb4928d92698a911d))

## 2.4.0 (2023-09-07)

### Features

-   better assets interactive command ([8eb840f](https://github.com/Avivbens/shell-config/commit/8eb840f7e1b1738ecb0b153e905d4f8042e7f849))

### Bug Fixes

-   bug of shell command overwrite after update ([8eb840f](https://github.com/Avivbens/shell-config/commit/8eb840f7e1b1738ecb0b153e905d4f8042e7f849))

### 2.3.1 (2023-09-04)

### Bug Fixes

-   update command enter sudo password enabled ([e87ec89](https://github.com/Avivbens/shell-config/commit/e87ec890c83e49f8d5a6428a1cc48c2ac835675c))

## 2.3.0 (2023-09-04)

### Features

-   support completion for the CLI ([#38](https://github.com/Avivbens/shell-config/issues/38)) ([1f677f7](https://github.com/Avivbens/shell-config/commit/1f677f70e86bf44016ff5dfc601f2d9dbf357fe6)), closes [#37](https://github.com/Avivbens/shell-config/issues/37) [#34](https://github.com/Avivbens/shell-config/issues/34)

### 2.2.1 (2023-09-03)

### Features

-   support for mcfly, auto-check for updates on bootstrap ([#34](https://github.com/Avivbens/shell-config/issues/34)) ([fb1c1fc](https://github.com/Avivbens/shell-config/commit/fb1c1fc9d0036a6369e2a02e7057fd1eff84353e))

## 2.1.0 (2023-08-31)

### Features

-   setup assets command, remove assets setup from install command ([#33](https://github.com/Avivbens/shell-config/issues/33)) ([fc3aa45](https://github.com/Avivbens/shell-config/commit/fc3aa450b3310fd243cbdfb308940864b158d0e3))

### 2.0.1 (2023-08-30)

### Bug Fixes

-   external functionality, show update available just for major releases ([#32](https://github.com/Avivbens/shell-config/issues/32)) ([5d078a5](https://github.com/Avivbens/shell-config/commit/5d078a5b4017df3613e2c95a4c460c5cd882bf48))

## 2.0.0 (2023-08-28)

### ⚠ BREAKING CHANGES

-   Release v2 into master (#31)

### Features

-   Release v2 into master ([#31](https://github.com/Avivbens/shell-config/issues/31)) ([c376855](https://github.com/Avivbens/shell-config/commit/c3768550d0aa3534bbad3280cc0d1bbe3248c27d)), closes [#25](https://github.com/Avivbens/shell-config/issues/25) [#27](https://github.com/Avivbens/shell-config/issues/27) [#28](https://github.com/Avivbens/shell-config/issues/28)

## 1.1.0 (2023-08-17)

### Features

-   git feature ([#22](https://github.com/Avivbens/shell-config/issues/22)) ([c4ea187](https://github.com/Avivbens/shell-config/commit/c4ea1878d0ac5921babbd9baf7a719bd6b88736d))

### 1.0.1 (2023-08-17)

## 1.0.0 (2023-08-17)
