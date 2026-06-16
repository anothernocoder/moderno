import type { ReactNode } from 'react'

export interface BadgeProps {
  variant?: 'neutral' | 'solid' | 'success' | 'warning' | 'error' | 'info'
  /** Show a leading status dot. */
  dot?: boolean
  children: ReactNode
}

/** Compact status/label token. Pure CSS, closed-prop. */
export function Badge({ variant = 'neutral', dot, children }: BadgeProps) {
  return (
    <span className={`md-badge md-badge--${variant}`}>
      {dot ? <span className="md-badge__dot" /> : null}
      {children}
    </span>
  )
}
