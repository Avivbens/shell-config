import jsonc from 'eslint-plugin-jsonc'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import unusedImports from 'eslint-plugin-unused-imports'
import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'
import js from '@eslint/js'
import vitest from '@vitest/eslint-plugin'

export default defineConfig([
    globalIgnores(['dist/', 'docs/', 'project-scripts/', 'commitlint.config.js']),
    {
        files: ['**/*.ts'],
        extends: [js.configs.recommended, tseslint.configs.recommended],
        plugins: { 'unused-imports': unusedImports },
        languageOptions: {
            parserOptions: { project: './tsconfig.json', tsconfigRootDir: import.meta.dirname },
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/no-deprecated': 'warn',
            '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
            'unused-imports/no-unused-imports': 'error',
        },
    },
    {
        files: ['**/*.spec.ts'],
        extends: [vitest.configs.recommended],
    },
    jsonc.configs['recommended-with-jsonc'],
    // must stay last: it disables the stylistic rules of the configs above
    prettierRecommended,
    { rules: { 'prettier/prettier': ['error', { endOfLine: 'auto' }] } },
])
