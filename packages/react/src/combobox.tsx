import { useId, useMemo, useState, type ReactNode } from 'react'
import * as combobox from '@zag-js/combobox'
import { useMachine, normalizeProps, Portal } from '@zag-js/react'
import { parts } from '@moderno/class-contract'

export interface ComboboxItem {
  label: string
  value: string
  disabled?: boolean
}

export interface ComboboxProps {
  /** Visible label. */
  label?: ReactNode
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
export function Combobox({ label, items, placeholder, defaultValue, value, disabled, onValueChange }: ComboboxProps) {
  const [query, setQuery] = useState('')
  const options = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((item) => item.label.toLowerCase().includes(q))
  }, [items, query])
  const collection = useMemo(() => combobox.collection({ items: options }), [options])

  const service = useMachine(combobox.machine, {
    id: useId(),
    collection,
    defaultValue,
    value,
    disabled,
    onValueChange: onValueChange ? (d) => onValueChange(d.value) : undefined,
    // Only typing narrows the list; selection/clear set the input programmatically
    // and must show the full list on the next open.
    onInputValueChange: (d) => setQuery(d.reason === 'input-change' ? d.inputValue : ''),
  })
  const api = combobox.connect(service, normalizeProps)

  return (
    <div {...api.getRootProps()} className={parts.combobox.root}>
      {label != null && (
        <label {...api.getLabelProps()} className={parts.combobox.label}>
          {label}
        </label>
      )}
      <div {...api.getControlProps()} className={parts.combobox.control}>
        <input {...api.getInputProps()} className={parts.combobox.input} placeholder={placeholder} />
        <button {...api.getTriggerProps()} className={parts.combobox.trigger}>
          ▾
        </button>
      </div>
      {api.open && options.length > 0 && (
        <Portal>
          <div {...api.getPositionerProps()} className={parts.combobox.positioner}>
            <ul {...api.getContentProps()} className={parts.combobox.content}>
              {options.map((item) => (
                <li key={item.value} {...api.getItemProps({ item })} className={parts.combobox.item}>
                  <span {...api.getItemTextProps({ item })} className={parts.combobox.itemText}>
                    {item.label}
                  </span>
                  <span {...api.getItemIndicatorProps({ item })} className={parts.combobox.itemIndicator} aria-hidden="true">
                    ✓
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Portal>
      )}
    </div>
  )
}
