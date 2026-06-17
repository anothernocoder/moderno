<script lang="ts">
  import type { Snippet } from 'svelte'
  import { getSelectContext } from './select-context'
  import { parts } from '@moderno/class-contract'

  let { children }: { children?: Snippet } = $props()
  const api = getSelectContext()
</script>

<label {...api().getLabelProps()} class={parts.select.label}>{@render children?.()}</label>
