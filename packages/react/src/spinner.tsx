import { cx, type SpinnerSize } from '@moderno/class-contract'

export interface SpinnerProps {
  size?: SpinnerSize
  /** Accessible label announced to assistive tech. */
  label?: string
}

/** Indeterminate loading spinner. Pure CSS, closed-prop. */
export function Spinner({ size, label = 'Loading' }: SpinnerProps) {
  return <span className={cx.spinner({ size })} role="status" aria-label={label} />
}
