import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Accordion } from './accordion'

function renderAccordion() {
  return render(
    <Accordion.Root defaultValue={['a']}>
      <Accordion.Item value="a">
        <Accordion.ItemTrigger>Item A</Accordion.ItemTrigger>
        <Accordion.ItemContent>Content A</Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>,
  )
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
    expect(() => render(<Accordion.Item value="a">x</Accordion.Item>)).toThrow(
      'Moderno: <Accordion.Item> must be used inside <Accordion.Root>',
    )
    spy.mockRestore()
  })

  it('throws when ItemTrigger renders outside Accordion.Item', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() =>
      render(
        <Accordion.Root defaultValue={[]}>
          <Accordion.ItemTrigger>x</Accordion.ItemTrigger>
        </Accordion.Root>,
      ),
    ).toThrow('Moderno: <Accordion.ItemTrigger> must be used inside <Accordion.Item>')
    spy.mockRestore()
  })
})
