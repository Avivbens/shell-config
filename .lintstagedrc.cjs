/**
 * @type {import('lint-staged').Config}
 */
module.exports = {
    '*.{ts,cjs,js,json}': 'npx eslint --cache --fix',
    '**/*': 'npx prettier --cache --write --ignore-unknown',
}
