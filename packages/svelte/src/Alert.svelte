<script lang="ts">
  import type { Snippet } from 'svelte'
  import { cx, parts, type AlertVariant } from '@moderno/class-contract'

  let {
    variant,
    title,
    children,
  }: {
    variant?: AlertVariant
    title?: string
    children?: Snippet
  } = $props()
</script>

<div class={cx.alert({ variant })} role="alert">
  {#if title}<p class={parts.alert.title}>{title}</p>{/if}
  <p class={parts.alert.body}>{@render children?.()}</p>
</div>
