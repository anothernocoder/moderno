import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import AccordionFixture from './Accordion.fixture.svelte'
import AccordionNoItemFixture from './Accordion.no-item.fixture.svelte'
import { Accordion } from './index'

describe('Accordion', () => {
  it('applies the anatomy classes and Zag ARIA', () => {
    const { container } = render(AccordionFixture)
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
    expect(() => render(Accordion.Item, { value: 'a' })).toThrow(
      'Moderno: Accordion parts must be used inside <Accordion.Root>',
    )
    spy.mockRestore()
  })

  it('throws when ItemTrigger renders outside Accordion.Item', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(AccordionNoItemFixture)).toThrow(
      'Moderno: Accordion item parts must be used inside <Accordion.Item>',
    )
    spy.mockRestore()
  })
})
