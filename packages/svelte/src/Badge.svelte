<script lang="ts">
  import type { Snippet } from 'svelte'
  import { cx, parts, type BadgeVariant } from '@moderno/class-contract'

  let {
    variant,
    dot,
    children,
  }: {
    variant?: BadgeVariant
    dot?: boolean
    children?: Snippet
  } = $props()
</script>

<span class={cx.badge({ variant })}>
  {#if dot}<span class={parts.badge.dot}></span>{/if}
  {@render children?.()}
</span>
