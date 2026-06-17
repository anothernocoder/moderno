<script lang="ts">
  import type { Snippet } from 'svelte'
  import { getTabsContext } from './tabs-context'
  import { parts } from '@moderno/class-contract'

  let { value, children }: { value: string; children?: Snippet } = $props()
  const api = getTabsContext()
</script>

<div {...api().getContentProps({ value })} class={parts.tabs.content}>{@render children?.()}</div>
