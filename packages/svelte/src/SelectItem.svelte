<script lang="ts">
  import type { Snippet } from 'svelte'
  import { getSelectContext, type SelectItem } from './select-context'

  let { item, children }: { item: SelectItem; children?: Snippet } = $props()
  const api = getSelectContext()
</script>

<li {...api().getItemProps({ item })} class="md-select-item">
  <span {...api().getItemTextProps({ item })} class="md-select-item-text">
    {#if children}{@render children()}{:else}{item.label}{/if}
  </span>
  <span {...api().getItemIndicatorProps({ item })} class="md-select-item-indicator" aria-hidden="true">✓</span>
</li>
