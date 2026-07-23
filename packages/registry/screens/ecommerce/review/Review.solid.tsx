import { Show, type JSX } from 'solid-js'
import { Button, Divider } from '@moderno/solid'
import { OrderSummaries, type OrderSummariesItem } from '../../../blocks/ecommerce/order-summaries/OrderSummaries.solid'
import type { CheckoutFormsValues } from '../../../blocks/ecommerce/checkout-forms/CheckoutForms.solid'

export type { OrderSummariesItem }

export interface ReviewScreenProps {
  items?: OrderSummariesItem[]
  shipping: Pick<CheckoutFormsValues, 'fullName' | 'address' | 'city' | 'postalCode' | 'country'>
  payment: Pick<CheckoutFormsValues, 'cardName' | 'cardNumber'>
  onNext: () => void
  onBack?: () => void
  title?: string
  description?: string
  submitLabel?: string
  backLabel?: string
  submitting?: boolean
}

function maskCardNumber(cardNumber: string): string {
  const digits = cardNumber.replace(/\D/g, '')
  if (digits.length < 4) return '••••'
  return `•••• ${digits.slice(-4)}`
}

const wrapperStyle: JSX.CSSProperties = {
  'min-height': '100%',
  background: 'var(--md-surface-base)',
  padding: '24px',
}
const headerStyle: JSX.CSSProperties = {
  'max-width': '720px',
  margin: '0 auto 24px',
  display: 'flex',
  'flex-wrap': 'wrap',
  'align-items': 'center',
  'justify-content': 'space-between',
  gap: '8px 12px',
}
const titleStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': 'var(--md-text-headline-lg)',
  color: 'var(--md-text-primary)',
  margin: '0 0 4px',
}
const descriptionStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const linkButtonStyle: JSX.CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 0,
  font: 'inherit',
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-primary)',
  'text-decoration': 'underline',
  cursor: 'pointer',
}
const gridStyle: JSX.CSSProperties = {
  'max-width': '720px',
  margin: '0 auto',
  display: 'grid',
  'grid-template-columns': 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '24px',
  'align-items': 'start',
}
const recapCardStyle: JSX.CSSProperties = {
  border: '1px solid var(--md-border-default)',
  background: 'var(--md-surface-base)',
}
const recapSectionStyle: JSX.CSSProperties = { padding: '20px 24px' }
const recapTitleStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-headline-md)',
  'font-weight': 600,
  color: 'var(--md-text-primary)',
  margin: '0 0 8px',
}
const recapLineStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
  'line-height': 'var(--md-text-body-sm-lh)',
}
const footerStyle: JSX.CSSProperties = {
  'max-width': '720px',
  margin: '24px auto 0',
  display: 'flex',
  'justify-content': 'flex-end',
}

/**
 * Moderno screen — Review (Solid). Copy-paste; edit freely.
 * Review step of the Checkout flow (ADR-0005): composes the ecommerce
 * OrderSummaries block for the read-only items/subtotal/shipping/tax/total
 * breakdown instead of re-implementing that markup. The shipping-address and
 * masked-payment recap alongside it is this screen's own simple text markup —
 * there's no dedicated "read-only address/card" block to compose, so it isn't
 * duplicating any block's internals. `onNext` places the order.
 */
export function Review(props: ReviewScreenProps) {
  return (
    <div style={wrapperStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>{props.title ?? 'Revisa tu pedido'}</h1>
          <p style={descriptionStyle}>
            {props.description ?? 'Confirma que todo esté correcto antes de completar la compra.'}
          </p>
        </div>
        <Show when={props.onBack}>
          <button type="button" style={linkButtonStyle} onClick={() => props.onBack?.()}>
            {props.backLabel ?? 'Volver a pago'}
          </button>
        </Show>
      </div>

      <div style={gridStyle}>
        <OrderSummaries items={props.items} />

        <div style={recapCardStyle}>
          <div style={recapSectionStyle}>
            <h2 style={recapTitleStyle}>Envío</h2>
            <p style={recapLineStyle}>{props.shipping.fullName}</p>
            <p style={recapLineStyle}>{props.shipping.address}</p>
            <p style={recapLineStyle}>
              {props.shipping.city}, {props.shipping.postalCode}
            </p>
            <p style={recapLineStyle}>{props.shipping.country}</p>
          </div>
          <Divider />
          <div style={recapSectionStyle}>
            <h2 style={recapTitleStyle}>Pago</h2>
            <p style={recapLineStyle}>{props.payment.cardName}</p>
            <p style={recapLineStyle}>{maskCardNumber(props.payment.cardNumber)}</p>
          </div>
        </div>
      </div>

      <div style={footerStyle}>
        <Button variant="primary" size="lg" disabled={props.submitting} onClick={() => props.onNext()}>
          {props.submitting ? 'Procesando…' : props.submitLabel ?? 'Confirmar pedido'}
        </Button>
      </div>
    </div>
  )
}
