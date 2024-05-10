import ansiEscapes from 'ansi-escapes'
import chalk from 'chalk'
import type { KeypressEvent } from '@inquirer/core'
import {
    Separator,
    type Theme,
    ValidationError,
    createPrompt,
    isDownKey,
    isEnterKey,
    isNumberKey,
    isSpaceKey,
    isUpKey,
    makeTheme,
    useKeypress,
    useMemo,
    usePagination,
    usePrefix,
    useRef,
    useState,
} from '@inquirer/core'
import figures from '@inquirer/figures'
import type { PartialDeep } from '@inquirer/type'

type CheckboxTheme = {
    icon: {
        checked: string
        unchecked: string
        cursor: string
    }
    style: {
        disabledChoice: (text: string) => string
        renderSelectedChoices: <T>(
            selectedChoices: ReadonlyArray<Choice<T>>,
            allChoices: ReadonlyArray<Choice<T> | Separator>,
        ) => string
    }
    helpMode: 'always' | 'never' | 'auto'
}

const checkboxTheme: CheckboxTheme = {
    icon: {
        checked: chalk.green(figures.circleFilled),
        unchecked: figures.circle,
        cursor: figures.pointer,
    },
    style: {
        disabledChoice: (text: string) => chalk.dim(`- ${text}`),
        renderSelectedChoices: (selectedChoices) =>
            selectedChoices.map((choice) => choice.name || choice.value).join(', '),
    },
    helpMode: 'auto',
}

type Choice<Value> = {
    name?: string
    value: Value
    disabled?: boolean | string
    checked?: boolean
    type?: never
    active?: boolean
}

export type SpecialKeysHandlerInject = {
    key: KeypressEvent
    items: Item<unknown>[]
    active: number
    callbacks: {
        setItems: (...params: any[]) => any
        isNumberKey: (...params: any[]) => any
        isSelectable: (...params: any[]) => any
        setActive: (...params: any[]) => any
        toggle: (...params: any[]) => any
        check: (...params: any[]) => any
    }
}

export type SelectableItem<Value = unknown> = Exclude<Item<Value>, Separator>

export type SelectConfig<Value> = {
    message: string
    choices: ReadonlyArray<Item<Value>>
    specialKeysHandler?: (payload: SpecialKeysHandlerInject) => void
    instructions?: boolean
    additionalInstructions?: (theme: ReturnType<typeof makeTheme>) => string[]

    prefix?: string
    pageSize?: number
    loop?: boolean
    required?: boolean
    validate?: (items: ReadonlyArray<Item<Value>>) => boolean | string | Promise<string | boolean>
    theme?: PartialDeep<Theme<CheckboxTheme>>
}

export type Item<Value = unknown> = Choice<Value> | Separator

function isSelectable<Value>(item: Item<Value>): item is Choice<Value> {
    return !Separator.isSeparator(item) && !item.disabled
}

function isChecked<Value>(item: Item<Value>): item is Choice<Value> {
    return isSelectable(item) && Boolean(item.checked)
}

function toggle<Value>(item: Item<Value>): Item<Value> {
    return isSelectable(item) ? { ...item, checked: !item.checked } : item
}

function check(checked: boolean) {
    return function <Value>(item: Item<Value>): Item<Value> {
        return isSelectable(item) ? { ...item, checked } : item
    }
}

const DEFAULT_TOP_KEYS = (theme: ReturnType<typeof makeTheme>) => [
    `${theme.style.key('space')} to select`,
    `${theme.style.key('a')} to toggle all`,
    `${theme.style.key('i')} to invert selection`,
    `and ${theme.style.key('enter')} to proceed`,
]

export const SELECT_PROMPT_RENDERER = createPrompt(
    <Value>(config: SelectConfig<Value>, done: (value: Array<Value>) => void) => {
        const {
            message,
            instructions = true,
            pageSize = 15,
            loop = false,
            choices,
            required = true,
            validate = () => true,
            additionalInstructions = () => [],
            specialKeysHandler = () => {},
        } = config

        const theme = makeTheme<CheckboxTheme>(checkboxTheme, config.theme)
        const prefix = usePrefix({ theme })
        const firstRender = useRef(true)
        const [status, setStatus] = useState<'pending' | 'done'>('pending')
        const [items, setItems] = useState<ReadonlyArray<Item<Value>>>(choices.map((choice) => ({ ...choice })))

        const bounds = useMemo(() => {
            const first = items.findIndex(isSelectable)
            const last = items.findLastIndex(isSelectable)

            if (first < 0) {
                throw new ValidationError('[checkbox prompt] No selectable choices. All choices are disabled.')
            }

            return { first, last }
        }, [items])

        const [active, setActive] = useState(bounds.first)
        const [showHelpTip, setShowHelpTip] = useState(true)
        const [errorMsg, setError] = useState<string>()

        // #region Events
        /**
         * Event Handling
         */
        useKeypress(async (key) => {
            switch (true) {
                /**
                 * Handle proceed with Enter
                 */
                case isEnterKey(key): {
                    const selection = items.filter(isChecked)
                    const isValid = await validate([...selection])

                    /**
                     * non-selected case
                     */
                    if (required && !items.some(isChecked)) {
                        setError('At least one choice must be selected')
                        return
                    }

                    /**
                     * valid case
                     */
                    if (isValid === true) {
                        setStatus('done')
                        done(selection.map((choice) => choice.value))
                        return
                    }

                    /**
                     * invalid case
                     */
                    setError(isValid || 'You must select a valid value')
                    return
                }

                /**
                 * Handle scrolling
                 */
                case isUpKey(key) || isDownKey(key): {
                    if (
                        loop ||
                        (isUpKey(key) && active !== bounds.first) ||
                        (isDownKey(key) && active !== bounds.last)
                    ) {
                        const offset = isUpKey(key) ? -1 : 1
                        let next = active
                        do {
                            next = (next + offset + items.length) % items.length
                        } while (!isSelectable(items[next]!))
                        setActive(next)
                    }
                    return
                }

                /**
                 * Handle select item
                 */
                case isSpaceKey(key): {
                    setError(undefined)
                    setShowHelpTip(false)
                    setItems(items.map((choice, i) => (i === active ? toggle(choice) : choice)))
                    return
                }

                /**
                 * Select all - with toggle
                 */
                case 'a' === key.name: {
                    const selectAll = items.some((choice) => isSelectable(choice) && !(<SelectableItem>choice).checked)

                    setItems(items.map(check(selectAll)))
                    return
                }

                /**
                 * Invert selection
                 */
                case 'i' === key.name: {
                    setItems(items.map(toggle))
                    return
                }

                /**
                 * Handle special keys
                 */
                default: {
                    specialKeysHandler?.({
                        key,
                        items: items as Item<unknown>[],
                        active,
                        callbacks: {
                            setItems,
                            isNumberKey,
                            isSelectable,
                            setActive,
                            toggle,
                            check,
                        },
                    })
                    return
                }
            }
        })

        // #region Render
        /**
         * Render the prompt
         */
        const page = usePagination<Item<Value>>({
            items,
            active,
            renderItem({ item, isActive }: { item: Item<Value>; isActive: boolean }) {
                if (Separator.isSeparator(item)) {
                    return ` ${item.separator}`
                }

                const line = item.name || item.value
                if (item.disabled) {
                    const disabledLabel = typeof item.disabled === 'string' ? item.disabled : '(disabled)'
                    return theme.style.disabledChoice(`${line} ${disabledLabel}`)
                }

                const checkbox = item.checked ? theme.icon.checked : theme.icon.unchecked
                const color = isActive ? theme.style.highlight : (x: string) => x
                const cursor = isActive ? theme.icon.cursor : ' '
                return color(`${cursor}${checkbox} ${line}`)
            },
            pageSize,
            loop,
        })

        // #region Done
        /**
         * Handle done status
         */
        const parsedMessage = theme.style.message(message)
        if (status === 'done') {
            const selection = items.filter(isChecked)
            const answer = theme.style.answer(theme.style.renderSelectedChoices(selection, items))

            return `${prefix} ${parsedMessage} ${answer}`
        }

        // #region HelpTip
        /**
         * Handle help tip
         */
        const shouldShowINstructions =
            theme.helpMode === 'always' || (theme.helpMode === 'auto' && showHelpTip && instructions)

        const allInstructions = additionalInstructions(theme).concat(DEFAULT_TOP_KEYS(theme))
        const helpTipTop = !shouldShowINstructions ? '' : ` (Press ${allInstructions.join(', ')})`

        let helpTipBottom = ''
        if (shouldShowINstructions || (items.length > pageSize && firstRender.current)) {
            helpTipBottom = `\n${theme.style.help('(Use arrow keys to reveal more choices)')}`
            firstRender.current = false
        }

        // #region Error
        /**
         * Handle error message
         */
        const error = !errorMsg ? '' : `\n${theme.style.error(errorMsg)}`

        return `${prefix} ${parsedMessage}${helpTipTop}\n${page}${helpTipBottom}${error}${ansiEscapes.cursorHide}`
    },
)
