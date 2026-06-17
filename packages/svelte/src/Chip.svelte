<script lang="ts">
  import type { Snippet } from 'svelte'
  import { cx, parts, type ChipVariant } from '@moderno/class-contract'

  let {
    variant,
    removable,
    onRemove,
    removeLabel = 'Remove',
    children,
  }: {
    variant?: ChipVariant
    removable?: boolean
    onRemove?: () => void
    removeLabel?: string
    children?: Snippet
  } = $props()
</script>

<span class={cx.chip({ variant })}>
  {@render children?.()}
  {#if removable}
    <button type="button" class={parts.chip.remove} aria-label={removeLabel} onclick={onRemove}>×</button>
  {/if}
</span>
