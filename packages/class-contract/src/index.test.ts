import { describe, expect, it } from 'vitest'
import { cx, legalNames } from './index'

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

describe('legalNames — every class the contract may emit', () => {
  it('enumerates the button base and all modifier classes (md has no class)', () => {
    const names = legalNames()
    expect(names).toBeInstanceOf(Set)
    expect([...names].sort()).toEqual(
      ['md-btn', 'md-btn--lg', 'md-btn--primary', 'md-btn--secondary', 'md-btn--sm'].sort(),
    )
  })
})
