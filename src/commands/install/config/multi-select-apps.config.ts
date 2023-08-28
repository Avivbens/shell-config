import { inquirer } from '@common/inquirer'
import { IAppSetup } from '@models/app-setup.model'
import { IGroup } from '@models/group.model'
import { APPS_CONFIG } from './apps.config'

export const MULTI_SELECT_APPS_PROMPT = async (): Promise<IAppSetup[]> => {
    const groups: Record<IGroup, IAppSetup[]> = APPS_CONFIG.reduce((acc, app) => {
        const { group } = app
        acc[group] ??= []
        acc[group].push(app)

        return acc
    }, {} as Record<IGroup, IAppSetup[]>)

    const choices = Object.entries(groups).flatMap(([groupName, group]) => {
        const value = group.map((app) => {
            const { name, default: initial, description } = app
            return {
                name: `${name}${description ? ` - ${description}` : ''}`,
                checked: initial,
                value: app,
            }
        })

        return [new inquirer.Separator(`----- ${groupName} -----`), ...value]
    })

    const res = await inquirer.prompt<{ setup: IAppSetup[] }>([
        {
            type: 'checkbox',
            name: 'setup',
            message: 'Select your MacOS setup',
            loop: false,
            choices,
            pageSize: 40,
        },
    ])

    const { setup } = res
    return setup
}
