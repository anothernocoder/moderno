<script lang="ts">
  import type { Snippet } from 'svelte'
  import { portal } from '@zag-js/svelte'
  import { getSelectContext } from './select-context'
  import { parts } from '@moderno/class-contract'

  let { children }: { children?: Snippet } = $props()
  const api = getSelectContext()
</script>

{#if api().open}
  <div use:portal {...api().getPositionerProps()} class={parts.select.positioner}>
    <ul {...api().getContentProps()} class={parts.select.content}>{@render children?.()}</ul>
  </div>
{/if}
