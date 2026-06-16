import type { ReactNode } from 'react'

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  /** Optional centered label (horizontal only). */
  label?: ReactNode
}

/** Visual/semantic separator, optionally labelled. Pure CSS, closed-prop. */
export function Divider({ orientation = 'horizontal', label }: DividerProps) {
  if (label && orientation === 'horizontal') {
    return (
      <div className="md-divider-group" role="separator">
        {label}
      </div>
    )
  }
  return (
    <div
      className={`md-divider md-divider--${orientation}`}
      role="separator"
      aria-orientation={orientation === 'vertical' ? 'vertical' : undefined}
    />
  )
}
