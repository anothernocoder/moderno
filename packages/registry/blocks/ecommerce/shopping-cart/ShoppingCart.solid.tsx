import { createMemo, createSignal, For, Show, type JSX } from 'solid-js'
import { Button, Card, NumberInput } from '@moderno/solid'

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

const sectionStyle: JSX.CSSProperties = {
  padding: '48px 24px',
  background: 'var(--md-surface-base)',
}
const headingStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '28px',
  'line-height': 1.15,
  color: 'var(--md-text-primary)',
  'text-align': 'center',
  margin: '0 0 24px',
}
const wrapperStyle: JSX.CSSProperties = {
  display: 'flex',
  'flex-direction': 'column',
  gap: '24px',
  'max-width': '720px',
  margin: '0 auto',
}
const listStyle: JSX.CSSProperties = { display: 'flex', 'flex-direction': 'column', gap: '16px' }
const lineItemStyle: JSX.CSSProperties = {
  display: 'grid',
  'grid-template-columns': '80px 1fr auto',
  gap: '16px',
  'align-items': 'center',
}
const itemInfoStyle: JSX.CSSProperties = { display: 'flex', 'flex-direction': 'column', gap: '4px' }
const itemTitleStyle: JSX.CSSProperties = { 'font-size': 'var(--md-text-body-md)', color: 'var(--md-text-primary)', margin: 0 }
const itemPriceStyle: JSX.CSSProperties = { 'font-size': 'var(--md-text-body-sm)', color: 'var(--md-text-secondary)', margin: 0 }
const itemControlsRowStyle: JSX.CSSProperties = { display: 'flex', 'align-items': 'center', gap: '12px', 'margin-top': '8px' }
const lineTotalStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '18px',
  color: 'var(--md-text-primary)',
  'text-align': 'right',
  'white-space': 'nowrap',
}
const emptyStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-md)',
  color: 'var(--md-text-secondary)',
  'text-align': 'center',
  padding: '24px 0',
}
const summaryRowStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'space-between',
  'font-size': 'var(--md-text-body-md)',
  color: 'var(--md-text-primary)',
}
const summaryLabelStyle: JSX.CSSProperties = { color: 'var(--md-text-secondary)' }
const summaryValueStyle: JSX.CSSProperties = { 'font-family': 'var(--md-font-serif)', 'font-size': '20px' }

function imageStyle(item: ShoppingCartItem): JSX.CSSProperties {
  return {
    width: '80px',
    height: '80px',
    background: 'var(--md-surface-muted)',
    border: '1px solid var(--md-border-default)',
    'background-image': item.image ? `url(${item.image})` : undefined,
    'background-size': 'cover',
    'background-position': 'center',
  }
}

/**
 * Moderno block — ShoppingCart (Solid). Copy-paste; edit freely.
 * Cart drawer/page: a list of line items (thumbnail, title, unit price, a
 * quantity stepper, and a remove action) followed by a subtotal summary and
 * a checkout CTA. Composes the Card + Button + NumberInput primitives +
 * Moderno tokens. Quantity is simple local state per line item, updated
 * through the NumberInput primitive — no bespoke stepper, no new primitives.
 */
export function ShoppingCart(props: ShoppingCartProps) {
  const heading = () => props.heading ?? 'Carrito de compras'
  const subtotalLabel = () => props.subtotalLabel ?? 'Subtotal'
  const checkoutLabel = () => props.checkoutLabel ?? 'Finalizar compra'
  const removeLabel = () => props.removeLabel ?? 'Quitar'
  const emptyMessage = () => props.emptyMessage ?? 'Tu carrito está vacío.'

  const [cartItems, setCartItems] = createSignal<ShoppingCartItem[]>(
    (props.items ?? DEFAULT_ITEMS).map((item) => ({ ...item, quantity: item.quantity ?? 1 })),
  )

  const subtotal = createMemo(() => cartItems().reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0))

  function updateQuantity(id: ShoppingCartItem['id'], valueAsNumber: number) {
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: valueAsNumber } : item)))
  }

  function removeItem(id: ShoppingCartItem['id']) {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <section style={sectionStyle} aria-label={heading()}>
      <Show when={heading()}>
        <h2 style={headingStyle}>{heading()}</h2>
      </Show>
      <div style={wrapperStyle}>
        <Show when={cartItems().length > 0} fallback={<p style={emptyStyle}>{emptyMessage()}</p>}>
          <div style={listStyle}>
            <For each={cartItems()}>
              {(item) => (
                <Card>
                  <div style={lineItemStyle}>
                    <div style={imageStyle(item)} />
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
                          {removeLabel()}
                        </Button>
                      </div>
                    </div>
                    <span style={lineTotalStyle}>{formatPrice(item.price * (item.quantity ?? 1))}</span>
                  </div>
                </Card>
              )}
            </For>
          </div>
        </Show>
        <Card
          footer={
            <Button
              variant="primary"
              size="lg"
              disabled={cartItems().length === 0}
              style={{ width: '100%' }}
              onClick={() => props.onCheckout?.({ items: cartItems(), subtotal: subtotal() })}
            >
              {checkoutLabel()}
            </Button>
          }
        >
          <div style={summaryRowStyle}>
            <span style={summaryLabelStyle}>{subtotalLabel()}</span>
            <span style={summaryValueStyle}>{formatPrice(subtotal())}</span>
          </div>
        </Card>
      </div>
    </section>
  )
}
