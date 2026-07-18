import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Select, type SelectItem } from './select'

const items: SelectItem[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]

function renderSelect() {
  return render(
    <Select.Root items={items}>
      <Select.Label>Fruit</Select.Label>
      <Select.Trigger />
      <Select.Content>
        {items.map((item) => (
          <Select.Item key={item.value} item={item} />
        ))}
      </Select.Content>
    </Select.Root>,
  )
}

describe('Select', () => {
  it('applies the anatomy classes and opens with Zag ARIA', async () => {
    const { container } = renderSelect()
    expect(container.querySelector(':scope > .md-select')).not.toBeNull()

    const trigger = screen.getByRole('combobox')
    expect(trigger).toHaveClass('md-select-trigger')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

    fireEvent.click(trigger)

    const listbox = await screen.findByRole('listbox')
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(listbox).toHaveClass('md-select-content')

    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(2)
    expect(options[0]).toHaveClass('md-select-item')
  })

  it('throws when a part renders outside Select.Root', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<Select.Trigger />)).toThrow(
      'Moderno: <Select.Trigger> must be used inside <Select.Root>',
    )
    spy.mockRestore()
  })
})
