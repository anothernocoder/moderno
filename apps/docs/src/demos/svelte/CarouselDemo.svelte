<script lang="ts">
  import { Carousel } from '@moderno/svelte'

  const slides = ['Diseño', 'Desarrollo', 'Pruebas', 'Lanzamiento']
</script>

<Carousel.Root slideCount={slides.length}>
  <Carousel.ItemGroup>
    {#each slides as label, index (label)}
      <Carousel.Item {index}>
        <div
          style="height: 160px; display: flex; align-items: center; justify-content: center; font-size: var(--md-text-body-lg)"
        >
          {label}
        </div>
      </Carousel.Item>
    {/each}
  </Carousel.ItemGroup>
  <Carousel.Control>
    <Carousel.PrevTrigger />
    <Carousel.IndicatorGroup>
      {#snippet children(index)}
        <Carousel.Indicator {index} />
      {/snippet}
    </Carousel.IndicatorGroup>
    <Carousel.NextTrigger />
  </Carousel.Control>
</Carousel.Root>
