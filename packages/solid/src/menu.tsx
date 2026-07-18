import { Show, For, createMemo, createUniqueId } from 'solid-js'
import { Portal } from 'solid-js/web'
import * as menu from '@zag-js/menu'
import { useMachine, normalizeProps } from '@zag-js/solid'
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
export function Menu(props: MenuProps) {
  const service = useMachine(menu.machine, {
    id: createUniqueId(),
    onSelect(d) {
      props.onSelect?.(d.value)
    },
  })
  const api = createMemo(() => menu.connect(service, normalizeProps))

  return (
    <>
      <button {...api().getTriggerProps()} class={cx.button({ variant: 'secondary', size: 'sm' })}>
        {props.triggerLabel}
        <span {...api().getIndicatorProps()} class={parts.menu.indicator} aria-hidden="true">
          ▾
        </span>
      </button>
      <Show when={api().open}>
        <Portal>
          <div {...api().getPositionerProps()} class={parts.menu.positioner}>
            <ul {...api().getContentProps()} class={parts.menu.content}>
              <For each={props.items}>
                {(item) => (
                  <li {...api().getItemProps({ value: item.value, disabled: item.disabled })} class={parts.menu.item}>
                    {item.label}
                  </li>
                )}
              </For>
            </ul>
          </div>
        </Portal>
      </Show>
    </>
  )
}
