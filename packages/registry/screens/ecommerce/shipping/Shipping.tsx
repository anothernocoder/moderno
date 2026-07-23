import type { CSSProperties } from 'react'
import { CheckoutForms, type CheckoutFormsValues } from '../../../blocks/ecommerce/checkout-forms/CheckoutForms'

export type { CheckoutFormsValues }

export interface ShippingScreenProps {
  /** Seed values — e.g. carried back from the payment step when the user goes back to edit. */
  values?: Partial<CheckoutFormsValues>
  onNext: (values: CheckoutFormsValues) => void
  onBack?: () => void
  title?: string
  description?: string
  submitLabel?: string
  backLabel?: string
}

const wrapperStyle: CSSProperties = {
  minHeight: '100%',
  background: 'var(--md-surface-base)',
  padding: '24px',
}
const headerStyle: CSSProperties = {
  maxWidth: '640px',
  margin: '0 auto 16px',
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
const formWrapStyle: CSSProperties = { maxWidth: '640px', margin: '0 auto' }

/**
 * Moderno screen — Shipping (React). Copy-paste; edit freely.
 * Shipping step of the Checkout flow (ADR-0005): composes the ecommerce
 * CheckoutForms block, which bundles the shipping-address and payment sections
 * into one form (that's how the block itself ships — it isn't split by
 * section). This screen is the one place in the journey where the user types
 * in both; the screen's own header/back-link chrome wraps the block without
 * touching its internal markup. `onNext` forwards CheckoutForms' `onCheckout`
 * payload — the Payment screen re-surfaces the same block, pre-filled, to let
 * the user review or adjust the card details before moving on.
 */
export function Shipping({
  values,
  onNext,
  onBack,
  title = 'Dirección de envío',
  description = 'Cuéntanos a dónde enviamos tu pedido y cómo prefieres pagar.',
  submitLabel = 'Continuar a pago',
  backLabel = 'Volver al carrito',
}: ShippingScreenProps) {
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
      <div style={formWrapStyle}>
        <CheckoutForms heading="" defaultValues={values} submitLabel={submitLabel} onCheckout={onNext} />
      </div>
    </div>
  )
}
