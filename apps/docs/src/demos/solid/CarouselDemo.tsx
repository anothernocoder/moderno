import { Carousel } from '@moderno/solid'

const slides = ['Diseño', 'Desarrollo', 'Pruebas', 'Lanzamiento']

export default function CarouselDemo() {
  return (
    <Carousel.Root slideCount={slides.length}>
      <Carousel.ItemGroup>
        {slides.map((label, index) => (
          <Carousel.Item index={index}>
            <div
              style={{
                height: '160px',
                display: 'flex',
                'align-items': 'center',
                'justify-content': 'center',
                'font-size': 'var(--md-text-body-lg)',
              }}
            >
              {label}
            </div>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control>
        <Carousel.PrevTrigger />
        <Carousel.IndicatorGroup>{(index) => <Carousel.Indicator index={index} />}</Carousel.IndicatorGroup>
        <Carousel.NextTrigger />
      </Carousel.Control>
    </Carousel.Root>
  )
}
