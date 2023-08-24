import { Command, CommandRunner } from 'nest-commander'
import { DeleteCommand, InstallCommand, ListCommand } from './sub-commands'

@Command({
    name: 'external',
    description: 'Install and manage your external shell',
    options: { isDefault: false },
    subCommands: [ListCommand, InstallCommand, DeleteCommand],
})
export class ExternalCommand extends CommandRunner {
    async run(inputs: string[], options: Record<string, any>): Promise<void> {
        return this.command.help()
    }
}
