import { Show, type JSX } from 'solid-js'
import { CheckoutForms, type CheckoutFormsValues } from '../../../blocks/ecommerce/checkout-forms/CheckoutForms.solid'

export type { CheckoutFormsValues }

export interface PaymentScreenProps {
  values: Partial<CheckoutFormsValues>
  onNext: (values: CheckoutFormsValues) => void
  onBack?: () => void
  title?: string
  description?: string
  submitLabel?: string
  backLabel?: string
}

const wrapperStyle: JSX.CSSProperties = {
  'min-height': '100%',
  background: 'var(--md-surface-base)',
  padding: '24px',
}
const headerStyle: JSX.CSSProperties = {
  'max-width': '640px',
  margin: '0 auto 16px',
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
const formWrapStyle: JSX.CSSProperties = { 'max-width': '640px', margin: '0 auto' }

/**
 * Moderno screen — Payment (Solid). Copy-paste; edit freely.
 * Payment step of the Checkout flow (ADR-0005): re-surfaces the same ecommerce
 * CheckoutForms block used by the Shipping screen, pre-filled with `values`
 * carried forward from that step — since the block bundles address + payment
 * into one form, this is the point where the user reviews everything once
 * more and can still tweak the card fields before moving to review. `onNext`
 * forwards CheckoutForms' `onCheckout` callback.
 */
export function Payment(props: PaymentScreenProps) {
  return (
    <div style={wrapperStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>{props.title ?? 'Método de pago'}</h1>
          <p style={descriptionStyle}>{props.description ?? 'Confirma o actualiza los datos de tu tarjeta.'}</p>
        </div>
        <Show when={props.onBack}>
          <button type="button" style={linkButtonStyle} onClick={() => props.onBack?.()}>
            {props.backLabel ?? 'Volver a envío'}
          </button>
        </Show>
      </div>
      <div style={formWrapStyle}>
        <CheckoutForms
          heading=""
          defaultValues={props.values}
          submitLabel={props.submitLabel ?? 'Continuar a revisión'}
          onCheckout={props.onNext}
        />
      </div>
    </div>
  )
}
