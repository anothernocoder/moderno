<script lang="ts">
  import type { Snippet } from 'svelte'
  import { parts } from '@moderno/class-contract'

  let {
    title,
    footer,
    children,
  }: {
    title?: Snippet
    footer?: Snippet
    children?: Snippet
  } = $props()
</script>

<div class={parts.card.root}>
  {#if title}<h3 class={parts.card.title}>{@render title()}</h3>{/if}
  {#if children}<div class={parts.card.body}>{@render children()}</div>{/if}
  {#if footer}<div class={parts.card.footer}>{@render footer()}</div>{/if}
</div>
