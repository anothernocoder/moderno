import type { ReactNode } from 'react'

export interface IndicatorProps {
  variant?: 'neutral' | 'success' | 'warning' | 'error' | 'info'
  /** Animate the dot with a pulsing ring. */
  pulse?: boolean
  /** Optional label rendered after the dot. */
  children?: ReactNode
}

/** Status dot with optional pulse and label. Pure CSS, closed-prop. */
export function Indicator({ variant = 'neutral', pulse, children }: IndicatorProps) {
  const cls = ['md-indicator', `md-indicator--${variant}`, pulse && 'md-indicator--pulse'].filter(Boolean).join(' ')
  return (
    <span className={cls}>
      <span className="md-indicator__dot" />
      {children}
    </span>
  )
}
