<script lang="ts">
  import * as checkbox from '@zag-js/checkbox'
  import { useMachine, normalizeProps } from '@zag-js/svelte'
  import { parts } from '@moderno/class-contract'

  type CheckedState = boolean | 'indeterminate'

  let {
    label,
    defaultChecked,
    checked = $bindable(),
    onCheckedChange,
    disabled,
    invalid,
    required,
    name,
    value,
  }: {
    label?: string
    defaultChecked?: CheckedState
    checked?: CheckedState
    onCheckedChange?: (checked: CheckedState) => void
    disabled?: boolean
    invalid?: boolean
    required?: boolean
    name?: string
    value?: string
  } = $props()

  const id = $props.id()
  const service = useMachine(checkbox.machine, {
    id,
    get defaultChecked() {
      return defaultChecked
    },
    get checked() {
      return checked
    },
    get disabled() {
      return disabled
    },
    get invalid() {
      return invalid
    },
    get required() {
      return required
    },
    get name() {
      return name
    },
    get value() {
      return value
    },
    onCheckedChange(d) {
      checked = d.checked
      onCheckedChange?.(d.checked)
    },
  })
  const api = $derived(checkbox.connect(service, normalizeProps))
</script>

<label {...api.getRootProps()} class={parts.checkbox.root}>
  <input {...api.getHiddenInputProps()} />
  <span {...api.getControlProps()} class={parts.checkbox.control}>
    <span {...api.getIndicatorProps()} class={parts.checkbox.indicator}>{api.indeterminate ? '–' : '✓'}</span>
  </span>
  {#if label != null}
    <span {...api.getLabelProps()} class={parts.checkbox.label}>{label}</span>
  {/if}
</label>
