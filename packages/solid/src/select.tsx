import { createMemo, createUniqueId, Show, type JSX } from 'solid-js'
import { Portal } from 'solid-js/web'
import * as select from '@zag-js/select'
import { useMachine, normalizeProps } from '@zag-js/solid'
import { parts } from '@moderno/class-contract'
import { createPartContext } from './create-part-context'

export interface SelectItem {
  label: string
  value: string
  disabled?: boolean
}

type SelectApi = ReturnType<typeof select.connect>
const { Provider: SelectProvider, usePart: useSelect } = createPartContext<SelectApi>('Select')

export interface SelectRootProps {
  items: SelectItem[]
  defaultValue?: string[]
  value?: string[]
  multiple?: boolean
  disabled?: boolean
  onValueChange?: (value: string[]) => void
  children: JSX.Element
}

function Root(props: SelectRootProps) {
  const collection = createMemo(() => select.collection({ items: props.items }))
  const service = useMachine(select.machine, {
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
    get multiple() {
      return props.multiple
    },
    get disabled() {
      return props.disabled
    },
    onValueChange: (d) => props.onValueChange?.(d.value),
  })
  const api = createMemo(() => select.connect(service, normalizeProps))
  return (
    <SelectProvider value={api}>
      <div {...api().getRootProps()} class={parts.select.root}>
        {props.children}
      </div>
    </SelectProvider>
  )
}

function Label(props: { children: JSX.Element }) {
  const api = useSelect('Label')
  return (
    <label {...api().getLabelProps()} class={parts.select.label}>
      {props.children}
    </label>
  )
}

function Trigger(props: { placeholder?: string }) {
  const api = useSelect('Trigger')
  const placeholder = () => props.placeholder ?? 'Select…'
  return (
    <div {...api().getControlProps()} class={parts.select.control}>
      <button {...api().getTriggerProps()} class={parts.select.trigger}>
        <span {...api().getValueTextProps()} class={parts.select.value}>
          {api().empty ? placeholder() : api().valueAsString}
        </span>
        <span {...api().getIndicatorProps()} class={parts.select.indicator} aria-hidden="true">
          ▾
        </span>
      </button>
    </div>
  )
}

function Content(props: { children: JSX.Element }) {
  const api = useSelect('Content')
  return (
    <Show when={api().open}>
      <Portal>
        <div {...api().getPositionerProps()} class={parts.select.positioner}>
          <ul {...api().getContentProps()} class={parts.select.content}>
            {props.children}
          </ul>
        </div>
      </Portal>
    </Show>
  )
}

function Item(props: { item: SelectItem; children?: JSX.Element }) {
  const api = useSelect('Item')
  return (
    <li {...api().getItemProps({ item: props.item })} class={parts.select.item}>
      <span {...api().getItemTextProps({ item: props.item })} class={parts.select.itemText}>
        {props.children ?? props.item.label}
      </span>
      <span {...api().getItemIndicatorProps({ item: props.item })} class={parts.select.itemIndicator} aria-hidden="true">
        ✓
      </span>
    </li>
  )
}

/** Compositional Select (ADR-0003): parts share one Zag machine via Solid context. */
export const Select = { Root, Label, Trigger, Content, Item }
