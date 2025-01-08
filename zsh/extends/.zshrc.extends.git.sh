#! /usr/bin/env zsh

# depends on zsh/extends/.zshrc.extends.vscode.sh
source "$HOME/shell-config/zsh/extends/.zshrc.extends.vscode.sh"

alias gl="git log"
alias gd="git diff"
alias gs="git status --ahead-behind"
alias ga="git add ."
alias gc="git commit -m"
alias gcm="git commit --no-edit"
alias gp="git push"
alias gch="git checkout"
alias gcb="git checkout -b"
alias gcp="git cherry-pick"
alias gb="git branch"
alias gba="git branch -a"
alias gpu="git pull"
alias gm="git merge"
alias gf="git fetch"
alias gr="git rebase"
alias gunlast="git reset --soft HEAD~1"
alias gprune="git remote prune origin"

alias gss="git stash"
alias gsp="git stash pop"

# setup less to fit with git log, in order to search and see the hash of the commit
# set the number of padding lines to 15
export LESS="-FXRSj15"

function gmd() {
    git pull
    git merge origin/dev
}

# stop git from tracking a file
function gstrack() {
    git update-index --assume-unchanged $1
}

# resume tracking for a file
function grtrack() {
    git update-index --no-assume-unchanged $1
}

# get few files from another commit OR branch
function gchmany() {
    # 2 is offset
    for i in ${@:2}; do
        gch $1 $i $i
    done
}

# switch the current git config to the one specified
function swgit() {
    # if no parameter in, print the content of the folder
    if [ $# -eq 0 ]; then
        ls -1 $HOME/.gitprofiles
        return
    fi

    # check if the file exists
    if [ ! -f "$HOME/.gitprofiles/$1" ]; then
        echo "Git config named '$1' does not exist."
        ls -1 $HOME/.gitprofiles
        return
    fi

    ln -fs "$HOME/.gitprofiles/$1" "$HOME/.gitconfig"
    reload
}

# rename author of commits to the current user under git config
function rename_author() {
    git rebase -r $1 \
        --exec 'git commit --amend --no-edit --reset-author'
}

function replace_author() {
    local look_for_email="$1"
    local replacement_email="$2"
    git filter-branch -f --env-filter "
        if [ \"\$GIT_COMMITTER_EMAIL\" = \"$look_for_email\" ]; then
            export GIT_COMMITTER_EMAIL=\"$replacement_email\"
        fi
        if [ \"\$GIT_AUTHOR_EMAIL\" = \"$look_for_email\" ]; then
            export GIT_AUTHOR_EMAIL=\"$replacement_email\"
        fi
    " -- --branches --tags
}

# 1 - repo to clone
# 2 - current repo name
# 3 - change to name
function copy_init() {
    git clone $1 folder
    mv folder $2
    cd $2
    rm -rf .git
    git init
    git branch -M master

    code .
}

# 1 - repo to clone
function clonets() {
    git clone $1
    # enter the directory
    cd $(basename $_ .git)
    code .
    npm ci
}

# remove all local branches but the master & staging
alias grab="git branch | egrep -v 'master|staging' | xargs git branch -D"

# show current email config
echo "\nCurrent git email config:"
git config --global -l | grep 'email'
echo "\n"

# show current npmrc config
if command -v npmrc &>/dev/null; then
    npmrc
fi

echo "\n"
