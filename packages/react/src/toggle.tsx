import { useId, type ReactNode } from 'react'
import * as zagSwitch from '@zag-js/switch'
import { useMachine, normalizeProps } from '@zag-js/react'
import { parts } from '@moderno/class-contract'

export interface ToggleProps {
  /** Visible label next to the switch. */
  label?: ReactNode
  /** Uncontrolled initial checked state. */
  defaultChecked?: boolean
  /** Controlled checked state. */
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  invalid?: boolean
  /** Form field name (for submission). */
  name?: string
  value?: string
}

/** Closed-prop Toggle (ADR-0003) over the Zag switch machine. */
export function Toggle({ label, defaultChecked, checked, onCheckedChange, disabled, invalid, name, value }: ToggleProps) {
  const service = useMachine(zagSwitch.machine, {
    id: useId(),
    defaultChecked,
    checked,
    disabled,
    invalid,
    name,
    value,
    onCheckedChange: onCheckedChange ? (d) => onCheckedChange(d.checked) : undefined,
  })
  const api = zagSwitch.connect(service, normalizeProps)

  return (
    <label {...api.getRootProps()} className={parts.toggle.root}>
      <input {...api.getHiddenInputProps()} />
      <span {...api.getControlProps()} className={parts.toggle.control}>
        <span {...api.getThumbProps()} className={parts.toggle.thumb} />
      </span>
      {label != null ? (
        <span {...api.getLabelProps()} className={parts.toggle.label}>
          {label}
        </span>
      ) : null}
    </label>
  )
}
