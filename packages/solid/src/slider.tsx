import { Show, createMemo, createUniqueId, type JSX } from 'solid-js'
import * as slider from '@zag-js/slider'
import { useMachine, normalizeProps } from '@zag-js/solid'

export interface SliderProps {
  label?: JSX.Element
  defaultValue?: number
  value?: number
  onValueChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  showValue?: boolean
  name?: string
}

/** Closed-prop single-thumb Slider (ADR-0003) over the Zag slider machine. */
export function Slider(props: SliderProps) {
  const service = useMachine(slider.machine, {
    id: createUniqueId(),
    get defaultValue() {
      return props.defaultValue != null ? [props.defaultValue] : props.value == null ? [50] : undefined
    },
    get value() {
      return props.value != null ? [props.value] : undefined
    },
    get min() {
      return props.min
    },
    get max() {
      return props.max
    },
    get step() {
      return props.step
    },
    get disabled() {
      return props.disabled
    },
    get name() {
      return props.name
    },
    onValueChange: (d) => props.onValueChange?.(d.value[0]),
  })
  const api = createMemo(() => slider.connect(service, normalizeProps))
  const showValue = () => props.showValue !== false

  return (
    <div {...api().getRootProps()} class="md-slider">
      <Show when={props.label != null || showValue()}>
        <div class="md-slider-header">
          <Show when={props.label != null} fallback={<span />}>
            <label {...api().getLabelProps()} class="md-slider-label">
              {props.label}
            </label>
          </Show>
          <Show when={showValue()}>
            <output {...api().getValueTextProps()} class="md-slider-value">
              {api().value[0]}
            </output>
          </Show>
        </div>
      </Show>
      <div {...api().getControlProps()} class="md-slider-control">
        <div {...api().getTrackProps()} class="md-slider-track">
          <div {...api().getRangeProps()} class="md-slider-range" />
        </div>
        <div {...api().getThumbProps({ index: 0 })} class="md-slider-thumb">
          <input {...api().getHiddenInputProps({ index: 0 })} />
        </div>
      </div>
    </div>
  )
}
