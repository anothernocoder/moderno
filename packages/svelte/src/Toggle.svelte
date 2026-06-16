<script lang="ts">
  import * as zagSwitch from '@zag-js/switch'
  import { useMachine, normalizeProps } from '@zag-js/svelte'

  let {
    label,
    defaultChecked,
    checked = $bindable(),
    onCheckedChange,
    disabled,
    invalid,
    name,
    value,
  }: {
    label?: string
    defaultChecked?: boolean
    checked?: boolean
    onCheckedChange?: (checked: boolean) => void
    disabled?: boolean
    invalid?: boolean
    name?: string
    value?: string
  } = $props()

  const id = $props.id()
  const service = useMachine(zagSwitch.machine, {
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
  const api = $derived(zagSwitch.connect(service, normalizeProps))
</script>

<label {...api.getRootProps()} class="md-toggle">
  <input {...api.getHiddenInputProps()} />
  <span {...api.getControlProps()} class="md-toggle-control">
    <span {...api.getThumbProps()} class="md-toggle-thumb"></span>
  </span>
  {#if label != null}
    <span {...api.getLabelProps()} class="md-toggle-label">{label}</span>
  {/if}
</label>
