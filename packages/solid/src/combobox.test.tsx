import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@solidjs/testing-library'
import { Combobox, type ComboboxItem } from './combobox'

const items: ComboboxItem[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]

afterEach(cleanup)

describe('Combobox', () => {
  it('applies the anatomy classes and opens with Zag ARIA', async () => {
    const { container } = render(() => <Combobox label="Fruit" items={items} />)
    expect(container.querySelector(':scope > .md-combobox')).not.toBeNull()

    const input = screen.getByRole('combobox')
    expect(input).toHaveClass('md-combobox-input')
    expect(input).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button'))

    const listbox = await screen.findByRole('listbox')
    expect(input).toHaveAttribute('aria-expanded', 'true')
    expect(listbox).toHaveClass('md-combobox-content')

    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(2)
    expect(options[0]).toHaveClass('md-combobox-item')
  })

  it('filters the options as the user types', async () => {
    render(() => <Combobox label="Fruit" items={items} />)
    const input = screen.getByRole('combobox')

    fireEvent.click(screen.getByRole('button'))
    await screen.findByRole('listbox')
    expect(screen.getAllByRole('option')).toHaveLength(2)

    fireEvent.input(input, { target: { value: 'ban' } })

    await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(1))
    expect(screen.getByRole('option')).toHaveTextContent('Banana')
  })
})
