#! /usr/bin/env zsh

# Git Worktree helpers
# Worktrees are created as sibling dirs: <repo>@<branch>
# e.g. ~/projects/my-app → ~/projects/my-app@feat-login

# compute worktree sibling path for a branch
function _gw_path() {
    local root=$(git rev-parse --show-toplevel 2>/dev/null) || return 1
    echo "$(dirname "$root")/$(basename "$root")@${1//\//-}"
}

# detect package manager and run install
function _gw_install() {
    if [[ -f "bun.lockb" ]] || [[ -f "bun.lock" ]]; then
        bun install --frozen-lockfile
    elif [[ -f "pnpm-lock.yaml" ]]; then
        pnpm install --frozen-lockfile
    elif [[ -f "yarn.lock" ]]; then
        yarn install --frozen-lockfile
    elif [[ -f "package-lock.json" ]]; then
        npm ci
    fi
}

# interactive worktree picker (fzf or numbered list fallback)
function _gw_pick() {
    local main_wt=$(git worktree list --porcelain 2>/dev/null | head -1 | sed 's/^worktree //')
    local -a paths=() labels=()

    while IFS= read -r line; do
        local p=$(echo "$line" | awk '{print $1}')
        [[ "$p" == "$main_wt" ]] && continue
        paths+=("$p")
        labels+=("$(echo "$line" | sed 's/.*\[//' | sed 's/\]//')  $p")
    done < <(git worktree list 2>/dev/null)

    if [[ ${#paths[@]} -eq 0 ]]; then
        echo "No additional worktrees found." >&2
        return 1
    fi

    if command -v fzf &>/dev/null; then
        local sel=$(printf '%s\n' "${labels[@]}" | fzf --height=10 --prompt="worktree> ")
        [[ -z "$sel" ]] && return 1
        echo "$sel" | awk '{print $NF}'
    else
        echo "Select a worktree:" >&2
        local i=1
        for l in "${labels[@]}"; do
            printf "  \033[1;34m%d)\033[0m %s\n" "$i" "$l" >&2
            ((i++))
        done
        printf "Choice [1-%d]: " "${#paths[@]}" >&2
        local choice; read choice
        if [[ "$choice" -ge 1 && "$choice" -le ${#paths[@]} ]] 2>/dev/null; then
            echo "${paths[$choice]}"
        else
            echo "Invalid selection." >&2
            return 1
        fi
    fi
}

function gw() {
    echo "Git Worktree helpers — worktrees land at <repo>@<branch>\n"
    echo "  gwl              List all worktrees"
    echo "  gwa <branch>     Add worktree for existing branch"
    echo "  gwn <branch>     New branch + worktree"
    echo "  gwr [branch]     Remove worktree (picker if no arg)"
    echo "  gwcd [branch]    Navigate to worktree (picker if no arg)"
    echo ""
    echo "Flags:  -i  auto-install deps   -c  open VS Code"
}

alias gwl="git worktree list"

# add worktree for an existing branch
# usage: gwa <branch> [-i] [-c]
function gwa() {
    local -a opts_i opts_c
    zparseopts -D -E i=opts_i c=opts_c

    local branch="$1"
    [[ -z "$branch" ]] && echo "Usage: gwa <branch> [-i] [-c]" && return 1

    local wt_path=$(_gw_path "$branch") || return 1
    [[ -d "$wt_path" ]] && echo "Already exists, use: gwcd $branch" && return 1

    git worktree add "$wt_path" "$branch" || return 1
    cd "$wt_path"

    [[ -n "$opts_i" ]] && _gw_install
    [[ -n "$opts_c" ]] && code .
}

# create new branch + worktree
# usage: gwn <branch> [base] [-i] [-c]
function gwn() {
    local -a opts_i opts_c
    zparseopts -D -E i=opts_i c=opts_c

    local branch="$1" base="${2:-HEAD}"
    [[ -z "$branch" ]] && echo "Usage: gwn <branch> [base] [-i] [-c]" && return 1

    git show-ref --verify --quiet "refs/heads/$branch" 2>/dev/null && echo "Branch '$branch' already exists. Use gwa." && return 1

    local wt_path=$(_gw_path "$branch") || return 1
    git worktree add -b "$branch" "$wt_path" "$base" || return 1
    cd "$wt_path"

    [[ -n "$opts_i" ]] && _gw_install
    [[ -n "$opts_c" ]] && code .
}

# remove a worktree
# usage: gwr [branch]
function gwr() {
    local wt_path
    if [[ -n "$1" ]]; then
        wt_path=$(_gw_path "$1") || return 1
        [[ ! -d "$wt_path" ]] && echo "Worktree not found at: $wt_path" && return 1
    else
        wt_path=$(_gw_pick) || return 1
    fi

    local branch=$(git worktree list --porcelain 2>/dev/null | grep -A2 "^worktree $wt_path$" | grep '^branch ' | sed 's|^branch refs/heads/||')

    printf "\033[1;33mRemove worktree at %s? [y/N]\033[0m " "$wt_path"
    read -q || { echo; return 0; }
    echo

    # cd out if we're inside the worktree being removed
    if [[ "$(pwd -P)" == "$wt_path"* ]]; then
        cd "$(git worktree list --porcelain 2>/dev/null | head -1 | sed 's/^worktree //')"
    fi

    git worktree remove --force "$wt_path" || return 1
    git worktree prune

    if [[ -n "$branch" ]]; then
        printf "\033[1;33mAlso delete branch '%s'? [y/N]\033[0m " "$branch"
        read -q && { echo; git branch -D "$branch"; } || echo
    fi
}

# navigate to a worktree
# usage: gwcd [branch]
function gwcd() {
    if [[ -n "$1" ]]; then
        local wt_path=$(_gw_path "$1")
        [[ -d "$wt_path" ]] && cd "$wt_path" && return 0
        echo "No worktree for '$1'."
        return 1
    fi

    local picked=$(_gw_pick) || return 1
    cd "$picked"
}

# tab completions
function _gw_complete_branches() {
    _describe 'branch' "($(git branch --format='%(refname:short)' 2>/dev/null))"
}
function _gw_complete_worktrees() {
    local main_wt=$(git worktree list --porcelain 2>/dev/null | head -1 | sed 's/^worktree //')
    local -a wt=()
    while IFS= read -r line; do
        local p=$(echo "$line" | awk '{print $1}')
        [[ "$p" != "$main_wt" ]] && wt+=("$(echo "$line" | sed 's/.*\[//' | sed 's/\]//')")
    done < <(git worktree list 2>/dev/null)
    _describe 'worktree' wt
}
compdef _gw_complete_branches gwa gwn
compdef _gw_complete_worktrees gwr gwcd
