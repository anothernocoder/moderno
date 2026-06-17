import type { ReactNode } from 'react'
import { cx, parts, type ChipVariant } from '@moderno/class-contract'

export interface ChipProps {
  variant?: ChipVariant
  /** Render a trailing remove (×) button. */
  removable?: boolean
  /** Called when the remove button is activated. */
  onRemove?: () => void
  /** Accessible label for the remove button. */
  removeLabel?: string
  children: ReactNode
}

/** Compact, optionally removable token. Pure CSS, closed-prop. */
export function Chip({ variant, removable, onRemove, removeLabel = 'Remove', children }: ChipProps) {
  return (
    <span className={cx.chip({ variant })}>
      {children}
      {removable ? (
        <button type="button" className={parts.chip.remove} aria-label={removeLabel} onClick={onRemove}>
          ×
        </button>
      ) : null}
    </span>
  )
}
