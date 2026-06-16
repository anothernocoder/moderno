<script lang="ts">
  import * as slider from '@zag-js/slider'
  import { useMachine, normalizeProps } from '@zag-js/svelte'

  let {
    label,
    defaultValue,
    value = $bindable(),
    onValueChange,
    min,
    max,
    step,
    disabled,
    showValue = true,
    name,
  }: {
    label?: string
    defaultValue?: number
    value?: number
    onValueChange?: (value: number) => void
    min?: number
    max?: number
    step?: number
    disabled?: boolean
    showValue?: boolean
    name?: string
  } = $props()

  const id = $props.id()
  const service = useMachine(slider.machine, {
    id,
    get defaultValue() {
      return defaultValue != null ? [defaultValue] : value == null ? [50] : undefined
    },
    get value() {
      return value != null ? [value] : undefined
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
      value = d.value[0]
      onValueChange?.(d.value[0])
    },
  })
  const api = $derived(slider.connect(service, normalizeProps))
</script>

<div {...api.getRootProps()} class="md-slider">
  {#if label != null || showValue}
    <div class="md-slider-header">
      {#if label != null}
        <label {...api.getLabelProps()} class="md-slider-label">{label}</label>
      {:else}
        <span></span>
      {/if}
      {#if showValue}
        <output {...api.getValueTextProps()} class="md-slider-value">{api.value[0]}</output>
      {/if}
    </div>
  {/if}
  <div {...api.getControlProps()} class="md-slider-control">
    <div {...api.getTrackProps()} class="md-slider-track">
      <div {...api.getRangeProps()} class="md-slider-range"></div>
    </div>
    <div {...api.getThumbProps({ index: 0 })} class="md-slider-thumb">
      <input {...api.getHiddenInputProps({ index: 0 })} />
    </div>
  </div>
</div>
