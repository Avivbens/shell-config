import { Command, CommandRunner } from 'nest-commander'
import { CheckUpdateService } from '@services/check-update.service'
import { DeleteSubCommand, InstallSubCommand, ListSubCommand } from './sub-commands'

@Command({
    name: 'external',
    description: 'Install and manage your external shell',
    options: { isDefault: false },
    subCommands: [ListSubCommand, InstallSubCommand, DeleteSubCommand],
})
export class ExternalCommand extends CommandRunner {
    constructor(private readonly checkUpdateService: CheckUpdateService) {
        super()
    }

    async run(inputs: string[], options: Record<string, unknown>): Promise<void> {
        await this.checkUpdateService.checkForUpdates()

        return this.command.help()
    }
}
