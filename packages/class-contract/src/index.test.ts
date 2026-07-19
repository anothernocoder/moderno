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

describe('cx.avatar — two axes, one with a no-class default', () => {
  it('emits size and shape classes', () => {
    expect(cx.avatar({ size: 'sm', shape: 'circle' })).toBe('md-avatar md-avatar--sm md-avatar--circle')
  })

  it('emits no shape class for square (square has no CSS rule)', () => {
    expect(cx.avatar({ shape: 'square' })).toBe('md-avatar md-avatar--md')
  })
})

describe('cx.indicator — variant + boolean flag', () => {
  it('applies the default variant and no flag', () => {
    expect(cx.indicator()).toBe('md-indicator md-indicator--neutral')
  })

  it('appends the pulse flag class when pulse is true', () => {
    expect(cx.indicator({ variant: 'success', pulse: true })).toBe(
      'md-indicator md-indicator--success md-indicator--pulse',
    )
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

describe('cx.sheet — side axis with a no-class default', () => {
  it('emits no side modifier for the default right side', () => {
    expect(cx.sheet()).toBe('md-sheet-content')
  })

  it('appends a side modifier for non-default sides', () => {
    expect(cx.sheet({ side: 'left' })).toBe('md-sheet-content md-sheet-content--left')
    expect(cx.sheet({ side: 'top' })).toBe('md-sheet-content md-sheet-content--top')
    expect(cx.sheet({ side: 'bottom' })).toBe('md-sheet-content md-sheet-content--bottom')
  })
})

describe('parts.sheet — anatomy leaf names', () => {
  it('maps each leaf to its md-sheet-* class', () => {
    expect(parts.sheet).toEqual({
      root: 'md-sheet',
      backdrop: 'md-sheet-backdrop',
      positioner: 'md-sheet-positioner',
      title: 'md-sheet-title',
      close: 'md-sheet-close',
    })
  })
})

describe('parts.toast — anatomy leaf names', () => {
  it('maps each leaf to its md-toast-* class', () => {
    expect(parts.toast).toEqual({
      group: 'md-toast-group',
      root: 'md-toast',
      title: 'md-toast-title',
      description: 'md-toast-description',
      closeTrigger: 'md-toast-close',
    })
  })
})

describe('parts.pagination — anatomy leaf names', () => {
  it('maps each leaf to its md-pagination-* class', () => {
    expect(parts.pagination).toEqual({
      root: 'md-pagination',
      item: 'md-pagination-item',
      ellipsis: 'md-pagination-ellipsis',
      prevTrigger: 'md-pagination-prev',
      nextTrigger: 'md-pagination-next',
    })
  })
})

describe('parts.splitter — anatomy leaf names', () => {
  it('maps each leaf to its md-splitter-* class', () => {
    expect(parts.splitter).toEqual({
      root: 'md-splitter',
      panel: 'md-splitter-panel',
      resizeTrigger: 'md-splitter-resize-trigger',
      resizeTriggerIndicator: 'md-splitter-resize-trigger-indicator',
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

  it('excludes unstyled hooks (in parts for framework use, but no CSS rule)', () => {
    const names = legalNames()
    // exposed for frameworks…
    expect(parts.checkbox.label).toBe('md-checkbox-label')
    expect(parts.select.control).toBe('md-select-control')
    // …but not enforced against CSS
    expect(names.has('md-checkbox-label')).toBe(false)
    expect(names.has('md-radio-item-text')).toBe(false)
    expect(names.has('md-select-control')).toBe(false)
    expect(names.has('md-select-item-text')).toBe(false)
    expect(names.has('md-toggle-label')).toBe(false)
  })
})
