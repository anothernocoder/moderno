import type { CSSProperties } from 'react'
import {
  ShoppingCart,
  type ShoppingCartItem,
  type ShoppingCartCheckoutPayload,
} from '../../../blocks/ecommerce/shopping-cart/ShoppingCart'

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

const wrapperStyle: CSSProperties = {
  minHeight: '100%',
  background: 'var(--md-surface-base)',
}
const topBarStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px 12px',
  maxWidth: '720px',
  margin: '0 auto',
  padding: '24px 24px 0',
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

/**
 * Moderno screen — Cart (React). Copy-paste; edit freely.
 * Cart step of the Checkout flow (ADR-0005): composes the ecommerce ShoppingCart
 * block instead of re-implementing its line-item/quantity/subtotal markup. This
 * screen owns no state of its own — quantity edits and removals live inside
 * ShoppingCart's own local state — it only forwards ShoppingCart's `onCheckout`
 * callback through `onNext`. Also addable standalone (`moderno add cart`) since
 * a cart view is reused outside the checkout journey too.
 */
export function Cart({
  items,
  onNext,
  onBack,
  title = 'Tu carrito',
  description = 'Revisa tus productos antes de continuar.',
  checkoutLabel = 'Continuar a envío',
  backLabel = 'Seguir comprando',
}: CartScreenProps) {
  return (
    <div style={wrapperStyle}>
      <div style={topBarStyle}>
        <p style={descriptionStyle}>{description}</p>
        {onBack ? (
          <button type="button" style={linkButtonStyle} onClick={onBack}>
            {backLabel}
          </button>
        ) : null}
      </div>
      <ShoppingCart heading={title} items={items} checkoutLabel={checkoutLabel} onCheckout={onNext} />
    </div>
  )
}
