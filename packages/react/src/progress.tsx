import { useId, type ReactNode } from 'react'
import * as progress from '@zag-js/progress'
import { useMachine, normalizeProps } from '@zag-js/react'
import { cx, parts, type ProgressVariant } from '@moderno/class-contract'

export interface ProgressProps {
  /** Visible label. */
  label?: ReactNode
  /** Uncontrolled initial value. Pass `null` for an indeterminate bar. @default 50 */
  defaultValue?: number | null
  /** Controlled value. Pass `null` for an indeterminate bar. */
  value?: number | null
  onValueChange?: (value: number | null) => void
  min?: number
  max?: number
  /** Linear bar or circular ring. @default 'linear' */
  variant?: ProgressVariant
  /** Show the formatted value text next to the label. @default true */
  showValue?: boolean
}

/** Closed-prop Progress (ADR-0003) over the Zag progress machine. Linear + circular, determinate + indeterminate. */
export function Progress({
  label,
  defaultValue,
  value,
  onValueChange,
  min,
  max,
  variant = 'linear',
  showValue = true,
}: ProgressProps) {
  const service = useMachine(progress.machine, {
    id: useId(),
    defaultValue,
    value,
    min,
    max,
    onValueChange: onValueChange ? (d) => onValueChange(d.value) : undefined,
  })
  const api = progress.connect(service, normalizeProps)

  return (
    <div {...api.getRootProps()} className={cx.progress({ variant })}>
      {(label != null || showValue) && (
        <div className={parts.progress.header}>
          {label != null ? (
            <span {...api.getLabelProps()} className={parts.progress.label}>
              {label}
            </span>
          ) : (
            <span />
          )}
          {showValue ? (
            <span {...api.getValueTextProps()} className={parts.progress.valueText}>
              {api.valueAsString}
            </span>
          ) : null}
        </div>
      )}
      {variant === 'circular' ? (
        <svg {...api.getCircleProps()} className={parts.progress.circle}>
          <circle {...api.getCircleTrackProps()} className={parts.progress.circleTrack} />
          <circle {...api.getCircleRangeProps()} className={parts.progress.circleRange} />
        </svg>
      ) : (
        <div {...api.getTrackProps()} className={parts.progress.track}>
          <div {...api.getRangeProps()} className={parts.progress.range} />
        </div>
      )}
    </div>
  )
}
