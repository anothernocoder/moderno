<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    variant = 'neutral',
    removable,
    onRemove,
    children,
  }: {
    variant?: 'neutral' | 'solid'
    removable?: boolean
    onRemove?: () => void
    children?: Snippet
  } = $props()
</script>

<span class={`md-chip md-chip--${variant}`}>
  {@render children?.()}
  {#if removable}
    <button type="button" class="md-chip__remove" aria-label="Quitar" onclick={onRemove}>×</button>
  {/if}
</span>
