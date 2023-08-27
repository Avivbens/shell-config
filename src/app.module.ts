import { ExternalCommand } from '@commands/external/external.command'
import { InitCommand } from '@commands/init/init.command'
import { InstallCommand } from '@commands/install/install.command'
import { ShellCommand } from '@commands/shell/shell.command'
import { UpdateCommand } from '@commands/update/update.command'
import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { CheckUpdateService } from './services/check-update.service'
import { LoggerService } from './services/logger.service'

const COMMANDS = [
    InitCommand,
    InstallCommand,
    ShellCommand,
    UpdateCommand,
    ...ExternalCommand.registerWithSubCommands(),
]

@Module({
    imports: [HttpModule],
    providers: [LoggerService, CheckUpdateService, ...COMMANDS],
})
export class AppModule {}
