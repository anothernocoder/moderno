import { useMemo, useState, type CSSProperties } from 'react'
import { Button, Card, NumberInput } from '@moderno/react'

export interface ShoppingCartItem {
  id: string | number
  image?: string
  title: string
  price: number
  quantity?: number
  maxQuantity?: number
}

export interface ShoppingCartCheckoutPayload {
  items: ShoppingCartItem[]
  subtotal: number
}

export interface ShoppingCartProps {
  heading?: string
  items?: ShoppingCartItem[]
  subtotalLabel?: string
  checkoutLabel?: string
  removeLabel?: string
  emptyMessage?: string
  onCheckout?: (payload: ShoppingCartCheckoutPayload) => void
}

const DEFAULT_ITEMS: ShoppingCartItem[] = [
  { id: 'silla-nordica', title: 'Silla Nórdica', price: 320000, quantity: 1 },
  { id: 'mesa-auxiliar', title: 'Mesa Auxiliar', price: 190000, quantity: 2 },
  { id: 'lampara-piso', title: 'Lámpara de Piso', price: 210000, quantity: 1 },
]

function formatPrice(value: number): string {
  return `$${value.toLocaleString('es-CO')}`
}

const sectionStyle: CSSProperties = {
  padding: '48px 24px',
  background: 'var(--md-surface-base)',
}
const headingStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '28px',
  lineHeight: 1.15,
  color: 'var(--md-text-primary)',
  textAlign: 'center',
  margin: '0 0 24px',
}
const wrapperStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  maxWidth: '720px',
  margin: '0 auto',
}
const listStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '16px' }
const lineItemStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '80px 1fr auto',
  gap: '16px',
  alignItems: 'center',
}
const imageStyle: CSSProperties = {
  width: '80px',
  height: '80px',
  background: 'var(--md-surface-muted)',
  border: '1px solid var(--md-border-default)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}
const itemInfoStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '4px' }
const itemTitleStyle: CSSProperties = { fontSize: 'var(--md-text-body-md)', color: 'var(--md-text-primary)', margin: 0 }
const itemPriceStyle: CSSProperties = { fontSize: 'var(--md-text-body-sm)', color: 'var(--md-text-secondary)', margin: 0 }
const itemControlsRowStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }
const lineTotalStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '18px',
  color: 'var(--md-text-primary)',
  textAlign: 'right',
  whiteSpace: 'nowrap',
}
const emptyStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-md)',
  color: 'var(--md-text-secondary)',
  textAlign: 'center',
  padding: '24px 0',
}
const summaryRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: 'var(--md-text-body-md)',
  color: 'var(--md-text-primary)',
}
const summaryLabelStyle: CSSProperties = { color: 'var(--md-text-secondary)' }
const summaryValueStyle: CSSProperties = { fontFamily: 'var(--md-font-serif)', fontSize: '20px' }

/**
 * Moderno block — ShoppingCart (React). Copy-paste; edit freely.
 * Cart drawer/page: a list of line items (thumbnail, title, unit price, a
 * quantity stepper, and a remove action) followed by a subtotal summary and
 * a checkout CTA. Composes the Card + Button + NumberInput primitives +
 * Moderno tokens. Quantity is simple local state per line item, updated
 * through the NumberInput primitive — no bespoke stepper, no new primitives.
 */
export function ShoppingCart({
  heading = 'Carrito de compras',
  items = DEFAULT_ITEMS,
  subtotalLabel = 'Subtotal',
  checkoutLabel = 'Finalizar compra',
  removeLabel = 'Quitar',
  emptyMessage = 'Tu carrito está vacío.',
  onCheckout,
}: ShoppingCartProps) {
  const [cartItems, setCartItems] = useState<ShoppingCartItem[]>(() =>
    items.map((item) => ({ ...item, quantity: item.quantity ?? 1 })),
  )

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0),
    [cartItems],
  )

  function updateQuantity(id: ShoppingCartItem['id'], quantity: number) {
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  function removeItem(id: ShoppingCartItem['id']) {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <section style={sectionStyle} aria-label={heading}>
      {heading ? <h2 style={headingStyle}>{heading}</h2> : null}
      <div style={wrapperStyle}>
        {cartItems.length === 0 ? (
          <p style={emptyStyle}>{emptyMessage}</p>
        ) : (
          <div style={listStyle}>
            {cartItems.map((item) => (
              <Card key={item.id}>
                <div style={lineItemStyle}>
                  <div style={{ ...imageStyle, backgroundImage: item.image ? `url(${item.image})` : undefined }} />
                  <div style={itemInfoStyle}>
                    <p style={itemTitleStyle}>{item.title}</p>
                    <p style={itemPriceStyle}>{formatPrice(item.price)}</p>
                    <div style={itemControlsRowStyle}>
                      <NumberInput
                        label="Cantidad"
                        defaultValue={item.quantity}
                        min={1}
                        max={item.maxQuantity ?? 10}
                        onValueChange={(_, valueAsNumber) => updateQuantity(item.id, valueAsNumber)}
                      />
                      <Button variant="secondary" size="sm" onClick={() => removeItem(item.id)}>
                        {removeLabel}
                      </Button>
                    </div>
                  </div>
                  <span style={lineTotalStyle}>{formatPrice(item.price * (item.quantity ?? 1))}</span>
                </div>
              </Card>
            ))}
          </div>
        )}
        <Card
          footer={
            <Button
              variant="primary"
              size="lg"
              disabled={cartItems.length === 0}
              style={{ width: '100%' }}
              onClick={() => onCheckout?.({ items: cartItems, subtotal })}
            >
              {checkoutLabel}
            </Button>
          }
        >
          <div style={summaryRowStyle}>
            <span style={summaryLabelStyle}>{subtotalLabel}</span>
            <span style={summaryValueStyle}>{formatPrice(subtotal)}</span>
          </div>
        </Card>
      </div>
    </section>
  )
}
