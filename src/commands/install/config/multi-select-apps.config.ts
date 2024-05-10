import { inquirer } from '@common/inquirer'
import type {
    Item,
    SelectConfig,
    SelectableItem,
    SpecialKeysHandlerInject,
} from '@common/renderers/select-prompt.renderer'
import { SELECT_PROMPT_RENDERER } from '@common/renderers/select-prompt.renderer'
import { execPromise } from '@common/utils'
import { Separator } from '@inquirer/core'
import type { IAppSetup } from '@models/app-setup.model'
import type { IGroup } from '@models/group.model'
import type { ITag } from '@models/tag.model'
import { APPS_CONFIG } from './apps.config'

const BUILD_CHOICES_LIST = (tags: ITag[]): Item<IAppSetup>[] => {
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

    const choices: Item<IAppSetup>[] = Object.entries(groups).flatMap(([groupName, group]) => {
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
            } as Item<IAppSetup>
        })

        return [new Separator(`----- ${groupName} -----`), ...value]
    })

    return choices
}

/**
 * @deprecated - old version of select prompt, use {@link MULTI_SELECT_APPS_PROMPT_V2}
 */
export const MULTI_SELECT_APPS_PROMPT = async (tags: ITag[]): Promise<IAppSetup[]> => {
    const choices = BUILD_CHOICES_LIST(tags)

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

export const MULTI_SELECT_APPS_PROMPT_V2 = (tags: ITag[]): Promise<IAppSetup[]> => {
    const choices = BUILD_CHOICES_LIST(tags)

    const specialKeysHandler = async ({ key, items, active }: SpecialKeysHandlerInject) => {
        const { name } = key
        switch (true) {
            /**
             * Handle open link
             */
            case 'o' === name: {
                const { openUrl } = (<SelectableItem<IAppSetup> | undefined>items[active])?.value ?? {}
                if (!openUrl) {
                    return
                }

                const command = openUrl()

                await execPromise(command)
                break
            }

            default: {
                break
            }
        }
    }

    const config: SelectConfig<IAppSetup> = {
        message: 'Select your MacOS setup',
        loop: false,
        pageSize: 30,
        choices,
        specialKeysHandler,
        additionalInstructions: (theme) => [`${theme.style.key('o')} to open documentation link`],
    }

    return SELECT_PROMPT_RENDERER<IAppSetup>(config)
}
