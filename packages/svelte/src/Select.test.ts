import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/svelte'
import SelectFixture from './Select.fixture.svelte'
import { Select } from './index'

describe('Select', () => {
  it('applies the anatomy classes and opens with Zag ARIA', async () => {
    const { container } = render(SelectFixture)
    expect(container.querySelector(':scope > .md-select')).not.toBeNull()

    const trigger = screen.getByRole('combobox')
    expect(trigger).toHaveClass('md-select-trigger')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

    await fireEvent.click(trigger)

    const listbox = await screen.findByRole('listbox')
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(listbox).toHaveClass('md-select-content')

    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(2)
    expect(options[0]).toHaveClass('md-select-item')
  })

  it('throws when a part renders outside Select.Root', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(Select.Trigger)).toThrow(
      'Moderno: Select parts must be used inside <Select.Root>',
    )
    spy.mockRestore()
  })
})
