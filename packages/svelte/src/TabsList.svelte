<script lang="ts">
  import type { Snippet } from 'svelte'
  import { getTabsContext } from './tabs-context'
  import { parts } from '@moderno/class-contract'

  let { children }: { children?: Snippet } = $props()
  const api = getTabsContext()
</script>

<div {...api().getListProps()} class={parts.tabs.list}>{@render children?.()}</div>
