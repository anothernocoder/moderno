<script lang="ts">
  import type { Snippet } from 'svelte'
  import { getTabsContext } from './tabs-context'

  let {
    value,
    disabled,
    children,
  }: {
    value: string
    disabled?: boolean
    children?: Snippet
  } = $props()
  const api = getTabsContext()
</script>

<button {...api().getTriggerProps({ value, disabled })} class="md-tabs-trigger">{@render children?.()}</button>
