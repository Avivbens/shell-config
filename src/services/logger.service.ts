import { Injectable, Scope } from '@nestjs/common'
import { appendFile } from 'node:fs/promises'
import { homedir } from 'node:os'

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService {
    private readonly logPath = `${homedir()}/Desktop/macos-setup.log`
    private _context: string

    public log(message) {
        const generatedMessage = this.generateMessage(message)
        console.log(message)
        appendFile(this.logPath, `LOG | ${generatedMessage}\n`)
    }
    public error(message, trace?) {
        const generatedMessage = this.generateMessage(message)
        console.error(`\x1b[31m${message}\x1b[0m`)
        appendFile(this.logPath, `ERROR | ${generatedMessage}\n`)
    }
    public warn(message) {
        const generatedMessage = this.generateMessage(message)
        // set color to yellow
        console.warn(`\x1b[33m${message}\x1b[0m`)
        appendFile(this.logPath, `WARN | ${generatedMessage}\n`)
    }
    public debug(message) {
        const generatedMessage = this.generateMessage(message)
        // console.debug(message)
        appendFile(this.logPath, `DEBUG | ${generatedMessage}\n`)
    }

    private get context(): string {
        return this._context ? `[${this._context}] ` : ''
    }

    private generateMessage(message: string): string {
        return `${this.context}${message}`
    }

    public setContext(context: string) {
        this._context = context
    }
}
