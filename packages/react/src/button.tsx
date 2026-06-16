import type { ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  /** Convenience text label; falls back to children. */
  label?: string
}

export function Button({ variant = 'primary', size = 'md', label, className, children, ...props }: ButtonProps) {
  const cls = ['md-btn', `md-btn--${variant}`, size !== 'md' && `md-btn--${size}`, className]
    .filter(Boolean)
    .join(' ')
  return (
    <button className={cls} {...props}>
      {label ?? children}
    </button>
  )
}
