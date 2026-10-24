#! /usr/bin/env zsh

# create aliases only if gh cli exists
if command -v gh &>/dev/null; then

    # ---------- pull requests ----------

    alias ghpr='gh pr'
    alias ghprc='gh pr create --fill'
    alias ghprv='gh pr view --web'
    alias ghprcv='gh pr create --fill && gh pr view --web'
    alias ghprl='gh pr list'

    # ---------- stacked PRs (gh stack) ----------

    # `gh stack` lives in the github/gh-stack extension, offer to install it on first use
    # checked via the extensions dir since `gh extension list` needs `gh auth login` and costs ~0.3s per call
    function _ghs_ensure_installed() {
        [[ -d "${XDG_DATA_HOME:-$HOME/.local/share}/gh/extensions/gh-stack" ]] && return 0

        printf "\033[1;33mgh-stack extension is not installed. Install it now? [y/N]\033[0m "
        if read -q; then
            echo
            gh extension install github/gh-stack
            return $?
        fi

        echo
        echo "Run: gh extension install github/gh-stack"
        return 1
    }

    # `merge` and `checkout` read a bare number as a *stack* number first,
    # and a non-interactive `merge <n>` merges the whole stack at once
    function _ghs_reject_bare_number() {
        local command="$1" target="$2"
        [[ "$command" == (merge|checkout) && "$target" == <-> ]] || return 0

        printf "\033[1;31mgh stack %s %s: a bare number is read as a stack number first.\033[0m\n" "$command" "$target" >&2
        echo "Pass a branch name or a PR URL instead." >&2
        return 1
    }

    function ghs() {
        _ghs_ensure_installed || return 1
        _ghs_reject_bare_number "$1" "$2" || return 1
        gh stack "$@"
    }

    alias ghsi='ghs init'
    alias ghsa='ghs add'
    alias ghss='ghs submit'
    alias ghssr='ghs rebase'
    alias ghsm='ghs modify'
    alias ghsv='ghs view'
    alias ghsc='ghs checkout'
    alias ghsw='ghs switch'

    function ghsh() {
        echo "gh stack helpers - every alias forwards its arguments to \`gh stack\`\n"
        echo "  ghsi <branch>     init          start a stack"
        echo "  ghsa <branch>     add           add a layer on top"
        echo "  ghss              submit        open or update the PRs"
        echo "  ghssr             rebase        rebase every layer onto its parent"
        echo "  ghsm              modify        restructure the stack (interactive)"
        echo "  ghsv              view          show the stack"
        echo "  ghsc <branch>     checkout      check out a stack (a branch or PR URL, never a bare number)"
        echo "  ghsw              switch        move to another layer (interactive picker)"
        echo "  ghsst [--json]    status        review-loop snapshot of the current folder"
    }
fi
