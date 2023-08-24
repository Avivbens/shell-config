import { Injectable } from '@nestjs/common'
import { appendFile } from 'node:fs/promises'
import { homedir } from 'node:os'

@Injectable()
export class LoggerService {
    private readonly logPath = `${homedir()}/Desktop/macos-setup.log`
    log(message) {
        console.log(message)
        appendFile(this.logPath, `LOG | ${message}\n`)
    }
    error(message, trace?) {
        console.error(message, trace)
        appendFile(this.logPath, `ERROR | ${message}\n`)
    }
    warn(message) {
        console.warn(message)
        appendFile(this.logPath, `WARN | ${message}\n`)
    }
    debug(message) {
        // console.debug(message)
        appendFile(this.logPath, `DEBUG | ${message}\n`)
    }
}
