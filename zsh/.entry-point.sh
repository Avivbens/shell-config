#! /usr/bin/env zsh

echo "entry point loaded"

function sourceIf(){
  if [ -f "$1" ]; then
    source $1
  fi
}

# load all homebrew paths
eval "$(/opt/homebrew/bin/brew shellenv)"


# NVM
export NVM_DIR="$HOME/.nvm"
    [ -s "$(brew --prefix)/opt/nvm/nvm.sh" ] && \. "$(brew --prefix)/opt/nvm/nvm.sh" # This loads nvm
    [ -s "$(brew --prefix)/opt/nvm/etc/bash_completion.d/nvm" ] && \. "$(brew --prefix)/opt/nvm/etc/bash_completion.d/nvm" # This loads nvm bash_completion


# if google-cloud-sdk installed manually via download
sourceIf "$HOME/Downloads/google-cloud-sdk/path.zsh.inc"
sourceIf "$HOME/Downloads/google-cloud-sdk/completion.zsh.inc"

# if google-cloud-sdk installed via Homebrew
sourceIf "$(brew --prefix)/share/google-cloud-sdk/path.zsh.inc"
sourceIf "$(brew --prefix)/share/google-cloud-sdk/completion.zsh.inc"


# Autosuggest
# git clone https://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions
sourceIf "$HOME/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh"


# Autocomplete
# git clone https://github.com/zsh-users/zsh-completions.git ~/.zsh/zsh-completions
fpath=($HOME/.zsh/zsh-completions/src $fpath)
# rm -f ~/.zcompdump


# load compinit as a function on an exported path to avoid overlapping with other compinit commands
autoload -Uz compinit
# toggle ON completions with tab key
compinit


# Colored correct code
# git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.zsh/zsh-syntax-highlighting
sourceIf "$HOME/.zsh/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh"


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


function grant_permissions(){
    sudo chown -R "$USER":admin "$1"
    chmod -R 770 "$1"
}


# shell-config CLI
export PATH="$HOME/shell-config/executable:$PATH"
source <(shell-config completion-script)
function shell-doctor(){
    grant_permissions "$HOME/shell-config"
}

# fix permissions if needed
if find $HOME/shell-config/zsh -type d ! -perm 770 -print -quit | grep -q .; then
    echo -e "\n\033[1;33mWARNING: shell-config permissions are not correct, fixing...\033[0m\n"
    shell-doctor
fi

# check for shell-config updates once in 10 times
silent_background() {
    { 2>&3 "$@"& } 3>&2 2>/dev/null
    disown &>/dev/null  # Prevent whine if job has already completed
}
if [ $((RANDOM % 10)) -eq 0 ]; then
    silent_background shell-config update -m
fi


if command -v mcfly &> /dev/null
then
    eval "$(mcfly init zsh)"
fi


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


# branches
    # Load version control information
    autoload -Uz vcs_info
    precmd() { vcs_info }

    # Format the vcs_info_msg_0_ variable
    zstyle ':vcs_info:git:*' formats '(%b)'

    # Set up the prompt (with git branch name)
    setopt PROMPT_SUBST
    PROMPT='%F{yellow}%(4~|.../%3~|%~) %F{red}: ${vcs_info_msg_0_} %F{reset_color}$ '


# vscode
alias code="/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code"
alias v="code ."


# github-copilot-cli alias setup
if command -v github-copilot-cli &> /dev/null
then
    eval "$(github-copilot-cli alias -- "$0")"
fi

# sync
alias reload="exec /bin/zsh"


# docker
# show all logs
export DOCKER_BUILDKIT=0


# extend
sourceIf "$HOME/shell-config/zsh/.zshrc.extends.sh"
