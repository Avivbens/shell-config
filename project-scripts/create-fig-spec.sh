npm run build

srcDir="./.fig/autocomplete/src"
touch "$srcDir/shell-config.ts"

node ./dist/main.js generate-fig-spec > "$srcDir/shell-config.ts"

echo "Fig spec created at $srcDir/shell-config.ts"

npm --prefix ./.fig/autocomplete run build
