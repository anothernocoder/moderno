import { Show, type JSX } from 'solid-js'

export interface ChipProps {
  variant?: 'neutral' | 'solid'
  removable?: boolean
  onRemove?: () => void
  children: JSX.Element
}

/** Compact, optionally removable token. Pure CSS, closed-prop. */
export function Chip(props: ChipProps) {
  return (
    <span class={`md-chip md-chip--${props.variant ?? 'neutral'}`}>
      {props.children}
      <Show when={props.removable}>
        <button type="button" class="md-chip__remove" aria-label="Quitar" onClick={() => props.onRemove?.()}>
          ×
        </button>
      </Show>
    </span>
  )
}
