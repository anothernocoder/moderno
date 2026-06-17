import type { JSX } from 'solid-js'
import { cx, parts, type IndicatorVariant } from '@moderno/class-contract'

export interface IndicatorProps {
  variant?: IndicatorVariant
  pulse?: boolean
  children?: JSX.Element
}

/** Status dot with optional pulse and label. Pure CSS, closed-prop. */
export function Indicator(props: IndicatorProps) {
  const cls = () => cx.indicator({ variant: props.variant, pulse: props.pulse })
  return (
    <span class={cls()}>
      <span class={parts.indicator.dot} />
      {props.children}
    </span>
  )
}
