import type { ReactNode } from 'react'
import { cx, parts, type BadgeVariant } from '@moderno/class-contract'

export interface BadgeProps {
  variant?: BadgeVariant
  /** Show a leading status dot. */
  dot?: boolean
  children: ReactNode
}

/** Compact status/label token. Pure CSS, closed-prop. */
export function Badge({ variant, dot, children }: BadgeProps) {
  return (
    <span className={cx.badge({ variant })}>
      {dot ? <span className={parts.badge.dot} /> : null}
      {children}
    </span>
  )
}
