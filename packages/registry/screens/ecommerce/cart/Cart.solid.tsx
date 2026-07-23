import { Show, type JSX } from 'solid-js'
import {
  ShoppingCart,
  type ShoppingCartItem,
  type ShoppingCartCheckoutPayload,
} from '../../../blocks/ecommerce/shopping-cart/ShoppingCart.solid'

export type { ShoppingCartItem, ShoppingCartCheckoutPayload }

export interface CartScreenProps {
  items?: ShoppingCartItem[]
  onNext: (payload: ShoppingCartCheckoutPayload) => void
  onBack?: () => void
  title?: string
  description?: string
  checkoutLabel?: string
  backLabel?: string
}

const wrapperStyle: JSX.CSSProperties = {
  'min-height': '100%',
  background: 'var(--md-surface-base)',
}
const topBarStyle: JSX.CSSProperties = {
  display: 'flex',
  'flex-wrap': 'wrap',
  'align-items': 'center',
  'justify-content': 'space-between',
  gap: '8px 12px',
  'max-width': '720px',
  margin: '0 auto',
  padding: '24px 24px 0',
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

/**
 * Moderno screen — Cart (Solid). Copy-paste; edit freely.
 * Cart step of the Checkout flow (ADR-0005): composes the ecommerce ShoppingCart
 * block instead of re-implementing its line-item/quantity/subtotal markup. This
 * screen owns no state of its own — quantity edits and removals live inside
 * ShoppingCart's own local state — it only forwards ShoppingCart's `onCheckout`
 * callback through `onNext`. Also addable standalone (`moderno add cart`) since
 * a cart view is reused outside the checkout journey too.
 */
export function Cart(props: CartScreenProps) {
  return (
    <div style={wrapperStyle}>
      <div style={topBarStyle}>
        <p style={descriptionStyle}>{props.description ?? 'Revisa tus productos antes de continuar.'}</p>
        <Show when={props.onBack}>
          <button type="button" style={linkButtonStyle} onClick={() => props.onBack?.()}>
            {props.backLabel ?? 'Seguir comprando'}
          </button>
        </Show>
      </div>
      <ShoppingCart
        heading={props.title ?? 'Tu carrito'}
        items={props.items}
        checkoutLabel={props.checkoutLabel ?? 'Continuar a envío'}
        onCheckout={props.onNext}
      />
    </div>
  )
}
