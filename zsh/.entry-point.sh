#! /usr/bin/env zsh

echo "entry point loaded"

export TERMINAL_INSTANCE_ID=$(date +%s)

source "$HOME/shell-config/zsh/.utils.sh"


# compinit and completions
autoload -Uz compinit
compinit

# Homebrew paths
BROW="/usr/local/Homebrew/bin/brew"
BREW="/opt/homebrew/bin/brew"

# support brew formulaes installed via Rosetta 2
alias brow="arch --x86_64 $BROW"

export BREW_PERFIX=$(brew --prefix)
export BROW_PERFIX=$(brow --prefix)

# load all homebrew paths - brow
if [ -f "$BROW" ]; then
    eval "$($BROW shellenv)"
fi

# load all homebrew paths - brew
if [ -f "$BREW" ]; then
    eval "$($BREW shellenv)"
fi

# NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$BREW_PERFIX/opt/nvm/nvm.sh" ] && \. "$BREW_PERFIX/opt/nvm/nvm.sh"                                       # This loads nvm
[ -s "$BREW_PERFIX/opt/nvm/etc/bash_completion.d/nvm" ] && \. "$BREW_PERFIX/opt/nvm/etc/bash_completion.d/nvm" # This loads nvm bash_completion

# ----- shell-config -----
export PATH="$HOME/shell-config/executable:$PATH"
cache_completion "shell-config completion-script" "shell-config" 120

function shell-doctor() {
    chmod -R 755 $(compaudit)
    autoload -Uz compinit
    grant_permissions "$HOME/shell-config/zsh"
    grant_permissions "$HOME/shell-config/executable"
    grant_permissions "$HOME/shell-config/downloads"
    grant_permissions "$HOME/shell-config/assets"
}

# check if need to fix compaudit
if compaudit | grep -q .; then
    printf "\n\033[1;33mWARNING: shell-config permissions are not correct, fixing...\033[0m\n"
    shell-doctor
fi

# fix permissions if needed
if find $HOME/shell-config/zsh -type d ! -perm 770 -print -quit | grep -q .; then
    echo -e "\n\033[1;33mWARNING: shell-config permissions & initialization are not correct, fixing...\033[0m\n"
    shell-doctor
    shell-config init
    shell-doctor
fi

# check for shell-config updates once in 10 times
if [ $((RANDOM % 10)) -eq 0 ]; then
    silent_background shell-config update -m
fi
# ----- shell-config -----


# if google-cloud-sdk installed via Homebrew
sourceIf "$BREW_PERFIX/share/google-cloud-sdk/path.zsh.inc"
sourceIf "$BREW_PERFIX/share/google-cloud-sdk/completion.zsh.inc"

# if google-cloud-sdk installed via Homebrew legacy
sourceIf "$BROW_PERFIX/share/google-cloud-sdk/path.zsh.inc"
sourceIf "$BROW_PERFIX/share/google-cloud-sdk/completion.zsh.inc"

# Autosuggest
sourceIf "$BREW_PERFIX/share/zsh-autosuggestions/zsh-autosuggestions.zsh"
sourceIf "$BROW_PERFIX/share/zsh-autosuggestions/zsh-autosuggestions.zsh"

# Autocomplete
# only if zsh-completions installed via Homebrew
if [ -f "$BREW_PERFIX/share/zsh-completions" ]; then
    FPATH="$BREW_PERFIX/share/zsh-completions:$FPATH"
fi

# only if zsh-completions installed via legacy Homebrew
if [ -f "$BROW_PERFIX/share/zsh-completions" ]; then
    FPATH=$BROW_PERFIX/share/zsh-completions:$FPATH
fi

# Colored correct code
sourceIf "$BREW_PERFIX/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh"
sourceIf "$BROW_PERFIX/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh"

# setopt hist_ignore_all_dups # remove older duplicate entries from history
# setopt hist_reduce_blanks # remove superfluous blanks from history items
setopt hist_ignore_dups   # if you run the same command multiple times in a row, only add it to the history once
setopt extended_history   # time stamp the history, and more
setopt inc_append_history # save history entries as soon as they are entered
setopt share_history      # share history between different instances of the shell
setopt auto_cd            # cd by typing directory name if it's not a command
setopt correct_all        # autocorrect commands
setopt auto_list          # automatically list choices on ambiguous completion
setopt auto_menu          # automatically use menu completion
setopt always_to_end      # move cursor to end if word had one match
setopt autopushd          # save directory stack

if command -v mcfly &>/dev/null; then
    eval "$(mcfly init zsh)"
fi

if command -v zoxide &>/dev/null; then
    eval "$(zoxide init zsh)"
    alias cd="z"
fi

if command -v bat &>/dev/null; then
    export BAT_THEME="TwoDark"
    alias cat="bat"
fi


# general
alias c="clear"
alias q="exit"
alias ..="cd .."
alias la="ls -a"
alias sizeof="du -sh"

# check if eza installed
if command -v eza &>/dev/null; then
    alias ll="eza --long --header --icons --git"
else
    alias ll="ls -al"
fi

# kill port process by port number
function killport() {
    lsof -i:$1 | grep LISTEN | awk '{print $2}' | xargs kill -9
}

# add ls after cd
autoload -U add-zsh-hook
add-zsh-hook -Uz chpwd (){ ls; }

# sync
alias reload="exec /bin/zsh"

# extend
sourceIf "$HOME/shell-config/zsh/.zshrc.extends.sh"
