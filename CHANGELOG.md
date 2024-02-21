# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.9.2](https://github.com/Avivbens/shell-config/compare/v2.9.1...v2.9.2) (2024-02-21)


### Bug Fixes

* setup nodejs default version to 18.19.1 - EOL for nodejs 16 ([4c144d6](https://github.com/Avivbens/shell-config/commit/4c144d62804f050badc478102a03d9d4c92c053b))

### [2.9.1](https://github.com/Avivbens/shell-config/compare/v2.9.0...v2.9.1) (2024-02-20)


### Bug Fixes

* homebrew setup on root (both arch64 and native brew) ([aa65eb1](https://github.com/Avivbens/shell-config/commit/aa65eb11cb2bfdf114d736fa19dc890057086f33))

## [2.9.0](https://github.com/Avivbens/shell-config/compare/v2.8.5...v2.9.0) (2024-01-26)


### Features

* support git log better padding with less ([ab024ff](https://github.com/Avivbens/shell-config/commit/ab024ffcbaa40bc355b7157cda1727cea78a5344))
* support vscode shell module ([5f2b932](https://github.com/Avivbens/shell-config/commit/5f2b9324ebdaaa7a82ca396b80b3ac0455bf5ab4))


### Bug Fixes

* add subler as an app ([0cd0ad6](https://github.com/Avivbens/shell-config/commit/0cd0ad67f6f42ac2202262ff577e6eb5dce50e69))
* bump up deps ([4e8ccb9](https://github.com/Avivbens/shell-config/commit/4e8ccb92b7a68d9dac4c9f165d3035a1f45d306f))
* page size for install command ([5075eae](https://github.com/Avivbens/shell-config/commit/5075eaec3a9612bfa85ed29db75702c5d692f98b))

### 2.8.5 (2024-01-07)


### Bug Fixes

* add vall commad for opening vscode for all sub-directories ([9477dbe](https://github.com/Avivbens/shell-config/commit/9477dbede78c251628723eead983b29dfc65204b))

### 2.8.4 (2024-01-06)


### Bug Fixes

* failing to install google-cloud-sdk for apple silicon chip ([2d9cf38](https://github.com/Avivbens/shell-config/commit/2d9cf38795cbcb975d0c44cbddf7b173a810c7d6))

### 2.8.3 (2024-01-02)


### Bug Fixes

* workflow for release ([dab9fd7](https://github.com/Avivbens/shell-config/commit/dab9fd79b154826a3e3bc4294de4bf8ce13a12b0))

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
