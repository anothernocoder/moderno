<script lang="ts">
  import * as radio from '@zag-js/radio-group'
  import { useMachine, normalizeProps } from '@zag-js/svelte'

  interface RadioOption {
    value: string
    label?: string
    disabled?: boolean
  }

  let {
    options,
    label,
    defaultValue,
    value = $bindable(),
    onValueChange,
    disabled,
    invalid,
    orientation,
    name,
  }: {
    options: RadioOption[]
    label?: string
    defaultValue?: string
    value?: string
    onValueChange?: (value: string | null) => void
    disabled?: boolean
    invalid?: boolean
    orientation?: 'horizontal' | 'vertical'
    name?: string
  } = $props()

  const id = $props.id()
  const service = useMachine(radio.machine, {
    id,
    get defaultValue() {
      return defaultValue
    },
    get value() {
      return value
    },
    get disabled() {
      return disabled
    },
    get invalid() {
      return invalid
    },
    get orientation() {
      return orientation
    },
    get name() {
      return name
    },
    onValueChange(d) {
      value = d.value ?? undefined
      onValueChange?.(d.value)
    },
  })
  const api = $derived(radio.connect(service, normalizeProps))
</script>

<div {...api.getRootProps()} class="md-radio">
  {#if label != null}
    <span {...api.getLabelProps()} class="md-radio-label">{label}</span>
  {/if}
  {#each options as opt (opt.value)}
    <label {...api.getItemProps({ value: opt.value, disabled: opt.disabled })} class="md-radio-item">
      <span {...api.getItemControlProps({ value: opt.value, disabled: opt.disabled })} class="md-radio-control"></span>
      <span {...api.getItemTextProps({ value: opt.value, disabled: opt.disabled })} class="md-radio-item-text"
        >{opt.label ?? opt.value}</span
      >
      <input {...api.getItemHiddenInputProps({ value: opt.value, disabled: opt.disabled })} />
    </label>
  {/each}
</div>
