import { useState, type CSSProperties } from 'react'

export interface PromoProps {
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
  gap: '8px 16px',
  maxWidth: '1040px',
  margin: '0 auto',
  padding: '10px 48px',
  textAlign: 'center',
}
const messageStyle: CSSProperties = {
  margin: 0,
  fontSize: 'var(--md-text-body-sm)',
  lineHeight: 'var(--md-text-body-sm-lh)',
  fontWeight: 600,
}
const ctaLinkStyle: CSSProperties = {
  color: 'inherit',
  fontSize: 'var(--md-text-body-sm)',
  fontWeight: 600,
  textDecoration: 'underline',
  whiteSpace: 'nowrap',
  flexShrink: 0,
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
 * Moderno block — Promo (React). Copy-paste; edit freely.
 * Sitewide promotional announcement bar: a message, an optional CTA link, and an
 * optional close button. Plain layout + `--md-*` tokens, no primitives.
 */
export function Promo({
  message = 'Envío gratis en pedidos mayores a $50.000. Hoy: 20% de descuento en toda la tienda.',
  ctaLabel = 'Ver ofertas',
  ctaHref = '#',
  onCtaClick,
  dismissible = true,
  onDismiss,
  closeLabel = 'Cerrar',
}: PromoProps) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  function handleDismiss() {
    setVisible(false)
    onDismiss?.()
  }

  return (
    <div style={barStyle} role="region" aria-label="Promoción">
      <div style={rowStyle}>
        <p style={messageStyle}>{message}</p>
        {ctaLabel ? (
          <a href={ctaHref} style={ctaLinkStyle} onClick={onCtaClick}>
            {ctaLabel}
          </a>
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
