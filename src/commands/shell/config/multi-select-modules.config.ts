import { inquirer } from '@common/inquirer'
import { IShellModule } from '@models/shell-module.model'
import { SHELL_MODULES_OPTIONS } from './shell-modules.config'

export const MULTI_SELECT_MODULES_PROMPT = async (): Promise<IShellModule[]> => {
    const choices = SHELL_MODULES_OPTIONS.map((module) => {
        const { name, default: initial, description } = module
        return {
            name: `${name}${description ? ` - ${description}` : ''}`,
            checked: initial,
            value: module,
            line: description ?? '',
            extra: description ?? '',
        }
    })

    const res = await inquirer.prompt<{ setup: IShellModule[] }>([
        {
            type: 'checkbox',
            name: 'setup',
            message: 'Select your shells setup you want to apply',
            loop: false,
            choices,
            pageSize: 10,
            filter: (input: IShellModule[]) => {
                const modulesMap: Record<string, boolean> = input.reduce((acc, module) => {
                    acc[module.name] = true
                    return acc
                }, {} satisfies Record<string, boolean>)

                const toDisable = SHELL_MODULES_OPTIONS.filter((module) => {
                    const { name } = module
                    return !modulesMap[name]
                })

                return toDisable
            },
        },
    ])

    const { setup } = res
    return setup
}
