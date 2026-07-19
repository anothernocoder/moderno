<script lang="ts">
  import * as progress from '@zag-js/progress'
  import { useMachine, normalizeProps } from '@zag-js/svelte'
  import { cx, parts, type ProgressVariant } from '@moderno/class-contract'

  let {
    label,
    defaultValue,
    value = $bindable(),
    onValueChange,
    min,
    max,
    variant = 'linear',
    showValue = true,
  }: {
    label?: string
    defaultValue?: number | null
    value?: number | null
    onValueChange?: (value: number | null) => void
    min?: number
    max?: number
    variant?: ProgressVariant
    showValue?: boolean
  } = $props()

  const id = $props.id()
  const service = useMachine(progress.machine, {
    id,
    get defaultValue() {
      return defaultValue
    },
    get value() {
      return value
    },
    get min() {
      return min
    },
    get max() {
      return max
    },
    onValueChange(d) {
      value = d.value
      onValueChange?.(d.value)
    },
  })
  const api = $derived(progress.connect(service, normalizeProps))
</script>

<div {...api.getRootProps()} class={cx.progress({ variant })}>
  {#if label != null || showValue}
    <div class={parts.progress.header}>
      {#if label != null}
        <span {...api.getLabelProps()} class={parts.progress.label}>{label}</span>
      {:else}
        <span></span>
      {/if}
      {#if showValue}
        <span {...api.getValueTextProps()} class={parts.progress.valueText}>{api.valueAsString}</span>
      {/if}
    </div>
  {/if}
  {#if variant === 'circular'}
    <svg {...api.getCircleProps()} class={parts.progress.circle}>
      <circle {...api.getCircleTrackProps()} class={parts.progress.circleTrack} />
      <circle {...api.getCircleRangeProps()} class={parts.progress.circleRange} />
    </svg>
  {:else}
    <div {...api.getTrackProps()} class={parts.progress.track}>
      <div {...api.getRangeProps()} class={parts.progress.range}></div>
    </div>
  {/if}
</div>
