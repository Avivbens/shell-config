import type { Provider } from '@nestjs/common'
import { Inject } from '@nestjs/common'
import { LoggerService } from '../logger.service'

export const LOGGER_PROVIDER_PREFIX = (name: string) => `[injectLogger]${name}`

const LOGGERS: string[] = []

function loggerProvider(loggerName: string): Provider<LoggerService> {
    return {
        provide: LOGGER_PROVIDER_PREFIX(loggerName),
        useFactory: () => {
            const logger = new LoggerService()
            logger.setContext(loggerName)
            return logger
        },
    }
}

export function createLoggersProviders(): Provider<LoggerService>[] {
    const providers = LOGGERS.map((loggerName) => loggerProvider(loggerName))
    return providers
}

export const InjectLogger = (loggerName: string): ParameterDecorator => {
    !LOGGERS.includes(loggerName) && LOGGERS.push(loggerName)
    return Inject(LOGGER_PROVIDER_PREFIX(loggerName))
}
