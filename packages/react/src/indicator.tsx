import type { ReactNode } from 'react'
import { cx, parts, type IndicatorVariant } from '@moderno/class-contract'

export interface IndicatorProps {
  variant?: IndicatorVariant
  /** Animate the dot with a pulsing ring. */
  pulse?: boolean
  /** Optional label rendered after the dot. */
  children?: ReactNode
}

/** Status dot with optional pulse and label. Pure CSS, closed-prop. */
export function Indicator({ variant, pulse, children }: IndicatorProps) {
  return (
    <span className={cx.indicator({ variant, pulse })}>
      <span className={parts.indicator.dot} />
      {children}
    </span>
  )
}
