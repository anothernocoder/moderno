import { useId, type ReactNode } from 'react'
import * as checkbox from '@zag-js/checkbox'
import { useMachine, normalizeProps } from '@zag-js/react'
import { parts } from '@moderno/class-contract'

export type CheckedState = boolean | 'indeterminate'

export interface CheckboxProps {
  /** Visible label next to the box. */
  label?: ReactNode
  /** Uncontrolled initial checked state. Use `'indeterminate'` for the mixed state. */
  defaultChecked?: CheckedState
  /** Controlled checked state. */
  checked?: CheckedState
  onCheckedChange?: (checked: CheckedState) => void
  disabled?: boolean
  invalid?: boolean
  required?: boolean
  /** Form field name (for submission). */
  name?: string
  value?: string
}

/** Closed-prop Checkbox (ADR-0003) over the Zag checkbox machine; supports indeterminate. */
export function Checkbox({
  label,
  defaultChecked,
  checked,
  onCheckedChange,
  disabled,
  invalid,
  required,
  name,
  value,
}: CheckboxProps) {
  const service = useMachine(checkbox.machine, {
    id: useId(),
    defaultChecked,
    checked,
    disabled,
    invalid,
    required,
    name,
    value,
    onCheckedChange: onCheckedChange ? (d) => onCheckedChange(d.checked) : undefined,
  })
  const api = checkbox.connect(service, normalizeProps)

  return (
    <label {...api.getRootProps()} className={parts.checkbox.root}>
      <input {...api.getHiddenInputProps()} />
      <span {...api.getControlProps()} className={parts.checkbox.control}>
        <span {...api.getIndicatorProps()} className={parts.checkbox.indicator}>
          {api.indeterminate ? '–' : '✓'}
        </span>
      </span>
      {label != null ? (
        <span {...api.getLabelProps()} className={parts.checkbox.label}>
          {label}
        </span>
      ) : null}
    </label>
  )
}
