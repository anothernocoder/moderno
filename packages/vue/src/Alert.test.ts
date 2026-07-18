import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/vue'
import Alert from './Alert.vue'

afterEach(cleanup)

describe('Alert', () => {
  it('renders as an alert region with the default info variant', () => {
    render(Alert, { slots: { default: 'Something happened.' } })

    const alertEl = screen.getByRole('alert')
    expect(alertEl).toHaveClass('md-alert', 'md-alert--info')

    const body = screen.getByText('Something happened.')
    expect(body).toHaveClass('md-alert__body')
  })

  it('renders the title anatomy class when a title is passed', () => {
    render(Alert, {
      props: { variant: 'error', title: 'Save failed' },
      slots: { default: 'Check your connection and try again.' },
    })

    const alertEl = screen.getByRole('alert')
    expect(alertEl).toHaveClass('md-alert', 'md-alert--error')

    const title = screen.getByText('Save failed')
    expect(title).toHaveClass('md-alert__title')
  })

  it('omits the title element when no title is passed', () => {
    render(Alert, { props: { variant: 'success' }, slots: { default: 'Saved.' } })

    const body = screen.getByText('Saved.')
    expect(body.previousElementSibling).toBeNull()
  })

  it('reflects a variant prop change via the public API', async () => {
    const { rerender } = render(Alert, {
      props: { variant: 'warning' },
      slots: { default: 'Heads up.' },
    })
    expect(screen.getByRole('alert')).toHaveClass('md-alert--warning')

    await rerender({ variant: 'error' })
    expect(screen.getByRole('alert')).toHaveClass('md-alert--error')
    expect(screen.getByRole('alert')).not.toHaveClass('md-alert--warning')
  })
})
