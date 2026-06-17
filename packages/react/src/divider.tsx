import type { ReactNode } from 'react'
import { cx, parts, type DividerOrientation } from '@moderno/class-contract'

export interface DividerProps {
  orientation?: DividerOrientation
  /** Optional centered label (horizontal only). */
  label?: ReactNode
}

/** Visual/semantic separator, optionally labelled. Pure CSS, closed-prop. */
export function Divider({ orientation = 'horizontal', label }: DividerProps) {
  if (label && orientation === 'horizontal') {
    return (
      <div className={parts.divider.group} role="separator">
        {label}
      </div>
    )
  }
  return (
    <div
      className={cx.divider({ orientation })}
      role="separator"
      aria-orientation={orientation === 'vertical' ? 'vertical' : undefined}
    />
  )
}
