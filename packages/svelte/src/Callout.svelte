<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    variant = 'info',
    title,
    children,
  }: {
    variant?: 'info' | 'success' | 'warning' | 'error'
    title?: string
    children?: Snippet
  } = $props()
</script>

<div class={`md-callout md-callout--${variant}`} role="note">
  {#if title}<p class="md-callout__title">{title}</p>{/if}
  <p class="md-callout__body">{@render children?.()}</p>
</div>
