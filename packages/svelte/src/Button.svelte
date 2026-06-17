<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import { cx, type ButtonSize, type ButtonVariant } from '@moderno/class-contract'

  let {
    variant,
    size,
    label,
    children,
    ...rest
  }: {
    variant?: ButtonVariant
    size?: ButtonSize
    label?: string
    children?: Snippet
  } & HTMLButtonAttributes = $props()
</script>

<button class={cx.button({ variant, size })} {...rest}>
  {#if label}{label}{:else}{@render children?.()}{/if}
</button>
