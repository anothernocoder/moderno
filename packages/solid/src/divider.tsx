import { Show, type JSX } from 'solid-js'
import { cx, parts, type DividerOrientation } from '@moderno/class-contract'

export interface DividerProps {
  orientation?: DividerOrientation
  label?: JSX.Element
}

/** Visual/semantic separator, optionally labelled. Pure CSS, closed-prop. */
export function Divider(props: DividerProps) {
  const orientation = () => props.orientation ?? 'horizontal'
  return (
    <Show
      when={props.label && orientation() === 'horizontal'}
      fallback={
        <div
          class={cx.divider({ orientation: orientation() })}
          role="separator"
          aria-orientation={orientation() === 'vertical' ? 'vertical' : undefined}
        />
      }
    >
      <div class={parts.divider.group} role="separator">
        {props.label}
      </div>
    </Show>
  )
}
