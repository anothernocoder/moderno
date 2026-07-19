<script lang="ts">
  import type { Snippet } from 'svelte'
  import * as datepicker from '@zag-js/date-picker'
  import { useMachine, normalizeProps } from '@zag-js/svelte'
  import { setDatePickerContext } from './date-picker-context'
  import { parts } from '@moderno/class-contract'

  let {
    selectionMode,
    defaultValue,
    value = $bindable(),
    min,
    max,
    disabled,
    locale,
    startOfWeek,
    onValueChange,
    children,
  }: {
    /** `'single'` picks one date, `'range'` picks a start/end pair. */
    selectionMode?: 'single' | 'range'
    /** Uncontrolled initial date(s), as ISO 8601 strings (`'2024-01-15'`). */
    defaultValue?: string[]
    /** Controlled selected date(s), as ISO 8601 strings. */
    value?: string[]
    /** Earliest selectable date (ISO 8601). */
    min?: string
    /** Latest selectable date (ISO 8601). */
    max?: string
    disabled?: boolean
    locale?: string
    /** `0` (Sunday) through `6` (Saturday). */
    startOfWeek?: number
    onValueChange?: (value: string[]) => void
    children?: Snippet
  } = $props()

  const id = $props.id()
  const service = useMachine(datepicker.machine, {
    id,
    get selectionMode() {
      return selectionMode
    },
    get defaultValue() {
      return defaultValue?.map((d) => datepicker.parse(d))
    },
    get value() {
      return value?.map((d) => datepicker.parse(d))
    },
    get min() {
      return min ? datepicker.parse(min) : undefined
    },
    get max() {
      return max ? datepicker.parse(max) : undefined
    },
    get disabled() {
      return disabled
    },
    get locale() {
      return locale
    },
    get startOfWeek() {
      return startOfWeek
    },
    onValueChange(d) {
      value = d.valueAsString
      onValueChange?.(d.valueAsString)
    },
  })
  const api = $derived(datepicker.connect(service, normalizeProps))
  setDatePickerContext(() => api)
</script>

<div {...api.getRootProps()} class={parts.datepicker.root}>{@render children?.()}</div>
