import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/svelte'
import Menu from './Menu.svelte'

const items = [
  { label: 'Edit', value: 'edit' },
  { label: 'Delete', value: 'delete' },
]

afterEach(cleanup)

describe('Menu', () => {
  it('applies the anatomy classes and opens with Zag ARIA', async () => {
    render(Menu, { triggerLabel: 'Actions', items })

    const trigger = screen.getByRole('button', { name: /Actions/ })
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()

    await fireEvent.click(trigger)

    const menu = await screen.findByRole('menu')
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(menu).toHaveClass('md-menu-content')

    const menuItems = screen.getAllByRole('menuitem')
    expect(menuItems).toHaveLength(2)
    expect(menuItems[0]).toHaveClass('md-menu-item')
  })

  it('calls onSelect with the item value and closes', async () => {
    const onSelect = vi.fn()
    render(Menu, { triggerLabel: 'Actions', items, onSelect })

    await fireEvent.click(screen.getByRole('button', { name: /Actions/ }))
    const menuItems = await screen.findAllByRole('menuitem')

    // jsdom fires no hover, so highlight the item as a pointer would before clicking.
    await fireEvent.pointerMove(menuItems[1], { pointerType: 'mouse' })
    await waitFor(() => expect(menuItems[1]).toHaveAttribute('data-highlighted'))

    await fireEvent.click(menuItems[1])
    await waitFor(() => expect(onSelect).toHaveBeenCalledWith('delete'))
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })
})
