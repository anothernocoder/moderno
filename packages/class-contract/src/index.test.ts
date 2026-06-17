import { describe, expect, it } from 'vitest'
import { cx, legalNames, parts } from './index'

describe('cx.button — variant class builder', () => {
  it('applies default variant when called with no options', () => {
    expect(cx.button()).toBe('md-btn md-btn--primary')
  })

  it('applies an explicit variant', () => {
    expect(cx.button({ variant: 'secondary' })).toBe('md-btn md-btn--secondary')
  })

  it('appends a size modifier for non-default sizes', () => {
    expect(cx.button({ size: 'sm' })).toBe('md-btn md-btn--primary md-btn--sm')
  })

  it('emits no size modifier for the default md size', () => {
    expect(cx.button({ size: 'md' })).toBe('md-btn md-btn--primary')
  })
})

describe('parts.popover — anatomy leaf names', () => {
  it('maps each leaf to its md-popover-* class', () => {
    expect(parts.popover).toEqual({
      positioner: 'md-popover-positioner',
      content: 'md-popover-content',
      arrow: 'md-popover-arrow',
      title: 'md-popover-title',
      body: 'md-popover-body',
      close: 'md-popover-close',
    })
  })
})

describe('legalNames — every class the contract may emit', () => {
  it('enumerates the button base and all modifier classes (md has no class)', () => {
    const names = legalNames()
    expect(names).toBeInstanceOf(Set)
    for (const cls of ['md-btn', 'md-btn--lg', 'md-btn--primary', 'md-btn--secondary', 'md-btn--sm']) {
      expect(names.has(cls)).toBe(true)
    }
    // md size has no modifier class
    expect(names.has('md-btn--md')).toBe(false)
  })

  it('includes every popover anatomy leaf', () => {
    const names = legalNames()
    for (const leaf of Object.values(parts.popover)) {
      expect(names.has(leaf)).toBe(true)
    }
  })
})
