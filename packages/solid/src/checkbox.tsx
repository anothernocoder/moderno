import { Show, createMemo, createUniqueId, type JSX } from 'solid-js'
import * as checkbox from '@zag-js/checkbox'
import { useMachine, normalizeProps } from '@zag-js/solid'
import { parts } from '@moderno/class-contract'

export type CheckedState = boolean | 'indeterminate'

export interface CheckboxProps {
  label?: JSX.Element
  defaultChecked?: CheckedState
  checked?: CheckedState
  onCheckedChange?: (checked: CheckedState) => void
  disabled?: boolean
  invalid?: boolean
  required?: boolean
  name?: string
  value?: string
}

/** Closed-prop Checkbox (ADR-0003) over the Zag checkbox machine; supports indeterminate. */
export function Checkbox(props: CheckboxProps) {
  const service = useMachine(checkbox.machine, {
    id: createUniqueId(),
    get defaultChecked() {
      return props.defaultChecked
    },
    get checked() {
      return props.checked
    },
    get disabled() {
      return props.disabled
    },
    get invalid() {
      return props.invalid
    },
    get required() {
      return props.required
    },
    get name() {
      return props.name
    },
    get value() {
      return props.value
    },
    onCheckedChange: (d) => props.onCheckedChange?.(d.checked),
  })
  const api = createMemo(() => checkbox.connect(service, normalizeProps))

  return (
    <label {...api().getRootProps()} class={parts.checkbox.root}>
      <input {...api().getHiddenInputProps()} />
      <span {...api().getControlProps()} class={parts.checkbox.control}>
        <span {...api().getIndicatorProps()} class={parts.checkbox.indicator}>
          {api().indeterminate ? '–' : '✓'}
        </span>
      </span>
      <Show when={props.label != null}>
        <span {...api().getLabelProps()} class={parts.checkbox.label}>
          {props.label}
        </span>
      </Show>
    </label>
  )
}
