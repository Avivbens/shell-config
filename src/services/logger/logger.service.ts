import { accessSync, constants, mkdirSync } from 'node:fs'
import { appendFile } from 'node:fs/promises'
import { homedir, tmpdir } from 'node:os'
import { resolve } from 'node:path'
import { BASE_PATH, BOOTSTRAP_UUID, PACKAGE_VERSION } from '@common/constants'
import { Injectable, Scope } from '@nestjs/common'
import { COLORS_CONFIG, Color } from './logger.config'

/**
 * Resolve a writable directory for the log file, computed once at module load.
 *
 * The primary location lives under the shell-config base dir, but an earlier elevated (sudo /
 * BeyondTrust) run can leave it owned by root and unwritable for a normal user — which would
 * otherwise make every log line silently vanish. Fall back to the per-user macOS logs dir, then the
 * temp dir, so logging always lands somewhere the current user can write.
 */
const resolveLogDir = (): string => {
    const candidates = [
        `${BASE_PATH}/logs`,
        resolve(homedir(), 'Library/Logs/shell-config'),
        resolve(tmpdir(), 'shell-config'),
    ]

    for (const dir of candidates) {
        try {
            mkdirSync(dir, { recursive: true })
            accessSync(dir, constants.W_OK)
            return dir
        } catch {
            /** Not writable (e.g. root-owned from an elevated run) — try the next candidate. */
        }
    }

    return candidates[0]
}

const LOG_PATH = `${resolveLogDir()}/macos-setup.log`

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService {
    private readonly logPath = LOG_PATH
    private _context: string

    public log(message: string, color?: Color) {
        const generatedMessage = this.generateMessage(message)
        color ? console.log(this.coloredMessage(message, color)) : console.log(message)
        this.writeToLog(`LOG | ${generatedMessage}`)
    }
    public error(message: string, trace?) {
        const generatedMessage = this.generateMessage(message)
        console.error(this.coloredMessage(message, 'red'))
        this.writeToLog(`ERROR | ${generatedMessage}`)
    }
    public warn(message: string) {
        const generatedMessage = this.generateMessage(message)
        console.warn(this.coloredMessage(message, 'yellow'))
        this.writeToLog(`WARN | ${generatedMessage}`)
    }
    public debug(message: string) {
        const generatedMessage = this.generateMessage(message)
        // console.debug(message)
        this.writeToLog(`DEBUG | ${generatedMessage}`)
    }

    /**
     * Append a line to the log file, best-effort.
     *
     * These calls are fire-and-forget, so the `.catch` is essential: a write failure (e.g. EACCES
     * when `logs/` was created by an earlier elevated run and is now owned by root) must degrade to
     * "no file logging" rather than surfacing as an unhandled promise rejection that crashes the CLI.
     */
    private writeToLog(line: string): void {
        appendFile(this.logPath, `${line}\n`, { mode: 0o770 }).catch(() => {})
    }

    private get context(): string {
        return this._context ? `[${this._context}] ` : ''
    }

    private coloredMessage(message: string, color: Color): string {
        const colorCode = COLORS_CONFIG[color]
        const coloredMessage = `${colorCode}${message}\x1b[0m`

        return coloredMessage
    }

    private generateMessage(message: string): string {
        return `INSTANCE: ${BOOTSTRAP_UUID} | version: ${PACKAGE_VERSION} | ${new Date().toLocaleString()} | ${this.context}${message}`
    }

    public setContext(context: string) {
        this._context = context
    }
}
