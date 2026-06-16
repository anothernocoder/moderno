<script lang="ts">
  import type { Snippet } from 'svelte'

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

<div class="md-card">
  {#if title}<h3 class="md-card__title">{@render title()}</h3>{/if}
  {#if children}<div class="md-card__body">{@render children()}</div>{/if}
  {#if footer}<div class="md-card__footer">{@render footer()}</div>{/if}
</div>
