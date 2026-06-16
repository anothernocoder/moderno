<script lang="ts">
  import type { Snippet } from 'svelte'
  import { getTabsContext } from './tabs-context'

  let { children }: { children?: Snippet } = $props()
  const api = getTabsContext()
</script>

<div {...api().getListProps()} class="md-tabs-list">{@render children?.()}</div>
