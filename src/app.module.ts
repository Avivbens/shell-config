import { AssetsCommand } from '@commands/assets/assets.command'
import { ExternalCommand } from '@commands/external/external.command'
import { InfoCommand } from '@commands/info/info.command'
import { InitScriptCommand } from '@commands/init-script/init-script.command'
import { InitCommand } from '@commands/init/init.command'
import { InstallCommand } from '@commands/install/install.command'
import { ShellCommand } from '@commands/shell/shell.command'
import { UpdateCommand } from '@commands/update/update.command'
import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { LoggerModule } from '@services/logger/logger.module'
import { CheckUpdateService } from './services/check-update.service'
import { LoggerService } from './services/logger/logger.service'

const COMMANDS = [
    InitCommand,
    InitScriptCommand,
    InstallCommand,
    ShellCommand,
    UpdateCommand,
    AssetsCommand,
    InfoCommand,
    ...ExternalCommand.registerWithSubCommands(),
]

@Module({
    imports: [HttpModule, LoggerModule.register()],
    providers: [LoggerService, CheckUpdateService, ...COMMANDS],
})
export class AppModule {}
