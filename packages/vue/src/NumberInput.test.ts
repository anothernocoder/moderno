import { afterEach, describe, expect, it, vi } from 'vitest'
import { h } from 'vue'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/vue'
import { NumberInput } from './index'

afterEach(cleanup)

describe('NumberInput', () => {
  it('applies the anatomy classes and the Zag spinbutton ARIA', () => {
    const { container } = render({
      render: () => h(NumberInput, { label: 'Quantity', defaultValue: 5, min: 0, max: 10 }),
    })
    expect(container.querySelector(':scope > .md-number-input')).not.toBeNull()

    const input = screen.getByRole('spinbutton')
    expect(input).toHaveClass('md-number-input-field')
    expect(input).toHaveAttribute('aria-valuemin', '0')
    expect(input).toHaveAttribute('aria-valuemax', '10')
    expect(input).toHaveValue('5')

    const [decrement, increment] = screen.getAllByRole('button')
    expect(decrement).toHaveClass('md-number-input-decrement')
    expect(increment).toHaveClass('md-number-input-increment')
  })

  it('increments and decrements with the keyboard', async () => {
    const onValueChange = vi.fn()
    render({
      render: () =>
        h(NumberInput, { label: 'Quantity', defaultValue: 5, 'onUpdate:modelValue': onValueChange }),
    })
    const input = screen.getByRole('spinbutton') as HTMLInputElement

    input.focus()
    await fireEvent.keyDown(input, { key: 'ArrowUp' })
    await waitFor(() => expect(onValueChange).toHaveBeenLastCalledWith('6', 6))

    await fireEvent.keyDown(input, { key: 'ArrowDown' })
    await waitFor(() => expect(onValueChange).toHaveBeenLastCalledWith('5', 5))
  })
})
