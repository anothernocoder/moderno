import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'
import { render, screen } from '@testing-library/vue'
import { Accordion } from './index'

function renderAccordion() {
  return render({
    render: () =>
      h(Accordion.Root, { defaultValue: ['a'] }, () => [
        h(Accordion.Item, { value: 'a' }, () => [
          h(Accordion.ItemTrigger, null, () => 'Item A'),
          h(Accordion.ItemContent, null, () => 'Content A'),
        ]),
      ]),
  })
}

describe('Accordion', () => {
  it('applies the anatomy classes and Zag ARIA', () => {
    const { container } = renderAccordion()
    expect(container.querySelector(':scope > .md-accordion')).not.toBeNull()
    expect(container.querySelector('.md-accordion-item')).not.toBeNull()

    const trigger = screen.getByRole('button', { name: 'Item A' })
    expect(trigger).toHaveClass('md-accordion-trigger')
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(trigger.closest('h3')).toHaveClass('md-accordion-heading')

    const content = screen.getByText('Content A')
    expect(content).toHaveClass('md-accordion-content')
  })

  it('throws when Item renders outside Accordion.Root', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(Accordion.Item, { props: { value: 'a' } })).toThrow(
      'Moderno: <Accordion.Item> must be used inside <Accordion.Root>',
    )
    spy.mockRestore()
  })

  it('throws when ItemTrigger renders outside Accordion.Item', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() =>
      render({
        render: () => h(Accordion.Root, { defaultValue: [] }, () => [h(Accordion.ItemTrigger, null, () => 'x')]),
      }),
    ).toThrow('Moderno: <Accordion.ItemTrigger> must be used inside <Accordion.Item>')
    spy.mockRestore()
  })
})
