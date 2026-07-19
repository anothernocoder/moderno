import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/svelte'
import { createRawSnippet } from 'svelte'
import Splitter from './Splitter.svelte'

afterEach(cleanup)

function textSnippet(text: string) {
  return createRawSnippet(() => ({
    render: () => `<span>${text}</span>`,
  }))
}

describe('Splitter', () => {
  it('renders the root, panels and a resize trigger with the md-* class contract', () => {
    render(Splitter, {
      props: {
        panels: [{ id: 'a' }, { id: 'b' }],
        a: textSnippet('Panel A'),
        b: textSnippet('Panel B'),
      },
    })

    const root = document.querySelector('.md-splitter')
    expect(root).toBeInTheDocument()
    expect(root).toHaveAttribute('data-orientation', 'horizontal')

    expect(screen.getByText('Panel A').closest('.md-splitter-panel')).toBeInTheDocument()
    expect(screen.getByText('Panel B').closest('.md-splitter-panel')).toBeInTheDocument()

    const trigger = screen.getByRole('separator')
    expect(trigger).toHaveClass('md-splitter-resize-trigger')
    expect(trigger).toHaveAttribute('aria-orientation', 'horizontal')
    expect(trigger.querySelector('.md-splitter-resize-trigger-indicator')).toBeInTheDocument()
  })

  it('renders one resize trigger per adjacent panel pair for three panels', () => {
    render(Splitter, {
      props: {
        panels: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
        a: textSnippet('A'),
        b: textSnippet('B'),
        c: textSnippet('C'),
      },
    })
    expect(screen.getAllByRole('separator')).toHaveLength(2)
  })

  it('supports a vertical orientation', () => {
    render(Splitter, {
      props: { orientation: 'vertical', panels: [{ id: 'a' }, { id: 'b' }], a: textSnippet('A'), b: textSnippet('B') },
    })
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical')
    expect(document.querySelector('.md-splitter')).toHaveAttribute('data-orientation', 'vertical')
  })

  it('gives each resize trigger a default accessible label naming the two panels', () => {
    render(Splitter, {
      props: {
        panels: [{ id: 'sidebar' }, { id: 'main' }],
        sidebar: textSnippet('S'),
        main: textSnippet('M'),
      },
    })
    expect(screen.getByRole('separator')).toHaveAttribute('aria-label', 'Resize sidebar and main')
  })

  it('accepts a custom resize trigger label', () => {
    render(Splitter, {
      props: {
        panels: [{ id: 'sidebar' }, { id: 'main' }],
        sidebar: textSnippet('S'),
        main: textSnippet('M'),
        resizeTriggerLabel: (before: string, after: string) => `Redimensionar ${before} y ${after}`,
      },
    })
    expect(screen.getByRole('separator')).toHaveAttribute('aria-label', 'Redimensionar sidebar y main')
  })

  it('resizes panels via the keyboard and calls onResize with the public API', async () => {
    // jsdom has no layout engine — the splitter machine measures the root via
    // getBoundingClientRect to convert keyboard deltas into panel percentages.
    const rectSpy = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 400,
      height: 400,
      top: 0,
      left: 0,
      right: 400,
      bottom: 400,
      x: 0,
      y: 0,
      toJSON() {},
    })

    const onResize = vi.fn()
    render(Splitter, {
      props: {
        panels: [{ id: 'a' }, { id: 'b' }],
        defaultSize: [50, 50],
        onResize,
        a: textSnippet('A'),
        b: textSnippet('B'),
      },
    })
    const trigger = screen.getByRole('separator')
    trigger.focus()
    await fireEvent.keyDown(trigger, { key: 'ArrowRight' })

    await waitFor(() => expect(onResize).toHaveBeenCalled())
    const [size] = onResize.mock.calls[0]
    expect(size[0]).toBeGreaterThan(50)

    rectSpy.mockRestore()
  })
})
