<script lang="ts">
  import type { Snippet } from 'svelte'
  import { getCarouselContext } from './carousel-context'
  import { parts } from '@moderno/class-contract'

  let { children }: { children?: Snippet } = $props()
  const api = getCarouselContext()
</script>

<button {...api().getPrevTriggerProps()} class={parts.carousel.prevTrigger}>
  {#if children}{@render children()}{:else}‹{/if}
</button>
