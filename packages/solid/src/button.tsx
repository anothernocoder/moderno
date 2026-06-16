import { splitProps, type JSX } from 'solid-js'

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  /** Convenience text label; falls back to children. */
  label?: string
}

export function Button(props: ButtonProps) {
  const [local, rest] = splitProps(props, ['variant', 'size', 'label', 'class', 'children'])
  const cls = () =>
    ['md-btn', `md-btn--${local.variant ?? 'primary'}`, local.size && local.size !== 'md' ? `md-btn--${local.size}` : '', local.class]
      .filter(Boolean)
      .join(' ')
  return (
    <button class={cls()} {...rest}>
      {local.label ?? local.children}
    </button>
  )
}
