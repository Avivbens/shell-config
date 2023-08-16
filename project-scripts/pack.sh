rm -rf dist
rm -rf bin

npm run build

version=$(node -p "require('./package.json').version || 'unknown-version'")
echo "version: $version"
pkg . --output "bin/cli-v$version"