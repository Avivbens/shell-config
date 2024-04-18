import { exec } from 'node:child_process'
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { promisify } from 'node:util'
import type { LoggerService } from '../services/logger.service'

/**
 * @param currentDirectory - __dirname
 * @param assetPath - path to asset relative to this project root
 * @returns - The bundled asset path
 */
export const resolveBundledAsset = (currentDirectory: string, assetPath: string): string => {
    const projectRoot = 'shell-config/'
    const currentFileRelative = currentDirectory.split(projectRoot).at(-1)
    const currentFileDepth = currentFileRelative.split('/').length
    const asset = resolve(currentDirectory, '../'.repeat(currentFileDepth), assetPath)

    return asset
}

/**
 * Copy bundled asset to target directory, support directories and files
 * @param path - path to asset relative to this project root, use {@link resolveBundledAsset}
 * @param target - path to copy asset to
 */
export async function copyBundledAsset(path: string, target: string, logger: LoggerService, round = 0) {
    try {
        const isDir = (await stat(path)).isDirectory()
        if (!isDir) {
            const content = await readFile(path)
            return writeFile(target, content, { mode: 0o770 })
        }

        await mkdir(target, { recursive: true }).catch(() => {})
        const children = await readdir(path)
        await Promise.all(
            children.map((child) => copyBundledAsset(resolve(path, child), resolve(target, child), logger, round + 1)),
        )
    } catch (error) {
        round === 0 && logger.error(`Failed copyBundledAsset, error: ${error.stack}`)
        throw error
    }
}

export const execPromise = promisify(exec)

export const TELL_TERMINAL_EXECUTE_SCRIPT = (script: string) => `
osascript -e '
    tell application "Terminal"
        set newTab to do script ""
        delay 1
        set currentTab to do script "${script}"
    end tell
'
`
