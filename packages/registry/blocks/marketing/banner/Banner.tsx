import { useState, type CSSProperties } from 'react'
import { Button } from '@moderno/react'

export interface BannerProps {
  message?: string
  ctaLabel?: string
  ctaHref?: string
  onCtaClick?: () => void
  dismissible?: boolean
  onDismiss?: () => void
  closeLabel?: string
}

const barStyle: CSSProperties = {
  position: 'relative',
  background: 'var(--md-primary)',
  color: 'var(--md-on-primary)',
}
const rowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '16px',
  maxWidth: '1040px',
  margin: '0 auto',
  padding: '12px 56px',
}
const messageStyle: CSSProperties = {
  margin: 0,
  fontSize: 'var(--md-text-body-sm)',
  lineHeight: 'var(--md-text-body-sm-lh)',
  textAlign: 'center',
}
const ctaLinkStyle: CSSProperties = {
  color: 'inherit',
  fontWeight: 600,
  textDecoration: 'underline',
  whiteSpace: 'nowrap',
}
const closeButtonStyle: CSSProperties = {
  position: 'absolute',
  top: '50%',
  right: '16px',
  transform: 'translateY(-50%)',
  background: 'transparent',
  border: 'none',
  color: 'inherit',
  font: 'inherit',
  fontSize: '18px',
  lineHeight: 1,
  cursor: 'pointer',
  padding: '4px',
}

/**
 * Moderno block — Banner (React). Copy-paste; edit freely.
 * Dismissible top-of-page promo/announcement strip. Uses the Button primitive + Moderno tokens.
 */
export function Banner({
  message = 'Lanzamos blocks para React, Vue, Svelte y Solid — mismo look, cualquier framework.',
  ctaLabel = 'Ver blocks',
  ctaHref,
  onCtaClick,
  dismissible = true,
  onDismiss,
  closeLabel = 'Cerrar',
}: BannerProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  function handleDismiss() {
    setDismissed(true)
    onDismiss?.()
  }

  return (
    <div style={barStyle}>
      <div style={rowStyle}>
        <p style={messageStyle}>{message}</p>
        {ctaLabel ? (
          ctaHref ? (
            <a href={ctaHref} style={ctaLinkStyle}>
              {ctaLabel}
            </a>
          ) : (
            <Button
              label={ctaLabel}
              size="sm"
              variant="secondary"
              onClick={onCtaClick}
              style={{ borderColor: 'var(--md-on-primary)', color: 'var(--md-on-primary)' }}
            />
          )
        ) : null}
      </div>
      {dismissible ? (
        <button type="button" aria-label={closeLabel} onClick={handleDismiss} style={closeButtonStyle}>
          ×
        </button>
      ) : null}
    </div>
  )
}
