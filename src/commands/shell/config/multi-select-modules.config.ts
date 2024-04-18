import { inquirer } from '@common/inquirer'
import type { IShellModule } from '@models/shell-module.model'
import { EXTENDS_MODULES_DIR_PATH, SHELL_MODULES_OPTIONS } from './shell-modules.config'

export const MULTI_SELECT_MODULES_PROMPT = async (currentConfig: string[]): Promise<IShellModule[]> => {
    // map of all modules by their workspace file path
    const currentConfigMap: Record<string, boolean> = currentConfig.reduce(
        (acc, module) => {
            const workspaceFilePath = `${EXTENDS_MODULES_DIR_PATH}/${module}`
            acc[workspaceFilePath] = true
            return acc
        },
        {} satisfies Record<string, boolean>,
    )

    const choices = SHELL_MODULES_OPTIONS.map((module) => {
        const { name, description, path } = module
        return {
            name: `${name}${description ? ` - ${description}` : ''}`,
            checked: currentConfigMap[path],
            value: module,
            line: description ?? '',
            extra: description ?? '',
        }
    })

    const res = await inquirer.prompt<{ disabled: IShellModule[] }>([
        {
            type: 'checkbox',
            name: 'disabled',
            message: 'Select your shells setup you want to apply',
            loop: false,
            choices,
            pageSize: 10,
            filter: (input: IShellModule[]) => {
                const modulesMap: Record<string, boolean> = input.reduce(
                    (acc, module) => {
                        acc[module.name] = true
                        return acc
                    },
                    {} satisfies Record<string, boolean>,
                )

                const toDisable = SHELL_MODULES_OPTIONS.filter((module) => {
                    const { name } = module
                    return !modulesMap[name]
                })

                return toDisable
            },
        },
    ])

    const { disabled } = res
    return disabled
}
