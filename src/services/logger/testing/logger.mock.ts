import type { Provider } from '@nestjs/common'
import { LOGGER_PROVIDER_PREFIX } from '../decorators'
import type { LoggerService } from '../logger.service'

const loggerMock: Partial<Record<keyof LoggerService, any>> = {
    debug: jest.fn(),
    error: jest.fn(),
    log: jest.fn(),
    setContext: jest.fn(),
    warn: jest.fn(),
}

export const loggerMockCreator = (loggerName: string): Provider => {
    const provide = LOGGER_PROVIDER_PREFIX(loggerName)
    return {
        provide,
        useValue: loggerMock,
    }
}
