<script lang="ts">
  import type { Snippet } from 'svelte'
  import { getCarouselContext } from './carousel-context'
  import { parts } from '@moderno/class-contract'

  let { children }: { children?: Snippet } = $props()
  const api = getCarouselContext()
</script>

<button {...api().getNextTriggerProps()} class={parts.carousel.nextTrigger}>
  {#if children}{@render children()}{:else}›{/if}
</button>
