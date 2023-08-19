import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { InitCommand } from './commands/init/init.command'
import { ShellCommand } from './commands/shell/shell.command'
import { CheckUpdateService } from './services/check-update.service'
import { LoggerService } from './services/logger.service'

const COMMANDS = [InitCommand, ShellCommand]

@Module({
    imports: [HttpModule],
    providers: [LoggerService, CheckUpdateService, ...COMMANDS],
})
export class AppModule {}
