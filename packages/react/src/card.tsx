import type { ReactNode } from 'react'
import { parts } from '@moderno/class-contract'

export interface CardProps {
  title?: ReactNode
  footer?: ReactNode
  children?: ReactNode
}

/** Container surface that groups related content and actions. Closed-prop. */
export function Card({ title, footer, children }: CardProps) {
  return (
    <div className={parts.card.root}>
      {title ? <h3 className={parts.card.title}>{title}</h3> : null}
      {children ? <div className={parts.card.body}>{children}</div> : null}
      {footer ? <div className={parts.card.footer}>{footer}</div> : null}
    </div>
  )
}
