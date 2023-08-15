import { Module } from '@nestjs/common'
import { InitCommand } from './commands/init/init.command'
import { LoggerService } from './services/logger.service'
import { ShellCommand } from './commands/shell/shell.command'

@Module({
    providers: [LoggerService, InitCommand, ShellCommand],
})
export class AppModule {}
