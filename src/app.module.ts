import { Module } from '@nestjs/common'
import { InitCommand } from './commands/init.command'
import { LoggerService } from './services/logger.service'

@Module({
    providers: [LoggerService, InitCommand],
})
export class AppModule {}
