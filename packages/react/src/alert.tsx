import type { ReactNode } from 'react'
import { cx, parts, type AlertVariant } from '@moderno/class-contract'

export interface AlertProps {
  variant?: AlertVariant
  title?: ReactNode
  children: ReactNode
}

/** Inline feedback message (info/success/warning/error). Closed-prop, pure CSS. */
export function Alert({ variant, title, children }: AlertProps) {
  return (
    <div className={cx.alert({ variant })} role="alert">
      {title ? <p className={parts.alert.title}>{title}</p> : null}
      <p className={parts.alert.body}>{children}</p>
    </div>
  )
}
