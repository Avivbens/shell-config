import { vi } from 'vitest'
import type { Provider } from '@nestjs/common'
import { LOGGER_PROVIDER_PREFIX } from '../decorators'
import type { LoggerService } from '../logger.service'

const loggerMock: Partial<Record<keyof LoggerService, any>> = {
    debug: vi.fn(),
    error: vi.fn(),
    log: vi.fn(),
    setContext: vi.fn(),
    warn: vi.fn(),
}

export const loggerMockCreator = (loggerName: string): Provider => {
    const provide = LOGGER_PROVIDER_PREFIX(loggerName)
    return {
        provide,
        useValue: loggerMock,
    }
}
