import { inquirer } from '@common/inquirer'
import type { IAppSetup } from '@models/app-setup.model'
import type { IGroup } from '@models/group.model'
import type { ITag } from '@models/tag.model'
import { APPS_CONFIG } from './apps.config'

export const MULTI_SELECT_APPS_PROMPT = async (tags: ITag[]): Promise<IAppSetup[]> => {
    const tagsMap: Partial<Record<ITag, true>> = tags.reduce((acc, tag) => {
        acc[tag] = true
        return acc
    }, {})

    const dropPaid: boolean = tagsMap['NON-PAID: drop all paid apps selections'] ?? false

    const groups: Record<IGroup, IAppSetup[]> = APPS_CONFIG.reduce(
        (acc, app) => {
            const { group } = app
            acc[group] ??= []
            acc[group].push(app)

            return acc
        },
        {} as Record<IGroup, IAppSetup[]>,
    )

    const choices = Object.entries(groups).flatMap(([groupName, group]) => {
        const value = group.map((app) => {
            const { name, default: initial, description, tags = [], paid } = app
            const checked = () => {
                if (dropPaid && paid) {
                    return false
                }

                return initial || tags.some((tag) => tagsMap[tag])
            }

            return {
                name: `${name}${description ? ` - ${description}` : ''}`,
                checked: checked(),
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
            pageSize: 30,
        },
    ])

    const { setup } = res
    return setup
}
