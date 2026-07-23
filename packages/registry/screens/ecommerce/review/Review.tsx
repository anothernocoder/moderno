import type { CSSProperties } from 'react'
import { Button, Divider } from '@moderno/react'
import { OrderSummaries, type OrderSummariesItem } from '../../../blocks/ecommerce/order-summaries/OrderSummaries'
import type { CheckoutFormsValues } from '../../../blocks/ecommerce/checkout-forms/CheckoutForms'

export type { OrderSummariesItem }

export interface ReviewScreenProps {
  items?: OrderSummariesItem[]
  /** Shipping + payment values carried forward from the previous steps — shown
   * read-only here; card number is masked to its last 4 digits. */
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

const wrapperStyle: CSSProperties = {
  minHeight: '100%',
  background: 'var(--md-surface-base)',
  padding: '24px',
}
const headerStyle: CSSProperties = {
  maxWidth: '720px',
  margin: '0 auto 24px',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px 12px',
}
const titleStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: 'var(--md-text-headline-lg)',
  color: 'var(--md-text-primary)',
  margin: '0 0 4px',
}
const descriptionStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const linkButtonStyle: CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 0,
  font: 'inherit',
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-primary)',
  textDecoration: 'underline',
  cursor: 'pointer',
}
const gridStyle: CSSProperties = {
  maxWidth: '720px',
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '24px',
  alignItems: 'start',
}
const recapCardStyle: CSSProperties = {
  border: '1px solid var(--md-border-default)',
  background: 'var(--md-surface-base)',
}
const recapSectionStyle: CSSProperties = { padding: '20px 24px' }
const recapTitleStyle: CSSProperties = {
  fontSize: 'var(--md-text-headline-md)',
  fontWeight: 600,
  color: 'var(--md-text-primary)',
  margin: '0 0 8px',
}
const recapLineStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
  lineHeight: 'var(--md-text-body-sm-lh)',
}
const footerStyle: CSSProperties = {
  maxWidth: '720px',
  margin: '24px auto 0',
  display: 'flex',
  justifyContent: 'flex-end',
}

/**
 * Moderno screen — Review (React). Copy-paste; edit freely.
 * Review step of the Checkout flow (ADR-0005): composes the ecommerce
 * OrderSummaries block for the read-only items/subtotal/shipping/tax/total
 * breakdown instead of re-implementing that markup. The shipping-address and
 * masked-payment recap alongside it is this screen's own simple text markup —
 * there's no dedicated "read-only address/card" block to compose, so it isn't
 * duplicating any block's internals. `onNext` places the order.
 */
export function Review({
  items,
  shipping,
  payment,
  onNext,
  onBack,
  title = 'Revisa tu pedido',
  description = 'Confirma que todo esté correcto antes de completar la compra.',
  submitLabel = 'Confirmar pedido',
  backLabel = 'Volver a pago',
  submitting,
}: ReviewScreenProps) {
  return (
    <div style={wrapperStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>{title}</h1>
          <p style={descriptionStyle}>{description}</p>
        </div>
        {onBack ? (
          <button type="button" style={linkButtonStyle} onClick={onBack}>
            {backLabel}
          </button>
        ) : null}
      </div>

      <div style={gridStyle}>
        <OrderSummaries items={items} />

        <div style={recapCardStyle}>
          <div style={recapSectionStyle}>
            <h2 style={recapTitleStyle}>Envío</h2>
            <p style={recapLineStyle}>{shipping.fullName}</p>
            <p style={recapLineStyle}>{shipping.address}</p>
            <p style={recapLineStyle}>
              {shipping.city}, {shipping.postalCode}
            </p>
            <p style={recapLineStyle}>{shipping.country}</p>
          </div>
          <Divider />
          <div style={recapSectionStyle}>
            <h2 style={recapTitleStyle}>Pago</h2>
            <p style={recapLineStyle}>{payment.cardName}</p>
            <p style={recapLineStyle}>{maskCardNumber(payment.cardNumber)}</p>
          </div>
        </div>
      </div>

      <div style={footerStyle}>
        <Button variant="primary" size="lg" onClick={onNext} disabled={submitting}>
          {submitting ? 'Procesando…' : submitLabel}
        </Button>
      </div>
    </div>
  )
}
