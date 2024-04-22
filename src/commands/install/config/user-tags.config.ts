import { inquirer } from '@common/inquirer'
import { AVAILABLE_TAGS, type ITag } from '@models/tag.model'

export const USER_TAGS_PROMPT = async (): Promise<ITag[]> => {
    const res = await inquirer.prompt<{ tags: ITag[] }>([
        {
            type: 'checkbox',
            name: 'tags',
            message: 'Let us know your preferences',
            loop: false,
            choices: AVAILABLE_TAGS,
            pageSize: 10,
        },
    ])

    const { tags } = res
    return tags
}
