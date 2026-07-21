import { createSignal, Show } from 'solid-js'
import type { JSX } from 'solid-js'
import { Button } from '@moderno/solid'

export interface BannerProps {
  message?: string
  ctaLabel?: string
  ctaHref?: string
  onCtaClick?: () => void
  dismissible?: boolean
  onDismiss?: () => void
  closeLabel?: string
}

const barStyle: JSX.CSSProperties = {
  position: 'relative',
  background: 'var(--md-primary)',
  color: 'var(--md-on-primary)',
}
const rowStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'center',
  'flex-wrap': 'wrap',
  gap: '16px',
  'max-width': '1040px',
  margin: '0 auto',
  padding: '12px 56px',
}
const messageStyle: JSX.CSSProperties = {
  margin: 0,
  'font-size': 'var(--md-text-body-sm)',
  'line-height': 'var(--md-text-body-sm-lh)',
  'text-align': 'center',
}
const ctaLinkStyle: JSX.CSSProperties = {
  color: 'inherit',
  'font-weight': 600,
  'text-decoration': 'underline',
  'white-space': 'nowrap',
}
const closeButtonStyle: JSX.CSSProperties = {
  position: 'absolute',
  top: '50%',
  right: '16px',
  transform: 'translateY(-50%)',
  background: 'transparent',
  border: 'none',
  color: 'inherit',
  font: 'inherit',
  'font-size': '18px',
  'line-height': 1,
  cursor: 'pointer',
  padding: '4px',
}

/**
 * Moderno block — Banner (Solid). Copy-paste; edit freely.
 * Dismissible top-of-page promo/announcement strip. Uses the Button primitive + Moderno tokens.
 */
export function Banner(props: BannerProps) {
  const message = () =>
    props.message ?? 'Lanzamos blocks para React, Vue, Svelte y Solid — mismo look, cualquier framework.'
  const ctaLabel = () => props.ctaLabel ?? 'Ver blocks'
  const dismissible = () => props.dismissible ?? true
  const closeLabel = () => props.closeLabel ?? 'Cerrar'

  const [dismissed, setDismissed] = createSignal(false)

  function handleDismiss() {
    setDismissed(true)
    props.onDismiss?.()
  }

  return (
    <Show when={!dismissed()}>
      <div style={barStyle}>
        <div style={rowStyle}>
          <p style={messageStyle}>{message()}</p>
          <Show when={ctaLabel()}>
            <Show
              when={props.ctaHref}
              fallback={
                <Button
                  label={ctaLabel()}
                  size="sm"
                  variant="secondary"
                  onClick={props.onCtaClick}
                  style={{ 'border-color': 'var(--md-on-primary)', color: 'var(--md-on-primary)' }}
                />
              }
            >
              <a href={props.ctaHref} style={ctaLinkStyle}>
                {ctaLabel()}
              </a>
            </Show>
          </Show>
        </div>
        <Show when={dismissible()}>
          <button type="button" aria-label={closeLabel()} onClick={handleDismiss} style={closeButtonStyle}>
            ×
          </button>
        </Show>
      </div>
    </Show>
  )
}
