import { Show, createMemo, createUniqueId, type JSX } from 'solid-js'
import * as zagSwitch from '@zag-js/switch'
import { useMachine, normalizeProps } from '@zag-js/solid'

export interface ToggleProps {
  label?: JSX.Element
  defaultChecked?: boolean
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  invalid?: boolean
  name?: string
  value?: string
}

/** Closed-prop Toggle (ADR-0003) over the Zag switch machine. */
export function Toggle(props: ToggleProps) {
  const service = useMachine(zagSwitch.machine, {
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
    get name() {
      return props.name
    },
    get value() {
      return props.value
    },
    onCheckedChange: (d) => props.onCheckedChange?.(d.checked),
  })
  const api = createMemo(() => zagSwitch.connect(service, normalizeProps))

  return (
    <label {...api().getRootProps()} class="md-toggle">
      <input {...api().getHiddenInputProps()} />
      <span {...api().getControlProps()} class="md-toggle-control">
        <span {...api().getThumbProps()} class="md-toggle-thumb" />
      </span>
      <Show when={props.label != null}>
        <span {...api().getLabelProps()} class="md-toggle-label">
          {props.label}
        </span>
      </Show>
    </label>
  )
}
