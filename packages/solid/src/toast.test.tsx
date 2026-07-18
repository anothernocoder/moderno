import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@solidjs/testing-library'
import { createToaster, Toaster } from './toast'

afterEach(cleanup)

describe('Toaster', () => {
  it('renders a region with no toasts until one is created', () => {
    const toaster = createToaster()
    render(() => <Toaster toaster={toaster} />)

    const region = screen.getByRole('region', { name: /Notifications/ })
    expect(region).toHaveClass('md-toast-group')
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('shows a created toast with the anatomy classes and ARIA, then dismisses it', async () => {
    const toaster = createToaster()
    render(() => <Toaster toaster={toaster} />)

    toaster.create({ title: 'Saved', description: 'Your changes were saved.', type: 'success' })

    const toastEl = await screen.findByRole('status')
    expect(toastEl).toHaveClass('md-toast')
    expect(toastEl).toHaveAttribute('data-type', 'success')

    const title = screen.getByText('Saved')
    expect(title).toHaveClass('md-toast-title')
    const description = screen.getByText('Your changes were saved.')
    expect(description).toHaveClass('md-toast-description')

    const closeButton = screen.getByRole('button', { name: 'Dismiss' })
    expect(closeButton).toHaveClass('md-toast-close')

    fireEvent.click(closeButton)
    // Assert the dismiss transition itself, not the exit-animation removal —
    // that's gated on a real removeDelay timer and flakes under CI load.
    await waitFor(() => expect(toastEl).toHaveAttribute('data-state', 'closed'))
  })

  it('calls the action handler and dismisses on click', async () => {
    const onAction = vi.fn()
    const toaster = createToaster()
    render(() => <Toaster toaster={toaster} />)

    toaster.create({ title: 'Upload failed', action: { label: 'Retry', onClick: onAction } })

    const toastEl = await screen.findByRole('status')
    const actionButton = screen.getByRole('button', { name: 'Retry' })
    fireEvent.click(actionButton)

    await waitFor(() => expect(onAction).toHaveBeenCalledTimes(1))
    await waitFor(() => expect(toastEl).toHaveAttribute('data-state', 'closed'))
  })
})
