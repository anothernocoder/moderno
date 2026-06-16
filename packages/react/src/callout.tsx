import type { ReactNode } from 'react'

export interface CalloutProps {
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: ReactNode
  children: ReactNode
}

/** Highlighted block that draws attention to a message or tip. Closed-prop. */
export function Callout({ variant = 'info', title, children }: CalloutProps) {
  return (
    <div className={`md-callout md-callout--${variant}`} role="note">
      {title ? <p className="md-callout__title">{title}</p> : null}
      <p className="md-callout__body">{children}</p>
    </div>
  )
}
