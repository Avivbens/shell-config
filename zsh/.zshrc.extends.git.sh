#! /usr/bin/env zsh

echo "extends.git.sh loaded"

alias gl="git log"
alias gd="git diff"
alias gs="git status"
alias ga="git add ."
alias gc="git commit -m"
alias gcm="git commit --no-edit"
alias gp="git push"
alias gch="git checkout"
alias gcb="git checkout -b"
alias gcp="git cherry-pick"
alias gb="git branch -a"
alias gpu="git pull"
alias gm="git merge"
alias gf="git fetch"
alias gr="git rebase"
alias gunlast="git reset --soft HEAD~1"
alias pq="pretty-quick --staged"

function gmd(){
    git pull
    git merge origin/dev
}

# stop git from tracking a file
function gstrack(){
    git update-index --assume-unchanged $1
}

# resume tracking for a file
function grtrack(){
    git update-index --no-assume-unchanged $1
}

# get few files from another commit OR branch
function gchmany(){
    # 2 is offset
    for i in ${@:2}
    do
        gch $1 $i $i
    done
}

# variable is the workspace name (personal / work)
function swgit(){
    ln -f ~/.gitconfig.$1 ~/.gitconfig
    reload
}

function rename_author(){
    git rebase -r $1 \
    --exec 'git commit --amend --no-edit --reset-author'
}

function replace_author(){
    look_for_email="$1"
    replacement_email="$2"
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
function clonets(){
    git clone $1
    # enter the directory
    cd $(basename $_ .git)
    code .
    npm ci
}

# remove all local branches but the master
alias grab="git branch | egrep -v 'master|staging' | xargs git branch -D"

git config --global push.autoSetupRemote true

# show current email config
echo "\nCurrent git email config:"
git config --global -l | grep 'email'
echo "\n"

# show current npmrc config
npmrc
echo "\n"