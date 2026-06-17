export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  /** Accessible label announced to assistive tech. */
  label?: string
}

/** Indeterminate loading spinner. Pure CSS, closed-prop. */
export function Spinner({ size = 'md', label = 'Loading' }: SpinnerProps) {
  return <span className={`md-spinner md-spinner--${size}`} role="status" aria-label={label} />
}
