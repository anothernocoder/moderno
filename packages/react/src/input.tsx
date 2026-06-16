import { useId, type InputHTMLAttributes, type ReactNode } from 'react'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'children'> {
  label?: ReactNode
  hint?: ReactNode
  /** Error message; replaces the hint and flags the field invalid. */
  error?: ReactNode
}

/** Single-line text field with label, hint and error. Pure CSS, closed-prop. */
export function Input({ label, hint, error, id, className, ...props }: InputProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const msgId = `${inputId}-msg`
  const cls = ['md-input', error && 'md-input--error', className].filter(Boolean).join(' ')
  return (
    <div>
      {label ? (
        <label className="md-field-label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        className={cls}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? msgId : undefined}
        {...props}
      />
      {error ? (
        <p className="md-field-error" id={msgId}>
          {error}
        </p>
      ) : hint ? (
        <p className="md-field-hint" id={msgId}>
          {hint}
        </p>
      ) : null}
    </div>
  )
}
