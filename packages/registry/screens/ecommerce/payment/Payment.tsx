import type { CSSProperties } from 'react'
import { CheckoutForms, type CheckoutFormsValues } from '../../../blocks/ecommerce/checkout-forms/CheckoutForms'

export type { CheckoutFormsValues }

export interface PaymentScreenProps {
  /** Values carried forward from the shipping step — pre-fills the form so the
   * user only has to review or adjust the card details. */
  values: Partial<CheckoutFormsValues>
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
 * Moderno screen — Payment (React). Copy-paste; edit freely.
 * Payment step of the Checkout flow (ADR-0005): re-surfaces the same ecommerce
 * CheckoutForms block used by the Shipping screen, pre-filled with `values`
 * carried forward from that step — since the block bundles address + payment
 * into one form, this is the point where the user reviews everything once
 * more and can still tweak the card fields before moving to review. `onNext`
 * forwards CheckoutForms' `onCheckout` payload.
 */
export function Payment({
  values,
  onNext,
  onBack,
  title = 'Método de pago',
  description = 'Confirma o actualiza los datos de tu tarjeta.',
  submitLabel = 'Continuar a revisión',
  backLabel = 'Volver a envío',
}: PaymentScreenProps) {
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
