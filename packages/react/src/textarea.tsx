import { useId, type TextareaHTMLAttributes, type ReactNode } from 'react'
import { cx, parts } from '@moderno/class-contract'

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
  const cls = [cx.input({ error: !!error }), parts.field.textarea, className].filter(Boolean).join(' ')
  return (
    <div>
      {label ? (
        <label className={parts.field.label} htmlFor={fieldId}>
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
        <p className={parts.field.error} id={msgId}>
          {error}
        </p>
      ) : hint ? (
        <p className={parts.field.hint} id={msgId}>
          {hint}
        </p>
      ) : null}
    </div>
  )
}
