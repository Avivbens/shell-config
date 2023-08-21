#! /usr/bin/env zsh

echo "extends loaded"

function sourceIf(){
  if [ -f "$1" ]; then
    source $1
  fi
}

sourceIf "$HOME/shell-config/zsh/extends/.zshrc.extends.work.sh"
sourceIf "$HOME/shell-config/zsh/extends/.zshrc.extends.npm.sh"
sourceIf "$HOME/shell-config/zsh/extends/.zshrc.extends.angular.sh"
sourceIf "$HOME/shell-config/zsh/extends/.zshrc.extends.nest.sh"
sourceIf "$HOME/shell-config/zsh/extends/.zshrc.extends.mongo.sh"
sourceIf "$HOME/shell-config/zsh/extends/.zshrc.extends.python.sh"
sourceIf "$HOME/shell-config/zsh/extends/.zshrc.extends.redis.sh"
sourceIf "$HOME/shell-config/zsh/extends/.zshrc.extends.git.sh"

# for file in $(ls -a | grep -e ".*\.sh"); do
#     echo "source ~/shell-config/extends/zsh/.$file"
#     source ~/shell-config/zsh/${file}
# done
