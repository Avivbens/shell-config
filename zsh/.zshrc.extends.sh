#! /usr/bin/env zsh

echo "extends loaded"

source ~/shell-config/zsh/extends/.zshrc.extends.git.sh
source ~/shell-config/zsh/extends/.zshrc.extends.work.sh
source ~/shell-config/zsh/extends/.zshrc.extends.npm.sh
source ~/shell-config/zsh/extends/.zshrc.extends.angular.sh
source ~/shell-config/zsh/extends/.zshrc.extends.nest.sh
source ~/shell-config/zsh/extends/.zshrc.extends.private.sh

# for file in $(ls -a | grep -e ".*\.sh"); do
#     echo "source ~/shell-config/extends/zsh/.$file"
#     source ~/shell-config/zsh/${file}
# done
