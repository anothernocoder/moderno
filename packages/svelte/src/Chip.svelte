<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    variant = 'neutral',
    removable,
    onRemove,
    removeLabel = 'Remove',
    children,
  }: {
    variant?: 'neutral' | 'solid'
    removable?: boolean
    onRemove?: () => void
    removeLabel?: string
    children?: Snippet
  } = $props()
</script>

<span class={`md-chip md-chip--${variant}`}>
  {@render children?.()}
  {#if removable}
    <button type="button" class="md-chip__remove" aria-label={removeLabel} onclick={onRemove}>×</button>
  {/if}
</span>
