import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'
import { fireEvent, render, screen } from '@testing-library/vue'
import { Sheet } from './index'

function renderSheet() {
  return render({
    render: () =>
      h(Sheet.Root, null, () => [
        h(Sheet.Trigger, null, () => 'Open cart'),
        h(Sheet.Content, null, () => [h(Sheet.Title, null, () => 'Your cart'), h(Sheet.Close, null, () => 'Close')]),
      ]),
  })
}

describe('Sheet', () => {
  it('applies the anatomy classes and opens/closes with Zag ARIA', async () => {
    const { container } = renderSheet()
    expect(container.querySelector(':scope > .md-sheet')).not.toBeNull()

    const trigger = screen.getByRole('button', { name: 'Open cart' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await fireEvent.click(trigger)

    const content = await screen.findByRole('dialog')
    expect(content).toHaveClass('md-sheet-content')
    expect(content).toHaveAttribute('aria-modal', 'true')

    const title = screen.getByText('Your cart')
    expect(title).toHaveClass('md-sheet-title')
    expect(title.tagName).toBe('H2')

    const closeButton = screen.getByRole('button', { name: 'Close' })
    await fireEvent.click(closeButton)

    await vi.waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('renders a side modifier class on Content', async () => {
    render({
      render: () =>
        h(Sheet.Root, { defaultOpen: true }, () => [
          h(Sheet.Trigger, null, () => 'Open'),
          h(Sheet.Content, { side: 'left' }, () => [h(Sheet.Title, null, () => 'Nav'), h(Sheet.Close)]),
        ]),
    })
    const content = await screen.findByRole('dialog')
    expect(content).toHaveClass('md-sheet-content')
    expect(content).toHaveClass('md-sheet-content--left')
  })

  it('throws when a part renders outside Sheet.Root', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(Sheet.Trigger)).toThrow('Moderno: <Sheet.Trigger> must be used inside <Sheet.Root>')
    spy.mockRestore()
  })
})
