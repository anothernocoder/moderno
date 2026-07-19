<script lang="ts">
  import type { Snippet } from 'svelte'
  import { getCarouselContext } from './carousel-context'
  import { parts } from '@moderno/class-contract'

  let { children }: { children?: Snippet } = $props()
  const api = getCarouselContext()
</script>

<div {...api().getItemGroupProps()} class={parts.carousel.itemGroup}>{@render children?.()}</div>
