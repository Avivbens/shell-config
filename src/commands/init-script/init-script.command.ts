import { BASE_PATH } from '@common/constants'
import { access } from 'fs/promises'
import { Command, CommandRunner } from 'nest-commander'
import { INIT_DYNAMIC_SCRIPT, OPEN_TERMINAL } from './config/init-script.config'

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

    async run(inputs: string[], options: Record<string, unknown>): Promise<void> {
        try {
            const hasPermissions: boolean = await access(`${BASE_PATH}/zsh`)
                .then(() => true)
                .catch(() => false)

            const script = hasPermissions ? INIT_DYNAMIC_SCRIPT : OPEN_TERMINAL
            console.log(script)
            // eslint-disable-next-line no-empty
        } catch (error) {}
    }
}
