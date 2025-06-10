#! /usr/bin/env zsh

alias python="python3"
alias py="python3"

# load pip
export PATH="$HOME/Library/Python/3.9/bin:$PATH"

function pyenv() {
  python -m venv .venv
  source .venv/bin/activate
}

function pyci() {
  pip install -r requirements.txt
}
