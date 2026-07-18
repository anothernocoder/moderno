import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'
import { render, screen } from '@testing-library/vue'
import { Tabs } from './index'

function renderTabs() {
  return render({
    render: () =>
      h(Tabs.Root, { defaultValue: 'a' }, () => [
        h(Tabs.List, null, () => [
          h(Tabs.Trigger, { value: 'a' }, () => 'Tab A'),
          h(Tabs.Trigger, { value: 'b' }, () => 'Tab B'),
        ]),
        h(Tabs.Content, { value: 'a' }, () => 'Content A'),
        h(Tabs.Content, { value: 'b' }, () => 'Content B'),
      ]),
  })
}

describe('Tabs', () => {
  it('applies the anatomy classes and Zag ARIA', () => {
    const { container } = renderTabs()
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
    expect(() => render(Tabs.List)).toThrow(
      'Moderno: <Tabs.List> must be used inside <Tabs.Root>',
    )
    spy.mockRestore()
  })
})
