import type { ReactNode } from 'react'
import { cx, parts, type CalloutVariant } from '@moderno/class-contract'

export interface CalloutProps {
  variant?: CalloutVariant
  title?: ReactNode
  children: ReactNode
}

/** Highlighted block that draws attention to a message or tip. Closed-prop. */
export function Callout({ variant, title, children }: CalloutProps) {
  return (
    <div className={cx.callout({ variant })} role="note">
      {title ? <p className={parts.callout.title}>{title}</p> : null}
      <p className={parts.callout.body}>{children}</p>
    </div>
  )
}
