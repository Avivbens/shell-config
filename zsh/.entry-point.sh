#! /usr/bin/env zsh

echo "entry point loaded"

# mvn
# source ~/.m2/.zshrc.mvn


# Autosuggest
# git clone https://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions
if [ -f ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh ]; then
  source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh
fi


# Autocomplete
# git clone https://github.com/zsh-users/zsh-completions.git ~/.zsh/zsh-completions
fpath=($HOME/.zsh/zsh-completions/src $fpath)
# rm -f ~/.zcompdump
autoload compinit


# Colored correct code
# git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.zsh/zsh-syntax-highlighting
if [ -f ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh ]; then
  source ~/.zsh/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
fi


# setopt hist_ignore_all_dups # remove older duplicate entries from history
# setopt hist_reduce_blanks # remove superfluous blanks from history items
setopt hist_ignore_dups # if you run the same command multiple times in a row, only add it to the history once
setopt extended_history # time stamp the history, and more
setopt inc_append_history # save history entries as soon as they are entered
setopt share_history # share history between different instances of the shell
setopt auto_cd # cd by typing directory name if it's not a command
setopt correct_all # autocorrect commands
setopt auto_list # automatically list choices on ambiguous completion
setopt auto_menu # automatically use menu completion
setopt always_to_end # move cursor to end if word had one match


# general
alias c="clear"
alias q="exit"
alias ..="cd .."
alias la="ls -a"
alias ll="ls -al"

# kill port process by port number
function killport(){
    lsof -i:$1 | grep LISTEN | awk '{print $2}' | xargs kill -9
}

# add ls after cd
autoload -U add-zsh-hook
add-zsh-hook -Uz chpwd (){ ls; }


function grant_permissions(){
  sudo chown -R "$USER":admin "$1"
  chmod -R 700 "$1"
}

# branches
    # Load version control information
    autoload -Uz vcs_info
    precmd() { vcs_info }

    # Format the vcs_info_msg_0_ variable
    zstyle ':vcs_info:git:*' formats '(%b)'

    # Set up the prompt (with git branch name)
    setopt PROMPT_SUBST
    PROMPT='%F{yellow}%(4~|.../%3~|%~) %F{red}: ${vcs_info_msg_0_} %F{reset_color}$ '


alias deleteallgit="rm -rf **/.git"
alias findallgit="find . -type d -name \".git\""


# vscode
alias code="/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code"
alias v="code ."
alias deleteallhistory="rm -rf **/.history"
alias findallhistory="find . -type d -name ".history""


# github-copilot-cli alias setup
eval "$(github-copilot-cli alias -- "$0")"


# mongodb
alias smongo="mongod --fork --logpath ~/mongodb/db-output.log --dbpath ~/mongodb"


# redis
alias sredis="ttab -t 'Redis Server' 'cd /tmp && redis-server'"


# Python
alias python="python3"
alias py="python3"
export PATH="$HOME/Library/Python/3.9/bin:$PATH"


# sync
alias reload="exec /bin/zsh"


# docker
# show all logs
export DOCKER_BUILDKIT=0


# Load Angular CLI autocompletion.
source <(ng completion script)



# extend
source ~/shell-config/zsh/.zshrc.extends.sh