<script lang="ts">
  import { getCarouselContext } from './carousel-context'
  import { parts } from '@moderno/class-contract'

  let { index }: { index: number } = $props()
  const api = getCarouselContext()
</script>

<button {...api().getIndicatorProps({ index })} class={parts.carousel.indicator}></button>
