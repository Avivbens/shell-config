import { inquirer } from '@common/inquirer'
import type { IAppSetup } from '@models/app-setup.model'
import type { IGroup } from '@models/group.model'
import type { ITag } from '@models/tag.model'
import { APPS_CONFIG } from './apps.config'

export const MULTI_SELECT_APPS_PROMPT = async (tags: ITag[]): Promise<IAppSetup[]> => {
    const tagsMap = tags.reduce((acc, tag) => {
        acc[tag] = true
        return acc
    }, {})

    const groups: Record<IGroup, IAppSetup[]> = APPS_CONFIG.reduce((acc, app) => {
        const { group } = app
        acc[group] ??= []
        acc[group].push(app)

        return acc
    }, {} as Record<IGroup, IAppSetup[]>)

    const choices = Object.entries(groups).flatMap(([groupName, group]) => {
        const value = group.map((app) => {
            const { name, default: initial, description, tags = [] } = app
            return {
                name: `${name}${description ? ` - ${description}` : ''}`,
                checked: initial || tags.some((tag) => tagsMap[tag]),
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
