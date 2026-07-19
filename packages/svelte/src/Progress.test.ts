import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/svelte'
import Progress from './Progress.svelte'

afterEach(cleanup)

describe('Progress', () => {
  it('applies the anatomy classes and the Zag progressbar ARIA for a linear determinate bar', () => {
    const { container } = render(Progress, { label: 'Upload', value: 40, min: 0, max: 100 })
    expect(container.querySelector(':scope > .md-progress')).not.toBeNull()
    expect(container.querySelector(':scope > .md-progress')).not.toHaveClass('md-progress--circular')

    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveClass('md-progress-track')
    expect(bar).toHaveAttribute('aria-valuemin', '0')
    expect(bar).toHaveAttribute('aria-valuemax', '100')
    expect(bar).toHaveAttribute('aria-valuenow', '40')

    expect(screen.getByText('Upload')).toHaveClass('md-progress-label')
    expect(screen.getByText('40%')).toHaveClass('md-progress-value-text')
  })

  it('renders the circular variant with the circle anatomy and md-progress--circular', () => {
    render(Progress, { label: 'Sync', value: 75, variant: 'circular' })

    const bar = screen.getByRole('progressbar')
    expect(bar.tagName.toLowerCase()).toBe('svg')
    expect(bar).toHaveClass('md-progress-circle')
    expect(bar).toHaveAttribute('aria-valuenow', '75')

    const [track, range] = bar.querySelectorAll('circle')
    expect(track).toHaveClass('md-progress-circle-track')
    expect(range).toHaveClass('md-progress-circle-range')
  })

  it('marks the indeterminate state when value is null', () => {
    render(Progress, { label: 'Connecting', value: null })

    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('data-state', 'indeterminate')
    expect(bar).not.toHaveAttribute('aria-valuenow')
    expect(screen.getByText('loading...')).toHaveClass('md-progress-value-text')
  })

  it('omits the header when there is no label and showValue is false', () => {
    const { container } = render(Progress, { value: 20, showValue: false })
    expect(container.querySelector('.md-progress-header')).toBeNull()
  })

  it('reflects a value prop change via the public API', async () => {
    const { rerender } = render(Progress, { label: 'Upload', value: 10 })
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '10')

    await rerender({ label: 'Upload', value: 90 })
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '90')
  })
})
