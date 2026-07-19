<script lang="ts">
  import type { Snippet } from 'svelte'
  import { getDatePickerContext } from './date-picker-context'
  import { parts } from '@moderno/class-contract'

  let { children }: { children?: Snippet } = $props()
  const api = getDatePickerContext()
</script>

<button {...api().getTriggerProps()} class={parts.datepicker.trigger}>
  {#if children}{@render children()}{:else}🗓{/if}
</button>
