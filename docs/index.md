---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
    name: 'Shell Config'
    tagline: 'CLI Tool for MacOS setup - apps, shell, assets, etc'
    actions:
        - theme: brand
          text: Discover
          link: /app/setup
        - theme: alt
          text: Troubleshooting
          link: /app/troubleshooting/permissions
features:
    - title: Install Apps
      link: '/app/commands/install'
      details: Install apps with default selections or customized user profiles.
      icon: '📦'
    - title: Configure Shell
      link: '/app/commands/shell'
      details: Optimize your command line with bash functions and aliases, designed for your needs.
      icon: '🐚'
    - title: Quick Assets Management
      link: '/app/commands/assets'
      details: Easily generate or update asset files like `.npmrc` and `.gitconfig` with the settings you need.
      icon: '🛠️'
---

## Quick Start

You can get started using `shell-config` using the following command:

```bash
sudo cd && /bin/bash -c "$(curl -fsSLk https://raw.githubusercontent.com/avivbens/shell-config/HEAD/src/scripts/init.sh)"
```

[Learn more](/app/setup)
