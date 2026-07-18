import { Show, For, createMemo, createSignal, createUniqueId, type JSX } from 'solid-js'
import { Portal } from 'solid-js/web'
import * as combobox from '@zag-js/combobox'
import { useMachine, normalizeProps } from '@zag-js/solid'
import { parts } from '@moderno/class-contract'

export interface ComboboxItem {
  label: string
  value: string
  disabled?: boolean
}

export interface ComboboxProps {
  /** Visible label. */
  label?: JSX.Element
  /** The options to choose from; typing filters them by label. */
  items: ComboboxItem[]
  placeholder?: string
  /** Uncontrolled initial selected keys. */
  defaultValue?: string[]
  /** Controlled selected keys. */
  value?: string[]
  disabled?: boolean
  onValueChange?: (value: string[]) => void
}

/**
 * Closed-prop Combobox (ADR-0003) over the Zag combobox machine.
 * Searchable single-select: the input filters `items` by label (case-insensitive
 * contains); selection, keyboard and ARIA come from Zag.
 */
export function Combobox(props: ComboboxProps) {
  const [query, setQuery] = createSignal('')
  const options = createMemo(() => {
    const q = query().trim().toLowerCase()
    if (!q) return props.items
    return props.items.filter((item) => item.label.toLowerCase().includes(q))
  })
  const collection = createMemo(() => combobox.collection({ items: options() }))

  const service = useMachine(combobox.machine, {
    id: createUniqueId(),
    get collection() {
      return collection()
    },
    get defaultValue() {
      return props.defaultValue
    },
    get value() {
      return props.value
    },
    get disabled() {
      return props.disabled
    },
    onValueChange(d) {
      props.onValueChange?.(d.value)
    },
    // Only typing narrows the list; selection/clear set the input programmatically
    // and must show the full list on the next open.
    onInputValueChange(d) {
      setQuery(d.reason === 'input-change' ? d.inputValue : '')
    },
  })
  const api = createMemo(() => combobox.connect(service, normalizeProps))

  return (
    <div {...api().getRootProps()} class={parts.combobox.root}>
      <Show when={props.label != null}>
        <label {...api().getLabelProps()} class={parts.combobox.label}>
          {props.label}
        </label>
      </Show>
      <div {...api().getControlProps()} class={parts.combobox.control}>
        <input {...api().getInputProps()} class={parts.combobox.input} placeholder={props.placeholder} />
        <button {...api().getTriggerProps()} class={parts.combobox.trigger}>
          ▾
        </button>
      </div>
      <Show when={api().open && options().length > 0}>
        <Portal>
          <div {...api().getPositionerProps()} class={parts.combobox.positioner}>
            <ul {...api().getContentProps()} class={parts.combobox.content}>
              <For each={options()}>
                {(item) => (
                  <li {...api().getItemProps({ item })} class={parts.combobox.item}>
                    <span {...api().getItemTextProps({ item })} class={parts.combobox.itemText}>
                      {item.label}
                    </span>
                    <span {...api().getItemIndicatorProps({ item })} class={parts.combobox.itemIndicator} aria-hidden="true">
                      ✓
                    </span>
                  </li>
                )}
              </For>
            </ul>
          </div>
        </Portal>
      </Show>
    </div>
  )
}
