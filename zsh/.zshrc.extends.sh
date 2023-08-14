#! /usr/bin/env zsh

echo "extends loaded"

source ~/shell-config/zsh/.zshrc.extends.git.sh
source ~/shell-config/zsh/.zshrc.extends.work.sh
source ~/shell-config/zsh/.zshrc.extends.npm.sh
source ~/shell-config/zsh/.zshrc.extends.angular.sh
source ~/shell-config/zsh/.zshrc.extends.nest.sh
source ~/shell-config/zsh/.zshrc.extends.private.sh

# for file in $(ls -a | grep -e ".*\.sh"); do
#     echo "source ~/shell-config/zsh/.$file"
#     source ~/shell-config/zsh/${file}
# done
