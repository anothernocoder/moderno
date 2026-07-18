import { Show, createMemo, createUniqueId, type JSX } from 'solid-js'
import * as numberInput from '@zag-js/number-input'
import { useMachine, normalizeProps } from '@zag-js/solid'
import { parts } from '@moderno/class-contract'

export interface NumberInputProps {
  /** Visible label. */
  label?: JSX.Element
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
export function NumberInput(props: NumberInputProps) {
  const service = useMachine(numberInput.machine, {
    id: createUniqueId(),
    get defaultValue() {
      return props.defaultValue != null ? String(props.defaultValue) : undefined
    },
    get value() {
      return props.value != null ? String(props.value) : undefined
    },
    get min() {
      return props.min
    },
    get max() {
      return props.max
    },
    get step() {
      return props.step
    },
    get disabled() {
      return props.disabled
    },
    get name() {
      return props.name
    },
    onValueChange(d) {
      props.onValueChange?.(d.value, d.valueAsNumber)
    },
  })
  const api = createMemo(() => numberInput.connect(service, normalizeProps))

  return (
    <div {...api().getRootProps()} class={parts.numberInput.root}>
      <Show when={props.label != null}>
        <label {...api().getLabelProps()} class={parts.numberInput.label}>
          {props.label}
        </label>
      </Show>
      <div {...api().getControlProps()} class={parts.numberInput.control}>
        <button {...api().getDecrementTriggerProps()} class={parts.numberInput.decrement}>
          −
        </button>
        <input {...api().getInputProps()} class={parts.numberInput.field} placeholder={props.placeholder} />
        <button {...api().getIncrementTriggerProps()} class={parts.numberInput.increment}>
          +
        </button>
      </div>
    </div>
  )
}
