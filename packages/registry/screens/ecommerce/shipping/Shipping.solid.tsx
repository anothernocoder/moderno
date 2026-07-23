import { Show, type JSX } from 'solid-js'
import { CheckoutForms, type CheckoutFormsValues } from '../../../blocks/ecommerce/checkout-forms/CheckoutForms.solid'

export type { CheckoutFormsValues }

export interface ShippingScreenProps {
  values?: Partial<CheckoutFormsValues>
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
 * Moderno screen — Shipping (Solid). Copy-paste; edit freely.
 * Shipping step of the Checkout flow (ADR-0005): composes the ecommerce
 * CheckoutForms block, which bundles the shipping-address and payment sections
 * into one form (that's how the block itself ships — it isn't split by
 * section). This screen is the one place in the journey where the user types
 * in both; the screen's own header/back-link chrome wraps the block without
 * touching its internal markup. `onNext` forwards CheckoutForms' `onCheckout`
 * callback — the Payment screen re-surfaces the same block, pre-filled, to let
 * the user review or adjust the card details before moving on.
 */
export function Shipping(props: ShippingScreenProps) {
  return (
    <div style={wrapperStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>{props.title ?? 'Dirección de envío'}</h1>
          <p style={descriptionStyle}>
            {props.description ?? 'Cuéntanos a dónde enviamos tu pedido y cómo prefieres pagar.'}
          </p>
        </div>
        <Show when={props.onBack}>
          <button type="button" style={linkButtonStyle} onClick={() => props.onBack?.()}>
            {props.backLabel ?? 'Volver al carrito'}
          </button>
        </Show>
      </div>
      <div style={formWrapStyle}>
        <CheckoutForms
          heading=""
          defaultValues={props.values}
          submitLabel={props.submitLabel ?? 'Continuar a pago'}
          onCheckout={props.onNext}
        />
      </div>
    </div>
  )
}
