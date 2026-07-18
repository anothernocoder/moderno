<script lang="ts">
  import type { Snippet } from 'svelte'
  import { getSheetContext } from './sheet-context'
  import { parts } from '@moderno/class-contract'

  let { closeLabel = 'Close', children }: { closeLabel?: string; children?: Snippet } = $props()
  const api = getSheetContext()
</script>

<button {...api().getCloseTriggerProps()} class={parts.sheet.close} aria-label={closeLabel}>
  {#if children}{@render children()}{:else}✕{/if}
</button>
