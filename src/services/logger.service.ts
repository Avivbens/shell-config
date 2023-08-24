import { Injectable, Logger } from '@nestjs/common'
import { appendFile } from 'node:fs/promises'
import { homedir } from 'node:os'

@Injectable()
export class LoggerService {
    private logger: Logger = new Logger()
    private readonly logPath = `${homedir()}/Desktop/macos-setup.log`
    log(message) {
        this.logger.log(message)
        appendFile(this.logPath, `LOG | ${message}\n`)
    }
    error(message, trace?) {
        this.logger.error(message, trace)
        appendFile(this.logPath, `ERROR | ${message}\n`)
    }
    warn(message) {
        this.logger.warn(message)
        appendFile(this.logPath, `WARN | ${message}\n`)
    }
    debug(message) {
        this.logger.debug(message)
        appendFile(this.logPath, `DEBUG | ${message}\n`)
    }
}
