import type { ReactNode } from 'react'

export interface CardProps {
  title?: ReactNode
  footer?: ReactNode
  children?: ReactNode
}

/** Container surface that groups related content and actions. Closed-prop. */
export function Card({ title, footer, children }: CardProps) {
  return (
    <div className="md-card">
      {title ? <h3 className="md-card__title">{title}</h3> : null}
      {children ? <div className="md-card__body">{children}</div> : null}
      {footer ? <div className="md-card__footer">{footer}</div> : null}
    </div>
  )
}
