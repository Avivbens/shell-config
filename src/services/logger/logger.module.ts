import { DynamicModule, Module } from '@nestjs/common'
import { createLoggersProviders } from './decorators'
import { LoggerService } from './logger.service'

@Module({})
export class LoggerModule {
    static register(): DynamicModule {
        const LOGGERS_PROVIDERS = createLoggersProviders()

        return {
            module: LoggerModule,
            providers: [LoggerService, ...LOGGERS_PROVIDERS],
            exports: [LoggerService, ...LOGGERS_PROVIDERS],
        }
    }
}
