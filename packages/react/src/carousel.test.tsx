import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Carousel } from './carousel'

afterEach(cleanup)

// The carousel machine's mount-time re-measurement (trackSlideResize in
// @zag-js/carousel) is a two-level requestAnimationFrame chain: a raf that
// calls exec() -> SNAP.REFRESH, which itself schedules a *second* raf for
// PAGE.SCROLL. A wall-clock sleep is not a reliable way to wait that out:
// jsdom's rAF polyfill runs on a `setInterval(fn, 1000 / 60)`, and under a
// loaded CI box (or the full suite running in parallel via turbo) that
// interval can slip well past a fixed real-timer delay — the chain then
// lands *after* a test has already clicked, racing the click's own page
// update and reverting it (see #65). Waiting on real requestAnimationFrame
// callbacks instead ties this helper to the same scheduling primitive the
// machine uses, so it holds regardless of how fast or slow the host machine
// is. Three frames covers the two-level chain with one frame of margin.
async function settle() {
  await act(async () => {
    for (let i = 0; i < 3; i++) {
      await new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)))
    }
  })
}

// jsdom has no layout engine — the carousel machine measures the item-group
// and each item via getBoundingClientRect/offsetWidth/scrollWidth to compute
// scroll-snap positions. Fake a 100px item-group showing one 100px item at a
// time across 3 items, so paging behaves like a real three-slide carousel.
function mockCarouselLayout(itemWidth = 100, count = 3) {
  // @zag-js/scroll-snap's getScrollSnapPositions() re-derives each item's
  // scroll-content-relative offset from a *viewport*-relative rect: it adds
  // back the item-group's current scrollLeft/scrollTop to the measured rect
  // (childOffsetStart = childRect.left - parentRect.left + scrollLeft). That
  // only recovers the right absolute offset if the rect actually shifts with
  // scroll, the way a real browser's getBoundingClientRect does. A mock that
  // reports a fixed position regardless of scroll breaks that invariant, so
  // any re-measurement after the carousel has scrolled (e.g. the machine's
  // own mount-time SNAP.REFRESH, if it lands late) computes bogus snap
  // points and the machine clamps `page` back into range 0 — reproducing the
  // "page reverts after indicator click" flake from #65. Mirror real
  // browsers here so re-measuring mid-scroll is a no-op, like it is in
  // production.
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
    await settle()

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
    await settle()

    await waitFor(() => expect(onPageChange).toHaveBeenCalledWith(2))
    await waitFor(() => expect(indicators[2]).toHaveAttribute('data-current'))
    await waitFor(() => expect(screen.getByRole('button', { name: 'Next slide' })).toBeDisabled())

    restoreLayout()
  })

  // Regression test for #65: the carousel machine's root-level trackSlideResize
  // effect schedules a one-shot requestAnimationFrame chain on mount (exec()
  // -> SNAP.REFRESH, then a nested raf -> PAGE.SCROLL) to re-measure snap
  // points once real layout is available. On a fast machine that chain always
  // settles before a test can interact with the carousel; under CI load it can
  // still be pending when the user clicks. SNAP.REFRESH's setSnapPoints action
  // re-measures pageSnapPoints from the DOM and re-clamps `page` into range —
  // normally a no-op, since @zag-js/scroll-snap's math is scroll-position
  // invariant (it adds the item-group's current scrollLeft back to each
  // item's viewport-relative rect). That invariant depends on
  // getBoundingClientRect() actually shifting with scroll like it does in a
  // real browser, which mockCarouselLayout above now does.
  //
  // This test forces the exact interleaving: it takes manual control of
  // requestAnimationFrame so the mount-time raf chain is deliberately held
  // pending across the indicator click, then flushed afterwards, and asserts
  // the click's page change survives.
  it('does not revert the page when the mount-time snap-point remeasurement lands after a click', async () => {
    const restoreLayout = mockCarouselLayout()

    const rafQueue: FrameRequestCallback[] = []
    const idToCallback = new Map<number, FrameRequestCallback>()
    let nextRafId = 1
    const rafSpy = vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
      const id = nextRafId++
      idToCallback.set(id, cb)
      rafQueue.push(cb)
      return id
    })
    const cancelRafSpy = vi.spyOn(globalThis, 'cancelAnimationFrame').mockImplementation((id: number) => {
      const cb = idToCallback.get(id)
      if (cb) {
        const index = rafQueue.indexOf(cb)
        if (index !== -1) rafQueue.splice(index, 1)
      }
      idToCallback.delete(id)
    })
    const flushOneRaf = () => rafQueue.shift()?.(0)

    const onPageChange = vi.fn()
    renderCarousel({ onPageChange })

    // Flush the mount microtask (state.invoke -> entry actions + effects)
    // without flushing the raf queue, leaving trackSlideResize's mount-time
    // chain pending — as if a slow CI box hadn't gotten to it yet.
    await act(async () => {
      await Promise.resolve()
      await Promise.resolve()
    })

    const indicators = screen.getAllByRole('button', { name: /Go to slide/ })
    fireEvent.click(indicators[2])
    await act(async () => {
      await Promise.resolve()
      await Promise.resolve()
    })

    // Now let the pending raf chain land, one frame at a time, *after* the click.
    await act(async () => {
      flushOneRaf()
      await Promise.resolve()
      await Promise.resolve()
    })
    await act(async () => {
      flushOneRaf()
      await Promise.resolve()
      await Promise.resolve()
    })

    expect(onPageChange).toHaveBeenCalledWith(2)
    expect(onPageChange).not.toHaveBeenCalledWith(0)
    await waitFor(() => expect(indicators[2]).toHaveAttribute('data-current'))
    await waitFor(() => expect(screen.getByRole('button', { name: 'Next slide' })).toBeDisabled())

    rafSpy.mockRestore()
    cancelRafSpy.mockRestore()
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
