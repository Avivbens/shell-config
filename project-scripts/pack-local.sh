npm run pack $(jq -r .version package.json)

cp -f ./bin/cli-v* ./executable/shell-config