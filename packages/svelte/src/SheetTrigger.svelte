<script lang="ts">
  import type { Snippet } from 'svelte'
  import { getSheetContext } from './sheet-context'
  import { cx } from '@moderno/class-contract'

  let { children }: { children?: Snippet } = $props()
  const api = getSheetContext()
</script>

<button {...api().getTriggerProps()} class={cx.button({ variant: 'primary' })}>{@render children?.()}</button>
