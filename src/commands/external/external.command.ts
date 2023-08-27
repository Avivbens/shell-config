import { Command, CommandRunner } from 'nest-commander'
import { DeleteSubCommand, InstallSubCommand, ListSubCommand } from './sub-commands'

@Command({
    name: 'external',
    description: 'Install and manage your external shell',
    options: { isDefault: false },
    subCommands: [ListSubCommand, InstallSubCommand, DeleteSubCommand],
})
export class ExternalCommand extends CommandRunner {
    async run(inputs: string[], options: Record<string, any>): Promise<void> {
        return this.command.help()
    }
}
