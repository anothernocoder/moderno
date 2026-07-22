import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { NumberInput } from './number-input'

afterEach(cleanup)

describe('NumberInput', () => {
  it('applies the anatomy classes and the Zag spinbutton ARIA', () => {
    const { container } = render(<NumberInput label="Quantity" defaultValue={5} min={0} max={10} />)
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
    render(<NumberInput label="Quantity" defaultValue={5} onValueChange={onValueChange} />)
    const input = screen.getByRole('spinbutton')

    ;(input as HTMLInputElement).focus()
    fireEvent.keyDown(input, { key: 'ArrowUp' })
    // Wait for the rendered value, not just the onValueChange call: @zag-js/react's
    // useMachine defers transition processing into a queueMicrotask and invokes
    // onValueChange synchronously inside it, *ahead of* the React state commit
    // that updates the value the machine reads for the *next* keyboard event
    // (only the FSM state bindable is flushSync'd in send(); the numeric value
    // context isn't). Under CI load waitFor can observe the callback before that
    // commit lands, so the following ArrowDown decrements from a stale value.
    // Waiting on the settled DOM value forces the commit (and hence the
    // machine's internal context) to catch up before the next key is dispatched.
    await waitFor(() => expect(input).toHaveValue('6'))
    expect(onValueChange).toHaveBeenLastCalledWith('6', 6)

    fireEvent.keyDown(input, { key: 'ArrowDown' })
    await waitFor(() => expect(input).toHaveValue('5'))
    expect(onValueChange).toHaveBeenLastCalledWith('5', 5)
  })
})
