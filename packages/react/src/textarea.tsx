import { useId, type TextareaHTMLAttributes, type ReactNode } from 'react'

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'children'> {
  label?: ReactNode
  hint?: ReactNode
  /** Error message; replaces the hint and flags the field invalid. */
  error?: ReactNode
}

/** Multi-line text field with label, hint and error. Pure CSS, closed-prop. */
export function Textarea({ label, hint, error, id, className, ...props }: TextareaProps) {
  const autoId = useId()
  const fieldId = id ?? autoId
  const msgId = `${fieldId}-msg`
  const cls = ['md-input', 'md-textarea', error && 'md-input--error', className].filter(Boolean).join(' ')
  return (
    <div>
      {label ? (
        <label className="md-field-label" htmlFor={fieldId}>
          {label}
        </label>
      ) : null}
      <textarea
        id={fieldId}
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
