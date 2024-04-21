#! /usr/bin/env zsh

# create aliases only if gh cli exists
if command -v gh &>/dev/null; then
    alias ghpr='gh pr'
    alias ghprc='gh pr create --fill'
    alias ghprv='gh pr view --web'
    alias ghprcv='gh pr create --fill && gh pr view --web'
    alias ghprl='gh pr list'
fi
