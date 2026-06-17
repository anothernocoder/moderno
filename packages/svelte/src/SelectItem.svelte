<script lang="ts">
  import type { Snippet } from 'svelte'
  import { getSelectContext, type SelectItem } from './select-context'
  import { parts } from '@moderno/class-contract'

  let { item, children }: { item: SelectItem; children?: Snippet } = $props()
  const api = getSelectContext()
</script>

<li {...api().getItemProps({ item })} class={parts.select.item}>
  <span {...api().getItemTextProps({ item })} class={parts.select.itemText}>
    {#if children}{@render children()}{:else}{item.label}{/if}
  </span>
  <span {...api().getItemIndicatorProps({ item })} class={parts.select.itemIndicator} aria-hidden="true">✓</span>
</li>
