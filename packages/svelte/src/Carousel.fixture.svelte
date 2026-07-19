<script lang="ts">
  import { Carousel } from './index'

  let {
    orientation,
    onPageChange,
  }: {
    orientation?: 'horizontal' | 'vertical'
    onPageChange?: (page: number) => void
  } = $props()
</script>

<Carousel.Root slideCount={3} {orientation} {onPageChange}>
  <Carousel.Control>
    <Carousel.PrevTrigger>Prev</Carousel.PrevTrigger>
    <Carousel.NextTrigger>Next</Carousel.NextTrigger>
  </Carousel.Control>
  <Carousel.ItemGroup>
    <Carousel.Item index={0}>Slide 1</Carousel.Item>
    <Carousel.Item index={1}>Slide 2</Carousel.Item>
    <Carousel.Item index={2}>Slide 3</Carousel.Item>
  </Carousel.ItemGroup>
  <Carousel.IndicatorGroup>
    {#snippet children(index)}
      <Carousel.Indicator {index} />
    {/snippet}
  </Carousel.IndicatorGroup>
</Carousel.Root>
