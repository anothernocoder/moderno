import { useId, type ReactNode } from 'react'
import * as slider from '@zag-js/slider'
import { useMachine, normalizeProps } from '@zag-js/react'

export interface SliderProps {
  /** Visible label. */
  label?: ReactNode
  /** Uncontrolled initial value. */
  defaultValue?: number
  /** Controlled value. */
  value?: number
  onValueChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  /** Show the current value next to the label. @default true */
  showValue?: boolean
  /** Form field name (for submission). */
  name?: string
}

/** Closed-prop single-thumb Slider (ADR-0003) over the Zag slider machine. */
export function Slider({
  label,
  defaultValue,
  value,
  onValueChange,
  min,
  max,
  step,
  disabled,
  showValue = true,
  name,
}: SliderProps) {
  const service = useMachine(slider.machine, {
    id: useId(),
    defaultValue: defaultValue != null ? [defaultValue] : value == null ? [50] : undefined,
    value: value != null ? [value] : undefined,
    min,
    max,
    step,
    disabled,
    name,
    onValueChange: onValueChange ? (d) => onValueChange(d.value[0]) : undefined,
  })
  const api = slider.connect(service, normalizeProps)

  return (
    <div {...api.getRootProps()} className="md-slider">
      {(label != null || showValue) && (
        <div className="md-slider-header">
          {label != null ? (
            <label {...api.getLabelProps()} className="md-slider-label">
              {label}
            </label>
          ) : (
            <span />
          )}
          {showValue ? (
            <output {...api.getValueTextProps()} className="md-slider-value">
              {api.value[0]}
            </output>
          ) : null}
        </div>
      )}
      <div {...api.getControlProps()} className="md-slider-control">
        <div {...api.getTrackProps()} className="md-slider-track">
          <div {...api.getRangeProps()} className="md-slider-range" />
        </div>
        <div {...api.getThumbProps({ index: 0 })} className="md-slider-thumb">
          <input {...api.getHiddenInputProps({ index: 0 })} />
        </div>
      </div>
    </div>
  )
}
