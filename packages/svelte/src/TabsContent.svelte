<script lang="ts">
  import type { Snippet } from 'svelte'
  import { getTabsContext } from './tabs-context'

  let { value, children }: { value: string; children?: Snippet } = $props()
  const api = getTabsContext()
</script>

<div {...api().getContentProps({ value })} class="md-tabs-content">{@render children?.()}</div>
