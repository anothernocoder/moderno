<script lang="ts">
  import type { Snippet } from 'svelte'
  import { getTabsContext } from './tabs-context'
  import { parts } from '@moderno/class-contract'

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

<button {...api().getTriggerProps({ value, disabled })} class={parts.tabs.trigger}>{@render children?.()}</button>
