import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@solidjs/testing-library'
import { Carousel } from './carousel'

afterEach(cleanup)

// jsdom has no layout engine — the carousel machine measures the item-group
// and each item via getBoundingClientRect/offsetWidth/scrollWidth to compute
// scroll-snap positions. Fake a 100px item-group showing one 100px item at a
// time across 3 items, so paging behaves like a real three-slide carousel.
// @zag-js/scroll-snap's getScrollSnapPositions() re-derives each item's
// scroll-content-relative offset from a *viewport*-relative rect: it adds
// back the item-group's current scrollLeft/scrollTop to the measured rect
// (childOffsetStart = childRect.left - parentRect.left + scrollLeft). That
// only recovers the right absolute offset if the rect actually shifts with
// scroll, the way a real browser's getBoundingClientRect does. A mock that
// reports a fixed position regardless of scroll breaks that invariant, so
// any re-measurement after the carousel has scrolled (e.g. the machine's
// own mount-time SNAP.REFRESH raf chain, if it lands late) computes bogus
// snap points and the machine clamps `page` back into range 0 — see the
// React package's carousel.test.tsx for the full writeup (moderno#65).
function mockCarouselLayout(itemWidth = 100, count = 3) {
  const rectSpy = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
    const isItem = this.getAttribute('data-part') === 'item'
    if (!isItem) {
      return { width: itemWidth, height: 100, top: 0, left: 0, right: itemWidth, bottom: 100, x: 0, y: 0, toJSON() {} } as DOMRect
    }
    const index = Number(this.dataset.index)
    const itemGroupEl = this.parentElement
    const scrollLeft = itemGroupEl?.scrollLeft ?? 0
    const scrollTop = itemGroupEl?.scrollTop ?? 0
    const left = index * itemWidth - scrollLeft
    const top = -scrollTop
    return { width: itemWidth, height: 100, top, left, right: left + itemWidth, bottom: top + 100, x: left, y: top, toJSON() {} } as DOMRect
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

// Zag's mount-time DOM measurement (setSnapPoints) settles into a real state
// update a tick after mount — give it a moment before interacting.
async function settle() {
  await new Promise((resolve) => setTimeout(resolve, 50))
}

function renderCarousel(props: Partial<Parameters<typeof Carousel.Root>[0]> = {}) {
  return render(() => (
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
      <Carousel.IndicatorGroup>{(index) => <Carousel.Indicator index={index} />}</Carousel.IndicatorGroup>
    </Carousel.Root>
  ))
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
    expect(() => render(() => <Carousel.ItemGroup>x</Carousel.ItemGroup>)).toThrow(
      'Moderno: <Carousel.ItemGroup> must be used inside <Carousel.Root>',
    )
    spy.mockRestore()
  })
})
