import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import TabsFixture from './Tabs.fixture.svelte'
import { Tabs } from './index'

describe('Tabs', () => {
  it('applies the anatomy classes and Zag ARIA', () => {
    const { container } = render(TabsFixture)
    expect(container.querySelector(':scope > .md-tabs')).not.toBeNull()

    const list = screen.getByRole('tablist')
    expect(list).toHaveClass('md-tabs-list')

    const tabA = screen.getByRole('tab', { name: 'Tab A' })
    expect(tabA).toHaveClass('md-tabs-trigger')
    expect(tabA).toHaveAttribute('aria-selected', 'true')

    const tabB = screen.getByRole('tab', { name: 'Tab B' })
    expect(tabB).toHaveAttribute('aria-selected', 'false')

    const panel = screen.getByRole('tabpanel')
    expect(panel).toHaveClass('md-tabs-content')
    expect(panel).toHaveTextContent('Content A')
  })

  it('throws when a part renders outside Tabs.Root', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(Tabs.List)).toThrow('Moderno: Tabs parts must be used inside <Tabs.Root>')
    spy.mockRestore()
  })
})
