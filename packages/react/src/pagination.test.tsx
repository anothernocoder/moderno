import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Pagination } from './pagination'

afterEach(cleanup)

function item(page: number) {
  return screen.getByText(String(page), { selector: '.md-pagination-item' })
}

describe('Pagination', () => {
  it('renders the root nav, prev/next triggers and page items with the md-* class contract', () => {
    render(<Pagination count={30} defaultPageSize={10} defaultPage={1} />)

    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('md-pagination')
    expect(nav).toHaveAttribute('aria-label', 'pagination')

    const prev = screen.getByLabelText('previous page')
    expect(prev).toHaveClass('md-pagination-prev')
    const next = screen.getByLabelText('next page')
    expect(next).toHaveClass('md-pagination-next')

    for (const page of [1, 2, 3]) {
      expect(item(page)).toHaveClass('md-pagination-item')
    }
  })

  it('marks the current page item with aria-current and disables prev on the first page', () => {
    render(<Pagination count={30} defaultPageSize={10} defaultPage={1} />)

    expect(item(1)).toHaveAttribute('aria-current', 'page')
    expect(item(2)).not.toHaveAttribute('aria-current')
    expect(screen.getByLabelText('previous page')).toBeDisabled()
    expect(screen.getByLabelText('next page')).not.toBeDisabled()
  })

  it('disables next on the last page', () => {
    render(<Pagination count={30} defaultPageSize={10} defaultPage={3} />)

    expect(screen.getByLabelText('next page')).toBeDisabled()
    expect(screen.getByLabelText('previous page')).not.toBeDisabled()
  })

  it('renders an ellipsis with the md-pagination-ellipsis class when the page range is truncated', () => {
    const { container } = render(<Pagination count={200} defaultPageSize={10} defaultPage={10} siblingCount={1} boundaryCount={1} />)
    expect(container.querySelectorAll('.md-pagination-ellipsis').length).toBeGreaterThan(0)
  })

  it('moves to the next page on click and calls onPageChange with the public API', async () => {
    const onPageChange = vi.fn()
    render(<Pagination count={30} defaultPageSize={10} defaultPage={1} onPageChange={onPageChange} />)

    fireEvent.click(screen.getByLabelText('next page'))

    await waitFor(() => expect(onPageChange).toHaveBeenCalledWith(2))
    expect(item(2)).toHaveAttribute('aria-current', 'page')
  })

  it('supports a controlled page prop', () => {
    const { rerender } = render(<Pagination count={30} defaultPageSize={10} page={1} onPageChange={() => {}} />)
    expect(item(1)).toHaveAttribute('aria-current', 'page')

    rerender(<Pagination count={30} defaultPageSize={10} page={3} onPageChange={() => {}} />)
    expect(item(3)).toHaveAttribute('aria-current', 'page')
  })

  it('accepts custom translations for localized aria-labels', () => {
    render(
      <Pagination
        count={30}
        defaultPageSize={10}
        translations={{ rootLabel: 'paginación', prevTriggerLabel: 'página anterior', nextTriggerLabel: 'página siguiente' }}
      />,
    )
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'paginación')
    expect(screen.getByLabelText('página anterior')).toBeInTheDocument()
    expect(screen.getByLabelText('página siguiente')).toBeInTheDocument()
  })
})
