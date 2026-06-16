import { For, Show, createMemo, createUniqueId, type JSX } from 'solid-js'
import * as radio from '@zag-js/radio-group'
import { useMachine, normalizeProps } from '@zag-js/solid'

export interface RadioOption {
  value: string
  label?: JSX.Element
  disabled?: boolean
}

export interface RadioProps {
  options: RadioOption[]
  label?: JSX.Element
  defaultValue?: string
  value?: string
  onValueChange?: (value: string | null) => void
  disabled?: boolean
  invalid?: boolean
  orientation?: 'horizontal' | 'vertical'
  name?: string
}

/** Closed-prop Radio (ADR-0003) over the Zag radio-group machine. */
export function Radio(props: RadioProps) {
  const service = useMachine(radio.machine, {
    id: createUniqueId(),
    get defaultValue() {
      return props.defaultValue
    },
    get value() {
      return props.value
    },
    get disabled() {
      return props.disabled
    },
    get invalid() {
      return props.invalid
    },
    get orientation() {
      return props.orientation
    },
    get name() {
      return props.name
    },
    onValueChange: (d) => props.onValueChange?.(d.value),
  })
  const api = createMemo(() => radio.connect(service, normalizeProps))

  return (
    <div {...api().getRootProps()} class="md-radio">
      <Show when={props.label != null}>
        <span {...api().getLabelProps()} class="md-radio-label">
          {props.label}
        </span>
      </Show>
      <For each={props.options}>
        {(opt) => {
          const item = () => ({ value: opt.value, disabled: opt.disabled })
          return (
            <label {...api().getItemProps(item())} class="md-radio-item">
              <span {...api().getItemControlProps(item())} class="md-radio-control" />
              <span {...api().getItemTextProps(item())} class="md-radio-item-text">
                {opt.label ?? opt.value}
              </span>
              <input {...api().getItemHiddenInputProps(item())} />
            </label>
          )
        }}
      </For>
    </div>
  )
}
