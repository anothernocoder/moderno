import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/svelte'
import DatePickerFixture from './DatePicker.fixture.svelte'
import { DatePicker } from './index'

afterEach(cleanup)

describe('DatePicker', () => {
  it('applies the anatomy classes and opens with Zag ARIA', async () => {
    const { container } = render(DatePickerFixture)
    expect(container.querySelector(':scope > .md-datepicker')).not.toBeNull()

    const trigger = screen.getByRole('button', { name: 'Open calendar' })
    expect(trigger).toHaveClass('md-datepicker-trigger')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('application')).not.toBeInTheDocument()
    expect(screen.queryByRole('grid')).not.toBeInTheDocument()

    await fireEvent.click(trigger)

    const content = await screen.findByRole('application')
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(content).toHaveClass('md-datepicker-content')

    const grid = screen.getByRole('grid')
    expect(grid).toHaveClass('md-datepicker-table')
  })

  it('marks the selected day in the calendar grid', async () => {
    render(DatePickerFixture)

    await fireEvent.click(screen.getByRole('button', { name: 'Open calendar' }))
    await screen.findByRole('application')

    const selected = document.querySelector('.md-datepicker-table-cell-trigger[data-selected]')
    expect(selected).toHaveTextContent('15')
  })

  it('throws when a part renders outside DatePicker.Root', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(DatePicker.Trigger)).toThrow(
      'Moderno: DatePicker parts must be used inside <DatePicker.Root>',
    )
    spy.mockRestore()
  })
})
