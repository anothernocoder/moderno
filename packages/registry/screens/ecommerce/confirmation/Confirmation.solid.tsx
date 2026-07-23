import { Show, type JSX } from 'solid-js'
import { Button } from '@moderno/solid'

export interface ConfirmationScreenProps {
  orderNumber?: string
  email?: string
  onContinueShopping?: () => void
  title?: string
  description?: string
  continueLabel?: string
}

const wrapperStyle: JSX.CSSProperties = {
  'min-height': '100%',
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'center',
  padding: '24px',
  background: 'var(--md-surface-base)',
}
const cardStyle: JSX.CSSProperties = {
  width: '100%',
  'max-width': '420px',
  border: '1px solid var(--md-border-default)',
  padding: '32px',
  'text-align': 'center',
}
const badgeStyle: JSX.CSSProperties = {
  width: '56px',
  height: '56px',
  'border-radius': '50%',
  background: 'var(--md-surface-muted)',
  color: 'var(--md-text-primary)',
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'center',
  margin: '0 auto 20px',
  'font-size': '24px',
}
const titleStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': 'var(--md-text-headline-lg)',
  color: 'var(--md-text-primary)',
  margin: '0 0 8px',
}
const descriptionStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  'line-height': 'var(--md-text-body-sm-lh)',
  color: 'var(--md-text-secondary)',
  margin: '0 0 24px',
}
const orderNumberStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '20px',
  color: 'var(--md-text-primary)',
  margin: '0 0 24px',
}
const continueStyle: JSX.CSSProperties = { width: '100%' }

/**
 * Moderno screen — Confirmation (Solid). Copy-paste; edit freely.
 * Final step of the Checkout flow (ADR-0005): a simple presentational
 * "order placed" success view. No E-Commerce block fits a one-off success
 * message, so this screen composes only the Button primitive + Moderno
 * tokens — matching how a screen may compose blocks OR primitives directly,
 * whichever the step actually needs.
 */
export function Confirmation(props: ConfirmationScreenProps) {
  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        <div style={badgeStyle}>✓</div>
        <h1 style={titleStyle}>{props.title ?? '¡Pedido confirmado!'}</h1>
        <p style={descriptionStyle}>
          {props.description ?? 'Gracias por tu compra. Te enviamos los detalles de tu pedido por correo.'}
          <Show when={props.email}> Revisa {props.email}.</Show>
        </p>
        <p style={orderNumberStyle}>{props.orderNumber ?? '#MD-10482'}</p>
        <Button variant="primary" style={continueStyle} onClick={() => props.onContinueShopping?.()}>
          {props.continueLabel ?? 'Seguir comprando'}
        </Button>
      </div>
    </div>
  )
}
