export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

/** Indeterminate loading spinner. Pure CSS, closed-prop. */
export function Spinner(props: SpinnerProps) {
  return (
    <span
      class={`md-spinner md-spinner--${props.size ?? 'md'}`}
      role="status"
      aria-label={props.label ?? 'Cargando'}
    />
  )
}
