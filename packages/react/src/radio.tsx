import { useId, type ReactNode } from 'react'
import * as radio from '@zag-js/radio-group'
import { useMachine, normalizeProps } from '@zag-js/react'
import { parts } from '@moderno/class-contract'

export interface RadioOption {
  value: string
  label: ReactNode
  disabled?: boolean
}

export interface RadioProps {
  /** The mutually-exclusive options. */
  options: RadioOption[]
  /** Group label. */
  label?: ReactNode
  /** Uncontrolled initial value. */
  defaultValue?: string
  /** Controlled value. */
  value?: string
  onValueChange?: (value: string | null) => void
  disabled?: boolean
  invalid?: boolean
  orientation?: 'horizontal' | 'vertical'
  /** Form field name (for submission). */
  name?: string
}

/** Closed-prop Radio (ADR-0003) over the Zag radio-group machine. */
export function Radio({
  options,
  label,
  defaultValue,
  value,
  onValueChange,
  disabled,
  invalid,
  orientation,
  name,
}: RadioProps) {
  const service = useMachine(radio.machine, {
    id: useId(),
    defaultValue,
    value,
    disabled,
    invalid,
    orientation,
    name,
    onValueChange: onValueChange ? (d) => onValueChange(d.value) : undefined,
  })
  const api = radio.connect(service, normalizeProps)

  return (
    <div {...api.getRootProps()} className={parts.radio.root}>
      {label != null ? (
        <span {...api.getLabelProps()} className={parts.radio.label}>
          {label}
        </span>
      ) : null}
      {options.map((opt) => {
        const item = { value: opt.value, disabled: opt.disabled }
        return (
          <label key={opt.value} {...api.getItemProps(item)} className={parts.radio.item}>
            <span {...api.getItemControlProps(item)} className={parts.radio.control} />
            <span {...api.getItemTextProps(item)} className={parts.radio.itemText}>
              {opt.label}
            </span>
            <input {...api.getItemHiddenInputProps(item)} />
          </label>
        )
      })}
    </div>
  )
}
