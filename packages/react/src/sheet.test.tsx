import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Sheet } from './sheet'

function renderSheet() {
  return render(
    <Sheet.Root>
      <Sheet.Trigger>Open cart</Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Title>Your cart</Sheet.Title>
        <Sheet.Close>Close</Sheet.Close>
      </Sheet.Content>
    </Sheet.Root>,
  )
}

describe('Sheet', () => {
  it('applies the anatomy classes and opens/closes with Zag ARIA', async () => {
    const { container } = renderSheet()
    expect(container.querySelector(':scope > .md-sheet')).not.toBeNull()

    const trigger = screen.getByRole('button', { name: 'Open cart' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    fireEvent.click(trigger)

    const content = await screen.findByRole('dialog')
    expect(content).toHaveClass('md-sheet-content')
    expect(content).toHaveAttribute('aria-modal', 'true')

    const title = screen.getByText('Your cart')
    expect(title).toHaveClass('md-sheet-title')
    expect(title.tagName).toBe('H2')

    const closeButton = screen.getByRole('button', { name: 'Close' })
    fireEvent.click(closeButton)

    await vi.waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('renders a side modifier class on Content', async () => {
    render(
      <Sheet.Root defaultOpen>
        <Sheet.Trigger>Open</Sheet.Trigger>
        <Sheet.Content side="left">
          <Sheet.Title>Nav</Sheet.Title>
          <Sheet.Close />
        </Sheet.Content>
      </Sheet.Root>,
    )
    const content = await screen.findByRole('dialog')
    expect(content).toHaveClass('md-sheet-content')
    expect(content).toHaveClass('md-sheet-content--left')
  })

  it('throws when Trigger renders outside Sheet.Root', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<Sheet.Trigger>Open</Sheet.Trigger>)).toThrow(
      'Moderno: <Sheet.Trigger> must be used inside <Sheet.Root>',
    )
    spy.mockRestore()
  })
})
