import type { CSSProperties } from 'react'
import { Button } from '@moderno/react'

export interface ConfirmationScreenProps {
  orderNumber?: string
  email?: string
  onContinueShopping?: () => void
  title?: string
  description?: string
  continueLabel?: string
}

const wrapperStyle: CSSProperties = {
  minHeight: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
  background: 'var(--md-surface-base)',
}
const cardStyle: CSSProperties = {
  width: '100%',
  maxWidth: '420px',
  border: '1px solid var(--md-border-default)',
  padding: '32px',
  textAlign: 'center',
}
const badgeStyle: CSSProperties = {
  width: '56px',
  height: '56px',
  borderRadius: '50%',
  background: 'var(--md-surface-muted)',
  color: 'var(--md-text-primary)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 20px',
  fontSize: '24px',
}
const titleStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: 'var(--md-text-headline-lg)',
  color: 'var(--md-text-primary)',
  margin: '0 0 8px',
}
const descriptionStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  lineHeight: 'var(--md-text-body-sm-lh)',
  color: 'var(--md-text-secondary)',
  margin: '0 0 24px',
}
const orderNumberStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '20px',
  color: 'var(--md-text-primary)',
  margin: '0 0 24px',
}
const continueStyle: CSSProperties = { width: '100%' }

/**
 * Moderno screen — Confirmation (React). Copy-paste; edit freely.
 * Final step of the Checkout flow (ADR-0005): a simple presentational
 * "order placed" success view. No E-Commerce block fits a one-off success
 * message, so this screen composes only the Button primitive + Moderno
 * tokens — matching how a screen may compose blocks OR primitives directly,
 * whichever the step actually needs.
 */
export function Confirmation({
  orderNumber = '#MD-10482',
  email,
  onContinueShopping,
  title = '¡Pedido confirmado!',
  description = 'Gracias por tu compra. Te enviamos los detalles de tu pedido por correo.',
  continueLabel = 'Seguir comprando',
}: ConfirmationScreenProps) {
  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        <div style={badgeStyle}>✓</div>
        <h1 style={titleStyle}>{title}</h1>
        <p style={descriptionStyle}>
          {description}
          {email ? ` Revisa ${email}.` : ''}
        </p>
        <p style={orderNumberStyle}>{orderNumber}</p>
        <Button variant="primary" style={continueStyle} onClick={onContinueShopping}>
          {continueLabel}
        </Button>
      </div>
    </div>
  )
}
