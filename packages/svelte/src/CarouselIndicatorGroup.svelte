<script lang="ts">
  import type { Snippet } from 'svelte'
  import { getCarouselContext } from './carousel-context'
  import { parts } from '@moderno/class-contract'

  let { children }: { children: Snippet<[index: number]> } = $props()
  const api = getCarouselContext()
</script>

<div {...api().getIndicatorGroupProps()} class={parts.carousel.indicatorGroup}>
  {#each api().pageSnapPoints as _, index (index)}
    {@render children(index)}
  {/each}
</div>
