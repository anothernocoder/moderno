import type { JSX } from 'solid-js'

export interface IndicatorProps {
  variant?: 'neutral' | 'success' | 'warning' | 'error' | 'info'
  pulse?: boolean
  children?: JSX.Element
}

/** Status dot with optional pulse and label. Pure CSS, closed-prop. */
export function Indicator(props: IndicatorProps) {
  const cls = () =>
    ['md-indicator', `md-indicator--${props.variant ?? 'neutral'}`, props.pulse ? 'md-indicator--pulse' : '']
      .filter(Boolean)
      .join(' ')
  return (
    <span class={cls()}>
      <span class="md-indicator__dot" />
      {props.children}
    </span>
  )
}
