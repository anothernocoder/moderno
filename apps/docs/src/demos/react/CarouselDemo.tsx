import { Carousel } from '@moderno/react'

const slides = ['Diseño', 'Desarrollo', 'Pruebas', 'Lanzamiento']

export default function CarouselDemo() {
  return (
    <Carousel.Root slideCount={slides.length}>
      <Carousel.ItemGroup>
        {slides.map((label, index) => (
          <Carousel.Item key={label} index={index}>
            <div
              style={{
                height: '160px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'var(--md-text-body-lg)',
              }}
            >
              {label}
            </div>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control>
        <Carousel.PrevTrigger />
        <Carousel.IndicatorGroup>{(index) => <Carousel.Indicator key={index} index={index} />}</Carousel.IndicatorGroup>
        <Carousel.NextTrigger />
      </Carousel.Control>
    </Carousel.Root>
  )
}
