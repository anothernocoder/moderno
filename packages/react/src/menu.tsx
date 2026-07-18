import { useId } from 'react'
import * as menu from '@zag-js/menu'
import { useMachine, normalizeProps, Portal } from '@zag-js/react'
import { cx, parts } from '@moderno/class-contract'

export interface MenuItem {
  label: string
  value: string
  disabled?: boolean
}

export interface MenuProps {
  /** Label of the trigger button. */
  triggerLabel: string
  /** The actions offered by the menu. */
  items: MenuItem[]
  /** Called with the item's `value` when it is selected. */
  onSelect?: (value: string) => void
}

/**
 * Closed-prop Menu (ADR-0003) over the Zag menu machine.
 * Pull-down of actions: trigger button + item list; keyboard, typeahead,
 * focus return and ARIA `menu`/`menuitem` come from Zag.
 */
export function Menu({ triggerLabel, items, onSelect }: MenuProps) {
  const service = useMachine(menu.machine, {
    id: useId(),
    onSelect: onSelect ? (d) => onSelect(d.value) : undefined,
  })
  const api = menu.connect(service, normalizeProps)

  return (
    <>
      <button {...api.getTriggerProps()} className={cx.button({ variant: 'secondary', size: 'sm' })}>
        {triggerLabel}
        <span {...api.getIndicatorProps()} className={parts.menu.indicator} aria-hidden="true">
          ▾
        </span>
      </button>
      {api.open && (
        <Portal>
          <div {...api.getPositionerProps()} className={parts.menu.positioner}>
            <ul {...api.getContentProps()} className={parts.menu.content}>
              {items.map((item) => (
                <li
                  key={item.value}
                  {...api.getItemProps({ value: item.value, disabled: item.disabled })}
                  className={parts.menu.item}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </Portal>
      )}
    </>
  )
}
