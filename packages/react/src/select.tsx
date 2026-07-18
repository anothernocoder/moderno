import { useId, useMemo, type ReactNode } from 'react'
import * as select from '@zag-js/select'
import { useMachine, normalizeProps, Portal } from '@zag-js/react'
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
  /** The options to choose from. */
  items: SelectItem[]
  /** Uncontrolled initial selected keys. */
  defaultValue?: string[]
  /** Controlled selected keys. */
  value?: string[]
  multiple?: boolean
  disabled?: boolean
  onValueChange?: (value: string[]) => void
  children: ReactNode
}

function Root({ items, defaultValue, value, multiple, disabled, onValueChange, children }: SelectRootProps) {
  const collection = useMemo(() => select.collection({ items }), [items])
  const service = useMachine(select.machine, {
    id: useId(),
    collection,
    defaultValue,
    value,
    multiple,
    disabled,
    onValueChange: onValueChange ? (d) => onValueChange(d.value) : undefined,
  })
  const api = select.connect(service, normalizeProps)
  return (
    <SelectProvider value={api}>
      <div {...api.getRootProps()} className={parts.select.root}>
        {children}
      </div>
    </SelectProvider>
  )
}

function Label({ children }: { children: ReactNode }) {
  const api = useSelect('Label')
  return (
    <label {...api.getLabelProps()} className={parts.select.label}>
      {children}
    </label>
  )
}

function Trigger({ placeholder = 'Select…' }: { placeholder?: string }) {
  const api = useSelect('Trigger')
  return (
    <div {...api.getControlProps()} className={parts.select.control}>
      <button {...api.getTriggerProps()} className={parts.select.trigger}>
        <span {...api.getValueTextProps()} className={parts.select.value}>
          {api.empty ? placeholder : api.valueAsString}
        </span>
        <span {...api.getIndicatorProps()} className={parts.select.indicator} aria-hidden="true">
          ▾
        </span>
      </button>
    </div>
  )
}

function Content({ children }: { children: ReactNode }) {
  const api = useSelect('Content')
  if (!api.open) return null
  return (
    <Portal>
      <div {...api.getPositionerProps()} className={parts.select.positioner}>
        <ul {...api.getContentProps()} className={parts.select.content}>
          {children}
        </ul>
      </div>
    </Portal>
  )
}

function Item({ item, children }: { item: SelectItem; children?: ReactNode }) {
  const api = useSelect('Item')
  return (
    <li {...api.getItemProps({ item })} className={parts.select.item}>
      <span {...api.getItemTextProps({ item })} className={parts.select.itemText}>
        {children ?? item.label}
      </span>
      <span {...api.getItemIndicatorProps({ item })} className={parts.select.itemIndicator} aria-hidden="true">
        ✓
      </span>
    </li>
  )
}

/** Compositional Select (ADR-0003): parts share one Zag machine via context. */
export const Select = { Root, Label, Trigger, Content, Item }
