import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { Alert } from './alert'

afterEach(cleanup)

describe('Alert', () => {
  it('renders as an alert region with the default info variant', () => {
    render(<Alert>Something happened.</Alert>)

    const alertEl = screen.getByRole('alert')
    expect(alertEl).toHaveClass('md-alert', 'md-alert--info')

    const body = screen.getByText('Something happened.')
    expect(body).toHaveClass('md-alert__body')
  })

  it('renders the title anatomy class when a title is passed', () => {
    render(
      <Alert variant="error" title="Save failed">
        Check your connection and try again.
      </Alert>,
    )

    const alertEl = screen.getByRole('alert')
    expect(alertEl).toHaveClass('md-alert', 'md-alert--error')

    const title = screen.getByText('Save failed')
    expect(title).toHaveClass('md-alert__title')
  })

  it('omits the title element when no title is passed', () => {
    render(<Alert variant="success">Saved.</Alert>)

    const body = screen.getByText('Saved.')
    expect(body.previousElementSibling).toBeNull()
  })

  it('reflects a variant prop change via the public API', () => {
    const { rerender } = render(<Alert variant="warning">Heads up.</Alert>)
    expect(screen.getByRole('alert')).toHaveClass('md-alert--warning')

    rerender(<Alert variant="error">Heads up.</Alert>)
    expect(screen.getByRole('alert')).toHaveClass('md-alert--error')
    expect(screen.getByRole('alert')).not.toHaveClass('md-alert--warning')
  })
})
