import { appendFile } from 'node:fs/promises'
import { BASE_PATH, BOOTSTRAP_UUID } from '@common/constants'
import { execPromise } from '@common/utils'
import { Injectable, Scope } from '@nestjs/common'

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService {
    private readonly logPath = `${BASE_PATH}/logs/macos-setup.log`
    private _context: string

    constructor() {
        execPromise(`mkdir -p "${BASE_PATH}/logs"`).catch(() => {})
    }

    public log(message) {
        const generatedMessage = this.generateMessage(message)
        console.log(message)
        appendFile(this.logPath, `LOG | ${generatedMessage}\n`, { mode: 0o770 })
    }
    public error(message, trace?) {
        const generatedMessage = this.generateMessage(message)
        console.error(`\x1b[31m${message}\x1b[0m`)
        appendFile(this.logPath, `ERROR | ${generatedMessage}\n`, { mode: 0o770 })
    }
    public warn(message) {
        const generatedMessage = this.generateMessage(message)
        // set color to yellow
        console.warn(`\x1b[33m${message}\x1b[0m`)
        appendFile(this.logPath, `WARN | ${generatedMessage}\n`, { mode: 0o770 })
    }
    public debug(message) {
        const generatedMessage = this.generateMessage(message)
        // console.debug(message)
        appendFile(this.logPath, `DEBUG | ${generatedMessage}\n`, { mode: 0o770 })
    }

    private get context(): string {
        return this._context ? `[${this._context}] ` : ''
    }

    private generateMessage(message: string): string {
        return `INSTANCE: ${BOOTSTRAP_UUID} | ${new Date().toLocaleString()} |${this.context}${message}`
    }

    public setContext(context: string) {
        this._context = context
    }
}
