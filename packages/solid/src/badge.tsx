import type { JSX } from 'solid-js'

export interface BadgeProps {
  variant?: 'neutral' | 'solid' | 'success' | 'warning' | 'error' | 'info'
  dot?: boolean
  children: JSX.Element
}

/** Compact status/label token. Pure CSS, closed-prop. */
export function Badge(props: BadgeProps) {
  return (
    <span class={`md-badge md-badge--${props.variant ?? 'neutral'}`}>
      {props.dot ? <span class="md-badge__dot" /> : null}
      {props.children}
    </span>
  )
}
