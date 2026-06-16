<script lang="ts">
  import type { Snippet } from 'svelte'
  import { portal } from '@zag-js/svelte'
  import { getSelectContext } from './select-context'

  let { children }: { children?: Snippet } = $props()
  const api = getSelectContext()
</script>

{#if api().open}
  <div use:portal {...api().getPositionerProps()} class="md-select-positioner">
    <ul {...api().getContentProps()} class="md-select-content">{@render children?.()}</ul>
  </div>
{/if}
