<script lang="ts">
  import type { Snippet } from 'svelte'
  import { cx, parts, type CalloutVariant } from '@moderno/class-contract'

  let {
    variant,
    title,
    children,
  }: {
    variant?: CalloutVariant
    title?: string
    children?: Snippet
  } = $props()
</script>

<div class={cx.callout({ variant })} role="note">
  {#if title}<p class={parts.callout.title}>{title}</p>{/if}
  <p class={parts.callout.body}>{@render children?.()}</p>
</div>
