import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Menu, type MenuItem } from './menu'

const items: MenuItem[] = [
  { label: 'Edit', value: 'edit' },
  { label: 'Delete', value: 'delete' },
]

afterEach(cleanup)

describe('Menu', () => {
  it('applies the anatomy classes and opens with Zag ARIA', async () => {
    render(<Menu triggerLabel="Actions" items={items} />)

    const trigger = screen.getByRole('button', { name: /Actions/ })
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()

    fireEvent.click(trigger)

    const menu = await screen.findByRole('menu')
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(menu).toHaveClass('md-menu-content')

    const menuItems = screen.getAllByRole('menuitem')
    expect(menuItems).toHaveLength(2)
    expect(menuItems[0]).toHaveClass('md-menu-item')
  })

  it('calls onSelect with the item value and closes', async () => {
    const onSelect = vi.fn()
    render(<Menu triggerLabel="Actions" items={items} onSelect={onSelect} />)

    fireEvent.click(screen.getByRole('button', { name: /Actions/ }))
    const menuItems = await screen.findAllByRole('menuitem')

    // jsdom fires no hover, so highlight the item as a pointer would before clicking.
    fireEvent.pointerMove(menuItems[1], { pointerType: 'mouse' })
    await waitFor(() => expect(menuItems[1]).toHaveAttribute('data-highlighted'))

    fireEvent.click(menuItems[1])
    await waitFor(() => expect(onSelect).toHaveBeenCalledWith('delete'))
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })
})
