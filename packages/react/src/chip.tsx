import type { ReactNode } from 'react'

export interface ChipProps {
  variant?: 'neutral' | 'solid'
  /** Render a trailing remove (×) button. */
  removable?: boolean
  /** Called when the remove button is activated. */
  onRemove?: () => void
  /** Accessible label for the remove button. */
  removeLabel?: string
  children: ReactNode
}

/** Compact, optionally removable token. Pure CSS, closed-prop. */
export function Chip({ variant = 'neutral', removable, onRemove, removeLabel = 'Remove', children }: ChipProps) {
  return (
    <span className={`md-chip md-chip--${variant}`}>
      {children}
      {removable ? (
        <button type="button" className="md-chip__remove" aria-label={removeLabel} onClick={onRemove}>
          ×
        </button>
      ) : null}
    </span>
  )
}
