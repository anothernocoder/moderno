import { Show, createMemo, createRenderEffect, createUniqueId, type JSX } from 'solid-js'
import * as progress from '@zag-js/progress'
import { useMachine, normalizeProps } from '@zag-js/solid'
import { cx, parts, type ProgressVariant } from '@moderno/class-contract'

export interface ProgressProps {
  label?: JSX.Element
  defaultValue?: number | null
  value?: number | null
  onValueChange?: (value: number | null) => void
  min?: number
  max?: number
  variant?: ProgressVariant
  showValue?: boolean
}

/** Closed-prop Progress (ADR-0003) over the Zag progress machine. Linear + circular, determinate + indeterminate. */
export function Progress(props: ProgressProps) {
  const service = useMachine(progress.machine, {
    id: createUniqueId(),
    get defaultValue() {
      return props.defaultValue
    },
    get value() {
      return props.value
    },
    get min() {
      return props.min
    },
    get max() {
      return props.max
    },
    onValueChange: (d) => props.onValueChange?.(d.value),
  })
  const api = createMemo(() => progress.connect(service, normalizeProps))

  // @zag-js/solid's bindable marks a context value "controlled" via `!= undefined`,
  // which is true for `null` too (loose equality), so an explicit `value={null}`
  // (indeterminate) is treated as uncontrolled and never reaches the machine context.
  // Write it through directly (synchronous, unlike `api().setValue`/`send`, which
  // queue a microtask) so the indeterminate state is present on first paint.
  createRenderEffect(() => {
    if (props.value === null) service.context.set('value', null)
  })

  const variant = () => props.variant ?? 'linear'
  const showValue = () => props.showValue !== false

  return (
    <div {...api().getRootProps()} class={cx.progress({ variant: variant() })}>
      <Show when={props.label != null || showValue()}>
        <div class={parts.progress.header}>
          <Show when={props.label != null} fallback={<span />}>
            <span {...api().getLabelProps()} class={parts.progress.label}>
              {props.label}
            </span>
          </Show>
          <Show when={showValue()}>
            <span {...api().getValueTextProps()} class={parts.progress.valueText}>
              {api().valueAsString}
            </span>
          </Show>
        </div>
      </Show>
      <Show
        when={variant() === 'circular'}
        fallback={
          <div {...api().getTrackProps()} class={parts.progress.track}>
            <div {...api().getRangeProps()} class={parts.progress.range} />
          </div>
        }
      >
        <svg {...api().getCircleProps()} class={parts.progress.circle}>
          <circle {...api().getCircleTrackProps()} class={parts.progress.circleTrack} />
          <circle {...api().getCircleRangeProps()} class={parts.progress.circleRange} />
        </svg>
      </Show>
    </div>
  )
}
