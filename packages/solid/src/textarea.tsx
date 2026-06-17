import { splitProps, createUniqueId, Show, type JSX } from 'solid-js'
import { cx, parts } from '@moderno/class-contract'

export interface TextareaProps extends Omit<JSX.TextareaHTMLAttributes<HTMLTextAreaElement>, 'children'> {
  label?: JSX.Element
  hint?: JSX.Element
  error?: JSX.Element
}

/** Multi-line text field with label, hint and error. Pure CSS, closed-prop. */
export function Textarea(props: TextareaProps) {
  const [local, rest] = splitProps(props, ['label', 'hint', 'error', 'id', 'class'])
  const fallbackId = createUniqueId()
  const fieldId = () => local.id ?? fallbackId
  const msgId = () => `${fieldId()}-msg`
  const cls = () =>
    [cx.input({ error: !!local.error }), parts.field.textarea, local.class].filter(Boolean).join(' ')
  return (
    <div>
      <Show when={local.label}>
        <label class={parts.field.label} for={fieldId()}>
          {local.label}
        </label>
      </Show>
      <textarea
        id={fieldId()}
        class={cls()}
        aria-invalid={local.error ? true : undefined}
        aria-describedby={local.error || local.hint ? msgId() : undefined}
        {...rest}
      />
      <Show
        when={local.error}
        fallback={
          <Show when={local.hint}>
            <p class={parts.field.hint} id={msgId()}>
              {local.hint}
            </p>
          </Show>
        }
      >
        <p class={parts.field.error} id={msgId()}>
          {local.error}
        </p>
      </Show>
    </div>
  )
}
