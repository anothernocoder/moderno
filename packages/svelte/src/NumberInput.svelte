<script lang="ts">
  import * as numberInput from '@zag-js/number-input'
  import { useMachine, normalizeProps } from '@zag-js/svelte'
  import { parts } from '@moderno/class-contract'

  let {
    label,
    defaultValue,
    value = $bindable(),
    onValueChange,
    min,
    max,
    step,
    disabled,
    name,
    placeholder,
  }: {
    label?: string
    defaultValue?: number | string
    /** Kept as string so formatted input is preserved. */
    value?: number | string
    onValueChange?: (value: string, valueAsNumber: number) => void
    min?: number
    max?: number
    step?: number
    disabled?: boolean
    name?: string
    placeholder?: string
  } = $props()

  const id = $props.id()
  const service = useMachine(numberInput.machine, {
    id,
    get defaultValue() {
      return defaultValue != null ? String(defaultValue) : undefined
    },
    get value() {
      return value != null ? String(value) : undefined
    },
    get min() {
      return min
    },
    get max() {
      return max
    },
    get step() {
      return step
    },
    get disabled() {
      return disabled
    },
    get name() {
      return name
    },
    onValueChange(d) {
      value = d.value
      onValueChange?.(d.value, d.valueAsNumber)
    },
  })
  const api = $derived(numberInput.connect(service, normalizeProps))
</script>

<div {...api.getRootProps()} class={parts.numberInput.root}>
  {#if label != null}
    <label {...api.getLabelProps()} class={parts.numberInput.label}>{label}</label>
  {/if}
  <div {...api.getControlProps()} class={parts.numberInput.control}>
    <button {...api.getDecrementTriggerProps()} class={parts.numberInput.decrement}>−</button>
    <input {...api.getInputProps()} class={parts.numberInput.field} {placeholder} />
    <button {...api.getIncrementTriggerProps()} class={parts.numberInput.increment}>+</button>
  </div>
</div>
