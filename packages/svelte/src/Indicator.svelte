<script lang="ts">
  import type { Snippet } from 'svelte'
  import { cx, parts, type IndicatorVariant } from '@moderno/class-contract'

  let {
    variant,
    pulse,
    children,
  }: {
    variant?: IndicatorVariant
    pulse?: boolean
    children?: Snippet
  } = $props()
</script>

<span class={cx.indicator({ variant, pulse })}>
  <span class={parts.indicator.dot}></span>
  {@render children?.()}
</span>
