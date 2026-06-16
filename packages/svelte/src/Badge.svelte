<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    variant = 'neutral',
    dot,
    children,
  }: {
    variant?: 'neutral' | 'solid' | 'success' | 'warning' | 'error' | 'info'
    dot?: boolean
    children?: Snippet
  } = $props()
</script>

<span class={`md-badge md-badge--${variant}`}>
  {#if dot}<span class="md-badge__dot"></span>{/if}
  {@render children?.()}
</span>
