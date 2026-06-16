<script lang="ts">
  import type { Snippet } from 'svelte'
  import { getSelectContext } from './select-context'

  let { children }: { children?: Snippet } = $props()
  const api = getSelectContext()
</script>

<label {...api().getLabelProps()} class="md-select-label">{@render children?.()}</label>
