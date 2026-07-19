import '@testing-library/jest-dom/vitest'

// jsdom has no layout engine, so it doesn't implement ResizeObserver — Zag's
// popper (used by Select/Popover/Tooltip/Dialog positioning) needs a stub.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver ??= ResizeObserverStub as unknown as typeof ResizeObserver

// jsdom has neither IntersectionObserver (used by the carousel machine to
// track in-view slides) nor Element.prototype.scrollTo (used to animate to a
// snapped page) — stub both so mounting/interacting with Carousel doesn't throw.
// Report every observed element as immediately intersecting — jsdom never
// fires a real one, and without it every slide stays aria-hidden forever.
// Batch same-tick observe() calls into one callback (as real browsers do):
// the carousel machine's reducer folds each entry onto the previous context
// value, so firing one callback per observe() would lose all but the last.
class IntersectionObserverStub {
  #callback: IntersectionObserverCallback
  #pending: Element[] = []
  constructor(callback: IntersectionObserverCallback) {
    this.#callback = callback
  }
  observe(target: Element) {
    if (this.#pending.length === 0) {
      queueMicrotask(() => {
        const entries = this.#pending.map((target) => ({ target, isIntersecting: true }) as IntersectionObserverEntry)
        this.#pending = []
        this.#callback(entries, this as unknown as IntersectionObserver)
      })
    }
    this.#pending.push(target)
  }
  unobserve() {}
  disconnect() {}
}
globalThis.IntersectionObserver ??= IntersectionObserverStub as unknown as typeof IntersectionObserver
Element.prototype.scrollTo = function scrollTo(this: Element, opts?: ScrollToOptions | number, y?: number) {
  if (typeof opts === 'object' && opts !== null) {
    if (opts.left != null) this.scrollLeft = opts.left
    if (opts.top != null) this.scrollTop = opts.top
  } else if (typeof opts === 'number') {
    this.scrollLeft = opts
    if (y != null) this.scrollTop = y
  }
}
