import '@testing-library/jest-dom/vitest'

// jsdom has no layout engine, so it doesn't implement ResizeObserver — Zag's
// popper (used by Select/Popover/Tooltip/Dialog positioning) needs a stub.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver ??= ResizeObserverStub as unknown as typeof ResizeObserver
