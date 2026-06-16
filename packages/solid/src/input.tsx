import { splitProps, createUniqueId, Show, type JSX } from 'solid-js'

export interface InputProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'children'> {
  label?: JSX.Element
  hint?: JSX.Element
  error?: JSX.Element
}

/** Single-line text field with label, hint and error. Pure CSS, closed-prop. */
export function Input(props: InputProps) {
  const [local, rest] = splitProps(props, ['label', 'hint', 'error', 'id', 'class'])
  const fallbackId = createUniqueId()
  const inputId = () => local.id ?? fallbackId
  const msgId = () => `${inputId()}-msg`
  const cls = () => ['md-input', local.error ? 'md-input--error' : '', local.class].filter(Boolean).join(' ')
  return (
    <div>
      <Show when={local.label}>
        <label class="md-field-label" for={inputId()}>
          {local.label}
        </label>
      </Show>
      <input
        id={inputId()}
        class={cls()}
        aria-invalid={local.error ? true : undefined}
        aria-describedby={local.error || local.hint ? msgId() : undefined}
        {...rest}
      />
      <Show when={local.error} fallback={<Show when={local.hint}><p class="md-field-hint" id={msgId()}>{local.hint}</p></Show>}>
        <p class="md-field-error" id={msgId()}>
          {local.error}
        </p>
      </Show>
    </div>
  )
}
