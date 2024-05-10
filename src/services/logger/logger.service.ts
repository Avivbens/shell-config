import { appendFile } from 'node:fs/promises'
import { BASE_PATH, BOOTSTRAP_UUID } from '@common/constants'
import { execPromise } from '@common/utils'
import { Injectable, Scope } from '@nestjs/common'
import { COLORS_CONFIG, Color } from './logger.config'

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService {
    private readonly logPath = `${BASE_PATH}/logs/macos-setup.log`
    private _context: string

    constructor() {
        execPromise(`mkdir -p "${BASE_PATH}/logs"`).catch(() => {})
    }

    public log(message: string, color?: Color) {
        const generatedMessage = this.generateMessage(message)
        color ? console.log(this.coloredMessage(message, color)) : console.log(message)
        appendFile(this.logPath, `LOG | ${generatedMessage}\n`, { mode: 0o770 })
    }
    public error(message: string, trace?) {
        const generatedMessage = this.generateMessage(message)
        console.error(this.coloredMessage(message, 'red'))
        appendFile(this.logPath, `ERROR | ${generatedMessage}\n`, { mode: 0o770 })
    }
    public warn(message: string) {
        const generatedMessage = this.generateMessage(message)
        console.warn(this.coloredMessage(message, 'yellow'))
        appendFile(this.logPath, `WARN | ${generatedMessage}\n`, { mode: 0o770 })
    }
    public debug(message: string) {
        const generatedMessage = this.generateMessage(message)
        // console.debug(message)
        appendFile(this.logPath, `DEBUG | ${generatedMessage}\n`, { mode: 0o770 })
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
        return `INSTANCE: ${BOOTSTRAP_UUID} | ${new Date().toLocaleString()} |${this.context}${message}`
    }

    public setContext(context: string) {
        this._context = context
    }
}
