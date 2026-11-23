#! /usr/bin/env zsh

alias python="python3"
alias py="python3"

# load pip
path=($HOME/Library/Python/*/bin(N/) $path)

# named pyvenv so the real pyenv tool is not hidden
function pyvenv() {
  python -m venv .venv
  source .venv/bin/activate
}

# Homebrew ships no bare pip, and inside a venv this is still the venv's pip
function pyci() {
  python3 -m pip install -r requirements.txt
}
