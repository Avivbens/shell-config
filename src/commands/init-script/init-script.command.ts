import { Command, CommandRunner } from 'nest-commander'
import { INIT_DYNAMIC_SCRIPT } from './config/init-script.config'

@Command({
    name: 'init-script',
    description:
        'Dynamic commands for init script. Execute this command only when you want to force-apply the latest shell-config setup, like: source <(shell-config init-script)',
    options: { isDefault: false, hidden: true },
})
export class InitScriptCommand extends CommandRunner {
    constructor() {
        super()
    }

    async run(inputs: string[], options: Record<string, any>): Promise<void> {
        try {
            console.log(INIT_DYNAMIC_SCRIPT)
        } catch (error) {}
    }
}
