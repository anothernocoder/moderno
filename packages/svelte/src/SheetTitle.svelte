<script lang="ts">
  import type { Snippet } from 'svelte'
  import { getSheetContext } from './sheet-context'
  import { parts } from '@moderno/class-contract'

  let { children }: { children?: Snippet } = $props()
  const api = getSheetContext()
</script>

<h2 {...api().getTitleProps()} class={parts.sheet.title}>{@render children?.()}</h2>
