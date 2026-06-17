import { cx, type SpinnerSize } from '@moderno/class-contract'

export interface SpinnerProps {
  size?: SpinnerSize
  label?: string
}

/** Indeterminate loading spinner. Pure CSS, closed-prop. */
export function Spinner(props: SpinnerProps) {
  return (
    <span
      class={cx.spinner({ size: props.size })}
      role="status"
      aria-label={props.label ?? 'Loading'}
    />
  )
}
