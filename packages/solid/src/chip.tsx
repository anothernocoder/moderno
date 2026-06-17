import { Show, type JSX } from 'solid-js'
import { cx, parts, type ChipVariant } from '@moderno/class-contract'

export interface ChipProps {
  variant?: ChipVariant
  removable?: boolean
  onRemove?: () => void
  removeLabel?: string
  children: JSX.Element
}

/** Compact, optionally removable token. Pure CSS, closed-prop. */
export function Chip(props: ChipProps) {
  return (
    <span class={cx.chip({ variant: props.variant })}>
      {props.children}
      <Show when={props.removable}>
        <button type="button" class={parts.chip.remove} aria-label={props.removeLabel ?? 'Remove'} onClick={() => props.onRemove?.()}>
          ×
        </button>
      </Show>
    </span>
  )
}
