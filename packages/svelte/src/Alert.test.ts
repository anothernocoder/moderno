import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/svelte'
import AlertFixture from './Alert.fixture.svelte'

afterEach(cleanup)

describe('Alert', () => {
  it('renders as an alert region with the default info variant', () => {
    render(AlertFixture)

    const alertEl = screen.getByRole('alert')
    expect(alertEl).toHaveClass('md-alert', 'md-alert--info')

    const body = screen.getByText('Something happened.')
    expect(body).toHaveClass('md-alert__body')
  })

  it('renders the title anatomy class when a title is passed', () => {
    render(AlertFixture, { variant: 'error', title: 'Save failed' })

    const alertEl = screen.getByRole('alert')
    expect(alertEl).toHaveClass('md-alert', 'md-alert--error')

    const title = screen.getByText('Save failed')
    expect(title).toHaveClass('md-alert__title')
  })

  it('omits the title element when no title is passed', () => {
    render(AlertFixture, { variant: 'success' })

    const body = screen.getByText('Something happened.')
    expect(body.previousElementSibling).toBeNull()
  })

  it('reflects a variant prop change via the public API', async () => {
    const { rerender } = render(AlertFixture, { variant: 'warning' })
    expect(screen.getByRole('alert')).toHaveClass('md-alert--warning')

    await rerender({ variant: 'error' })
    expect(screen.getByRole('alert')).toHaveClass('md-alert--error')
    expect(screen.getByRole('alert')).not.toHaveClass('md-alert--warning')
  })
})
