import { useId, type ReactNode } from 'react'
import * as numberInput from '@zag-js/number-input'
import { useMachine, normalizeProps } from '@zag-js/react'
import { parts } from '@moderno/class-contract'

export interface NumberInputProps {
  /** Visible label. */
  label?: ReactNode
  /** Uncontrolled initial value. */
  defaultValue?: number | string
  /** Controlled value. Kept as string so formatted input is preserved. */
  value?: number | string
  onValueChange?: (value: string, valueAsNumber: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  /** Form field name (for submission). */
  name?: string
  placeholder?: string
}

/** Closed-prop NumberInput (ADR-0003) over the Zag number-input machine. */
export function NumberInput({
  label,
  defaultValue,
  value,
  onValueChange,
  min,
  max,
  step,
  disabled,
  name,
  placeholder,
}: NumberInputProps) {
  const service = useMachine(numberInput.machine, {
    id: useId(),
    defaultValue: defaultValue != null ? String(defaultValue) : undefined,
    value: value != null ? String(value) : undefined,
    min,
    max,
    step,
    disabled,
    name,
    onValueChange: onValueChange ? (d) => onValueChange(d.value, d.valueAsNumber) : undefined,
  })
  const api = numberInput.connect(service, normalizeProps)

  return (
    <div {...api.getRootProps()} className={parts.numberInput.root}>
      {label != null && (
        <label {...api.getLabelProps()} className={parts.numberInput.label}>
          {label}
        </label>
      )}
      <div {...api.getControlProps()} className={parts.numberInput.control}>
        <button {...api.getDecrementTriggerProps()} className={parts.numberInput.decrement}>
          −
        </button>
        <input {...api.getInputProps()} className={parts.numberInput.field} placeholder={placeholder} />
        <button {...api.getIncrementTriggerProps()} className={parts.numberInput.increment}>
          +
        </button>
      </div>
    </div>
  )
}
