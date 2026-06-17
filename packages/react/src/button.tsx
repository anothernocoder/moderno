import type { ButtonHTMLAttributes } from 'react'
import { cx, type ButtonSize, type ButtonVariant } from '@moderno/class-contract'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Convenience text label; falls back to children. */
  label?: string
}

export function Button({ variant, size, label, className, children, ...props }: ButtonProps) {
  const cls = [cx.button({ variant, size }), className].filter(Boolean).join(' ')
  return (
    <button className={cls} {...props}>
      {label ?? children}
    </button>
  )
}
