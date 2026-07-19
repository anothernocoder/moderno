<script lang="ts">
  import type { Snippet } from 'svelte'
  import { getCarouselContext } from './carousel-context'
  import { parts } from '@moderno/class-contract'

  let { index, children }: { index: number; children?: Snippet } = $props()
  const api = getCarouselContext()
</script>

<div {...api().getItemProps({ index })} class={parts.carousel.item}>{@render children?.()}</div>
