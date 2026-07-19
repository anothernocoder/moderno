<script lang="ts">
  import type { Snippet } from 'svelte'
  import { getDatePickerContext } from './date-picker-context'
  import { parts } from '@moderno/class-contract'

  let { children }: { children?: Snippet } = $props()
  const api = getDatePickerContext()
</script>

<div {...api().getControlProps()} class={parts.datepicker.control}>{@render children?.()}</div>
