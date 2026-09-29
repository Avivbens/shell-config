#! /usr/bin/env zsh

# create aliases only if gh cli exists
if command -v gh &>/dev/null; then
    alias ghpr='gh pr'
    alias ghprc='gh pr create --fill'
    alias ghprv='gh pr view --web'
    alias ghprcv='gh pr create --fill && gh pr view --web'
    alias ghprl='gh pr list'

    # `gh stack` lives in the github/gh-stack extension, offer to install it on first use
    # checked via the extensions dir since `gh extension list` needs `gh auth login` and costs ~0.3s per call
    function ghs() {
        if [[ ! -d "${XDG_DATA_HOME:-$HOME/.local/share}/gh/extensions/gh-stack" ]]; then
            printf "\033[1;33mgh-stack extension is not installed. Install it now? [y/N]\033[0m "
            if read -q; then
                echo
                gh extension install github/gh-stack || return 1
            else
                echo
                echo "Run: gh extension install github/gh-stack"
                return 1
            fi
        fi

        gh stack "$@"
    }

    # stacked PRs, see `gh stack --help`
    alias ghsi='ghs init'
    alias ghsa='ghs add'
    alias ghss='ghs submit'
    alias ghssy='ghs sync'
    alias ghsv='ghs view'
    alias ghsu='ghs up'
    alias ghsd='ghs down'
fi
