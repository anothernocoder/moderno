import type { JSX } from 'solid-js'
import { cx, parts, type BadgeVariant } from '@moderno/class-contract'

export interface BadgeProps {
  variant?: BadgeVariant
  dot?: boolean
  children: JSX.Element
}

/** Compact status/label token. Pure CSS, closed-prop. */
export function Badge(props: BadgeProps) {
  return (
    <span class={cx.badge({ variant: props.variant })}>
      {props.dot ? <span class={parts.badge.dot} /> : null}
      {props.children}
    </span>
  )
}
