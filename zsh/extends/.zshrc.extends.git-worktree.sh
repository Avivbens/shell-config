#! /usr/bin/env zsh

# Git worktree helpers
# Every worktree is a sibling folder of the main checkout, named <repo>@<name>:
#   ~/projects/my-app  ->  ~/projects/my-app@feat-login     one branch  (gwa, gwn)
#                      ->  ~/projects/my-app@payments-api   one stack   (gws)

# ---------- helpers ----------

# the main checkout, even when called from inside a worktree
function _gw_main_root() {
    git worktree list --porcelain 2>/dev/null | head -1 | sed 's/^worktree //'
}

# sibling path for a worktree name; a branch's slashes become dashes
function _gw_path() {
    local main_root=$(_gw_main_root)
    if [[ -z "$main_root" ]]; then
        echo "Not inside a git repository." >&2
        return 1
    fi

    echo "${main_root:h}/${main_root:t}@${1//\//-}"
}

# the name a worktree was created under: its folder without the "<repo>@" prefix
function _gw_name() {
    local main_root=$(_gw_main_root)
    echo "${${1:t}#${main_root:t}@}"
}

# the repo's default branch, where new stacks start
function _gw_trunk() {
    local trunk=$(git symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null)
    if [[ -n "$trunk" ]]; then
        echo "${trunk#origin/}"
        return 0
    fi

    if git show-ref --verify --quiet refs/heads/main; then
        echo main
    else
        echo master
    fi
}

# every worktree except the main checkout, as "path<TAB>name<TAB>branch" lines
function _gw_list() {
    local main_root=$(_gw_main_root) wt_path="" branch="" line
    { git worktree list --porcelain 2>/dev/null; echo; } | while IFS= read -r line; do
        case "$line" in
            "worktree "*)
                wt_path="${line#worktree }"
                branch="detached"
                ;;
            "branch refs/heads/"*)
                branch="${line#branch refs/heads/}"
                ;;
            "")
                if [[ -n "$wt_path" && "$wt_path" != "$main_root" ]]; then
                    printf '%s\t%s\t%s\n' "$wt_path" "$(_gw_name "$wt_path")" "$branch"
                fi
                wt_path=""
                ;;
        esac
    done
}

# interactive worktree picker (fzf, or a numbered list); prints the chosen paths, one per line
# usage: _gw_pick [-m]   (-m allows picking several)
function _gw_pick() {
    local multi="$1"
    local -a rows=("${(@f)$(_gw_list)}")
    rows=(${rows:#})
    if (( ${#rows} == 0 )); then
        echo "No additional worktrees found." >&2
        return 1
    fi

    local -a paths=() labels=()
    local row
    for row in "${rows[@]}"; do
        local -a cols=("${(@ps:\t:)row}")
        paths+=("${cols[1]}")
        labels+=("${cols[2]}  (${cols[3]})")
    done

    if command -v fzf &>/dev/null; then
        local -a fzf_opts=(--height=40% --reverse --delimiter=$'\t' --with-nth=1 --prompt="worktree> ")
        if [[ "$multi" == "-m" ]]; then
            fzf_opts+=(--multi --prompt="worktrees (TAB to mark, ENTER to confirm)> ")
        fi

        local i picked
        picked=$(for i in {1..${#paths}}; do printf '%s\t%s\n' "${labels[$i]}" "${paths[$i]}"; done | fzf "${fzf_opts[@]}")
        if [[ -z "$picked" ]]; then
            return 1
        fi

        echo "$picked" | cut -f2
        return 0
    fi

    echo "Select worktree(s):" >&2
    local i
    for i in {1..${#paths}}; do
        printf "  \033[1;34m%d)\033[0m %s\n" "$i" "${labels[$i]}" >&2
    done

    local prompt="Choice [1-${#paths}]: "
    if [[ "$multi" == "-m" ]]; then
        prompt="Choice (e.g. '1 3', or 'all') [1-${#paths}]: "
    fi
    printf "%s" "$prompt" >&2
    local input
    read input

    if [[ "$multi" == "-m" && "$input" == "all" ]]; then
        printf '%s\n' "${paths[@]}"
        return 0
    fi

    local -a chosen=()
    local choice
    for choice in ${(s: :)${input//,/ }}; do
        if [[ "$choice" == <-> ]] && (( choice >= 1 && choice <= ${#paths} )); then
            chosen+=("${paths[$choice]}")
        fi
    done

    if (( ${#chosen} == 0 )) || [[ "$multi" != "-m" && ${#chosen} -gt 1 ]]; then
        echo "Invalid selection." >&2
        return 1
    fi

    printf '%s\n' "${chosen[@]}"
}

# after creating a worktree: install deps (-i) and open VS Code (-c) when asked
function _gw_setup() {
    local install="$1" open_code="$2"
    if [[ -n "$install" ]]; then
        pm_install
    fi

    if [[ -n "$open_code" ]]; then
        code .
    fi

    return 0
}

# prefer the github module's `ghs`, which refuses bare-number targets
function _gw_gh_stack() {
    if (( $+functions[ghs] )); then
        ghs "$@"
    else
        gh stack "$@"
    fi
}

# a branch whose every commit already landed on the trunk - also true after a rebase merge,
# where the trunk holds rewritten copies and `git branch -d` would refuse
function _gw_is_landed() {
    local branch="$1" trunk="$2"
    if [[ "$branch" == "$trunk" ]]; then
        return 1
    fi

    local upstream="$trunk"
    if git show-ref --verify --quiet "refs/remotes/origin/$trunk"; then
        upstream="origin/$trunk"
    fi

    ! git cherry "$upstream" "$branch" 2>/dev/null | grep -q '^+'
}

# ---------- commands ----------

function gw() {
    echo "Git worktree helpers - worktrees land at <repo>@<name>\n"
    echo "  gwl                        List all worktrees"
    echo "  gwa <branch>               Add a worktree for an existing branch"
    echo "  gwn <branch> [base]        New branch + worktree"
    echo "  gws <stack> <branch>       Folder for a whole stack: opens an existing stack, or starts one from the trunk"
    echo "  gwr [name]                 Remove worktree(s), asking before dropping changes or branches"
    echo "  gwcd [name]                Go to a worktree (picker if no name)"
    echo ""
    echo "Flags:  -i  install deps   -c  open VS Code"
}

alias gwl="git worktree list"

# add a worktree for an existing branch
# usage: gwa <branch> [-i] [-c]
function gwa() {
    local -a opt_install opt_code
    zparseopts -D -E i=opt_install c=opt_code

    local branch="$1"
    if [[ -z "$branch" ]]; then
        echo "Usage: gwa <branch> [-i] [-c]"
        return 1
    fi

    local wt_path
    wt_path=$(_gw_path "$branch") || return 1
    if [[ -d "$wt_path" ]]; then
        echo "Already exists, use: gwcd ${branch//\//-}"
        return 1
    fi

    git worktree add "$wt_path" "$branch" || return 1
    cd "$wt_path" || return 1
    _gw_setup "$opt_install" "$opt_code"
}

# create a new branch + worktree
# usage: gwn <branch> [base] [-i] [-c]
function gwn() {
    local -a opt_install opt_code
    zparseopts -D -E i=opt_install c=opt_code

    local branch="$1" base="${2:-HEAD}"
    if [[ -z "$branch" ]]; then
        echo "Usage: gwn <branch> [base] [-i] [-c]"
        return 1
    fi

    if git show-ref --verify --quiet "refs/heads/$branch"; then
        echo "Branch '$branch' already exists. Use gwa."
        return 1
    fi

    local wt_path
    wt_path=$(_gw_path "$branch") || return 1
    git worktree add -b "$branch" "$wt_path" "$base" || return 1
    cd "$wt_path" || return 1
    _gw_setup "$opt_install" "$opt_code"
}

# a folder for a whole stack, on one of its branches - `gh stack` refuses to run on a detached HEAD
# an existing branch (local, or on origin only) opens that stack; a new name starts one from the trunk
# usage: gws <stack-name> <branch> [-i] [-c]
function gws() {
    local -a opt_install opt_code
    zparseopts -D -E i=opt_install c=opt_code

    local name="$1" branch="$2"
    if [[ -z "$name" || -z "$branch" ]]; then
        echo "Usage: gws <stack-name> <branch> [-i] [-c]"
        return 1
    fi

    local wt_path
    wt_path=$(_gw_path "$name") || return 1
    if [[ -d "$wt_path" ]]; then
        echo "Already exists, use: gwcd $name"
        return 1
    fi

    if git show-ref --verify --quiet "refs/heads/$branch" || git show-ref --verify --quiet "refs/remotes/origin/$branch"; then
        git worktree add "$wt_path" "$branch" || return 1
        cd "$wt_path" || return 1
        _gw_gh_stack checkout "$branch" || return 1
    else
        git worktree add -b "$branch" "$wt_path" "$(_gw_trunk)" || return 1
        cd "$wt_path" || return 1
        _gw_gh_stack init "$branch" || return 1
    fi

    _gw_setup "$opt_install" "$opt_code"
}

# remove one or more worktrees; uncommitted changes and unlanded branches are never dropped without asking
# usage: gwr [name]   (multi-select picker if no name)
function gwr() {
    local -a wt_paths
    if [[ -n "$1" ]]; then
        local one
        one=$(_gw_path "$1") || return 1
        if [[ ! -d "$one" ]]; then
            echo "Worktree not found at: $one"
            return 1
        fi
        wt_paths=("$one")
    else
        local picked
        picked=$(_gw_pick -m) || return 1
        wt_paths=("${(@f)picked}")
    fi

    local wt_path
    printf "\033[1;33mRemove %d worktree(s):\033[0m\n" "${#wt_paths}"
    for wt_path in "${wt_paths[@]}"; do
        local count=$(git -C "$wt_path" status --porcelain 2>/dev/null | wc -l | tr -d ' ')
        if (( count > 0 )); then
            printf "  %s  \033[1;31m(%d uncommitted)\033[0m\n" "$wt_path" "$count"
        else
            printf "  %s\n" "$wt_path"
        fi
    done

    printf "\033[1;33mProceed? [y/N]\033[0m "
    if ! read -q; then
        echo
        return 0
    fi
    echo

    local main_root=$(_gw_main_root) trunk=$(_gw_trunk)
    local -a freed=()
    for wt_path in "${wt_paths[@]}"; do
        local branch=$(git -C "$wt_path" branch --show-current 2>/dev/null)
        local changes=$(git -C "$wt_path" status --porcelain 2>/dev/null)
        local -a force=()

        if [[ -n "$changes" ]]; then
            printf "\033[1;31m%s has uncommitted changes:\033[0m\n" "$wt_path"
            echo "$changes" | sed 's/^/    /'
            printf "\033[1;33mDiscard them and remove it? [y/N]\033[0m "
            if ! read -q; then
                echo
                echo "  kept $wt_path"
                continue
            fi
            echo
            force=(--force)
        fi

        # step out first when standing inside the worktree being removed
        if [[ "$(pwd -P)" == "${wt_path:A}"* ]]; then
            cd "$main_root"
        fi

        if git worktree remove "${force[@]}" "$wt_path"; then
            printf "  \033[1;32m✓\033[0m removed %s\n" "$wt_path"
            if [[ -n "$branch" ]]; then
                freed+=("$branch")
            fi
        else
            printf "  \033[1;31m✗\033[0m failed to remove %s\n" "$wt_path"
        fi
    done

    git worktree prune

    local -a landed=()
    local b
    for b in "${freed[@]}"; do
        if _gw_is_landed "$b" "$trunk"; then
            landed+=("$b")
        fi
    done

    local -a unlanded=(${freed:|landed})
    if (( ${#unlanded} )); then
        echo "Kept branch(es) not yet on $trunk: ${unlanded[*]}"
    fi

    if (( ${#landed} )); then
        printf "\033[1;33mDelete %d branch(es) already on %s: %s? [y/N]\033[0m " "${#landed}" "$trunk" "${landed[*]}"
        if read -q; then
            echo
            git branch -D "${landed[@]}"
        else
            echo
        fi
    fi

    return 0
}

# go to a worktree
# usage: gwcd [name]   (picker if no name)
function gwcd() {
    if [[ -z "$1" ]]; then
        local picked
        picked=$(_gw_pick) || return 1
        cd "$picked"
        return
    fi

    local wt_path
    wt_path=$(_gw_path "$1") || return 1
    if [[ ! -d "$wt_path" ]]; then
        echo "No worktree named '$1'."
        return 1
    fi

    cd "$wt_path"
}

# ---------- tab completion ----------

function _gw_complete_branches() {
    _describe 'branch' "($(git branch --format='%(refname:short)' 2>/dev/null))"
}

function _gw_complete_worktrees() {
    local -a names=(${(f)"$(_gw_list | cut -f2)"})
    _describe 'worktree' names
}

# compdef exists only once completion is loaded (compinit); skip it in shells that never load it
if (( $+functions[compdef] )); then
    compdef _gw_complete_branches gwa gwn gws
    compdef _gw_complete_worktrees gwr gwcd
fi
