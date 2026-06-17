import { splitProps, type JSX } from 'solid-js'
import { cx, type ButtonSize, type ButtonVariant } from '@moderno/class-contract'

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Convenience text label; falls back to children. */
  label?: string
}

export function Button(props: ButtonProps) {
  const [local, rest] = splitProps(props, ['variant', 'size', 'label', 'class', 'children'])
  const cls = () => [cx.button({ variant: local.variant, size: local.size }), local.class].filter(Boolean).join(' ')
  return (
    <button class={cls()} {...rest}>
      {local.label ?? local.children}
    </button>
  )
}
