import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Carousel } from './carousel'

afterEach(cleanup)

// The carousel machine measures real scroll-snap positions from the DOM in a
// mount-time entry action, then commits them via a React state update. In
// jsdom that update lands a tick later than a microtask flush — a real timer
// tick is needed before interacting, or the click race the initial (SSR-safe)
// snap points instead of the measured ones.
async function settle() {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 50))
  })
}

// jsdom has no layout engine — the carousel machine measures the item-group
// and each item via getBoundingClientRect/offsetWidth/scrollWidth to compute
// scroll-snap positions. Fake a 100px item-group showing one 100px item at a
// time across 3 items, so paging behaves like a real three-slide carousel.
function mockCarouselLayout(itemWidth = 100, count = 3) {
  const rectSpy = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
    const isItem = this.getAttribute('data-part') === 'item'
    const index = isItem ? Number(this.dataset.index) : 0
    const width = itemWidth
    const left = isItem ? index * itemWidth : 0
    return { width, height: 100, top: 0, left, right: left + width, bottom: 100, x: left, y: 0, toJSON() {} } as DOMRect
  })
  const widthSpy = vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(itemWidth)
  const heightSpy = vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(100)
  const scrollWidthSpy = vi.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockReturnValue(itemWidth * count)
  const scrollHeightSpy = vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(100)
  return () => {
    rectSpy.mockRestore()
    widthSpy.mockRestore()
    heightSpy.mockRestore()
    scrollWidthSpy.mockRestore()
    scrollHeightSpy.mockRestore()
  }
}

function renderCarousel(props: Partial<React.ComponentProps<typeof Carousel.Root>> = {}) {
  return render(
    <Carousel.Root slideCount={3} {...props}>
      <Carousel.Control>
        <Carousel.PrevTrigger>Prev</Carousel.PrevTrigger>
        <Carousel.NextTrigger>Next</Carousel.NextTrigger>
      </Carousel.Control>
      <Carousel.ItemGroup>
        <Carousel.Item index={0}>Slide 1</Carousel.Item>
        <Carousel.Item index={1}>Slide 2</Carousel.Item>
        <Carousel.Item index={2}>Slide 3</Carousel.Item>
      </Carousel.ItemGroup>
      <Carousel.IndicatorGroup>{(index) => <Carousel.Indicator key={index} index={index} />}</Carousel.IndicatorGroup>
    </Carousel.Root>,
  )
}

describe('Carousel', () => {
  it('applies the anatomy classes and Zag ARIA', async () => {
    const restoreLayout = mockCarouselLayout()
    const { container } = renderCarousel()
    await settle()

    const root = container.querySelector(':scope > .md-carousel')
    expect(root).not.toBeNull()
    expect(root).toHaveAttribute('role', 'region')
    expect(root).toHaveAttribute('aria-roledescription', 'carousel')
    expect(root).toHaveAttribute('data-orientation', 'horizontal')

    const itemGroup = container.querySelector('.md-carousel-item-group')
    expect(itemGroup).not.toBeNull()

    const slides = screen.getAllByRole('group', { name: /of 3/ })
    expect(slides).toHaveLength(3)
    for (const slide of slides) expect(slide).toHaveClass('md-carousel-item')

    expect(container.querySelector('.md-carousel-control')).not.toBeNull()
    expect(screen.getByRole('button', { name: 'Previous slide' })).toHaveClass('md-carousel-prev')
    expect(screen.getByRole('button', { name: 'Next slide' })).toHaveClass('md-carousel-next')

    restoreLayout()
  })

  it('disables the prev trigger on the first page and enables the next trigger', () => {
    const restoreLayout = mockCarouselLayout()
    renderCarousel()

    expect(screen.getByRole('button', { name: 'Previous slide' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Next slide' })).toBeEnabled()

    restoreLayout()
  })

  it('advances the page and moves data-current when the next trigger is clicked', async () => {
    const restoreLayout = mockCarouselLayout()
    const onPageChange = vi.fn()
    renderCarousel({ onPageChange })
    await settle()

    const indicators = screen.getAllByRole('button', { name: /Go to slide/ })
    expect(indicators).toHaveLength(3)
    expect(indicators[0]).toHaveAttribute('data-current')

    fireEvent.click(screen.getByRole('button', { name: 'Next slide' }))

    await waitFor(() => expect(onPageChange).toHaveBeenCalledWith(1))
    await waitFor(() => expect(indicators[1]).toHaveAttribute('data-current'))
    expect(indicators[0]).not.toHaveAttribute('data-current')
    expect(screen.getByRole('button', { name: 'Previous slide' })).toBeEnabled()

    restoreLayout()
  })

  it('jumps to a page when its indicator is clicked', async () => {
    const restoreLayout = mockCarouselLayout()
    const onPageChange = vi.fn()
    renderCarousel({ onPageChange })
    await settle()

    const indicators = screen.getAllByRole('button', { name: /Go to slide/ })
    fireEvent.click(indicators[2])

    await waitFor(() => expect(onPageChange).toHaveBeenCalledWith(2))
    expect(screen.getByRole('button', { name: 'Next slide' })).toBeDisabled()

    restoreLayout()
  })

  it('supports a vertical orientation', () => {
    const restoreLayout = mockCarouselLayout()
    const { container } = renderCarousel({ orientation: 'vertical' })

    expect(container.querySelector('.md-carousel')).toHaveAttribute('data-orientation', 'vertical')
    expect(container.querySelector('.md-carousel-item-group')).toHaveAttribute('data-orientation', 'vertical')

    restoreLayout()
  })

  it('throws when a part renders outside Carousel.Root', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<Carousel.ItemGroup>x</Carousel.ItemGroup>)).toThrow(
      'Moderno: <Carousel.ItemGroup> must be used inside <Carousel.Root>',
    )
    spy.mockRestore()
  })
})
