import { createMemo, For, Show, type JSX } from 'solid-js'
import { Divider } from '@moderno/solid'

export interface OrderSummariesItem {
  id: string | number
  title: string
  price: number
  quantity?: number
}

export interface OrderSummariesProps {
  heading?: string
  items?: OrderSummariesItem[]
  emptyMessage?: string
  subtotalLabel?: string
  shippingLabel?: string
  shipping?: number
  freeShippingLabel?: string
  taxLabel?: string
  taxRate?: number
  totalLabel?: string
}

const DEFAULT_ITEMS: OrderSummariesItem[] = [
  { id: 'silla-nordica', title: 'Silla Nórdica', price: 320000, quantity: 1 },
  { id: 'mesa-auxiliar', title: 'Mesa Auxiliar', price: 190000, quantity: 2 },
  { id: 'lampara-piso', title: 'Lámpara de Piso', price: 210000, quantity: 1 },
]

function formatPrice(value: number): string {
  return `$${Math.round(value).toLocaleString('es-CO')}`
}

function lineTotal(item: OrderSummariesItem): number {
  return item.price * (item.quantity ?? 1)
}

const wrapperStyle: JSX.CSSProperties = {
  background: 'var(--md-surface-base)',
  border: '1px solid var(--md-border-default)',
  'max-width': '420px',
}
const sectionStyle: JSX.CSSProperties = { padding: '24px' }
const headingStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-headline-md)',
  'font-weight': 600,
  color: 'var(--md-text-primary)',
  margin: 0,
}
const listStyle: JSX.CSSProperties = { display: 'flex', 'flex-direction': 'column', gap: '16px' }
const itemRowStyle: JSX.CSSProperties = { display: 'flex', 'justify-content': 'space-between', gap: '16px' }
const itemInfoStyle: JSX.CSSProperties = { display: 'flex', 'flex-direction': 'column', gap: '2px' }
const itemTitleStyle: JSX.CSSProperties = { 'font-size': 'var(--md-text-body-md)', color: 'var(--md-text-primary)', margin: 0 }
const itemQtyStyle: JSX.CSSProperties = { 'font-size': 'var(--md-text-body-sm)', color: 'var(--md-text-secondary)', margin: 0 }
const itemTotalStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-md)',
  color: 'var(--md-text-primary)',
  'white-space': 'nowrap',
}
const emptyStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-md)',
  color: 'var(--md-text-secondary)',
  'text-align': 'center',
  padding: '8px 0',
}
const summaryRowStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'space-between',
  'font-size': 'var(--md-text-body-md)',
  color: 'var(--md-text-primary)',
}
const summaryLabelStyle: JSX.CSSProperties = { color: 'var(--md-text-secondary)' }
const totalRowStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'space-between',
}
const totalLabelStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-headline-md)',
  'font-weight': 600,
  color: 'var(--md-text-primary)',
}
const totalValueStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '22px',
  color: 'var(--md-text-primary)',
}

/**
 * Moderno block — OrderSummaries (Solid). Copy-paste; edit freely.
 * Read-only order summary panel: a list of line items (title, quantity, line
 * total), followed by subtotal, shipping, and tax rows, and a final total —
 * typically shown alongside a checkout form or an order confirmation. Purely
 * presentational, no interactive controls (unlike Shopping Cart, which has
 * quantity editing). Composes the Divider primitive + Moderno tokens — no
 * new primitives.
 */
export function OrderSummaries(props: OrderSummariesProps) {
  const heading = () => props.heading ?? 'Resumen del pedido'
  const items = () => props.items ?? DEFAULT_ITEMS
  const emptyMessage = () => props.emptyMessage ?? 'No hay productos en el pedido.'
  const subtotalLabel = () => props.subtotalLabel ?? 'Subtotal'
  const shippingLabel = () => props.shippingLabel ?? 'Envío'
  const shipping = () => props.shipping ?? 15000
  const freeShippingLabel = () => props.freeShippingLabel ?? 'Gratis'
  const taxLabel = () => props.taxLabel ?? 'Impuestos'
  const taxRate = () => props.taxRate ?? 0.19
  const totalLabel = () => props.totalLabel ?? 'Total'

  const subtotal = createMemo(() => items().reduce((sum, item) => sum + lineTotal(item), 0))
  const tax = createMemo(() => subtotal() * taxRate())
  const total = createMemo(() => subtotal() + shipping() + tax())

  return (
    <div style={wrapperStyle} aria-label={heading()}>
      <Show when={heading()}>
        <div style={{ ...sectionStyle, 'padding-bottom': 0 }}>
          <h2 style={headingStyle}>{heading()}</h2>
        </div>
      </Show>

      <section style={sectionStyle}>
        <Show when={items().length > 0} fallback={<p style={emptyStyle}>{emptyMessage()}</p>}>
          <div style={listStyle}>
            <For each={items()}>
              {(item) => (
                <div style={itemRowStyle}>
                  <div style={itemInfoStyle}>
                    <p style={itemTitleStyle}>{item.title}</p>
                    <Show when={item.quantity && item.quantity > 1}>
                      <p style={itemQtyStyle}>Cantidad: {item.quantity}</p>
                    </Show>
                  </div>
                  <span style={itemTotalStyle}>{formatPrice(lineTotal(item))}</span>
                </div>
              )}
            </For>
          </div>
        </Show>
      </section>

      <Divider />

      <section style={{ ...sectionStyle, display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        <div style={summaryRowStyle}>
          <span style={summaryLabelStyle}>{subtotalLabel()}</span>
          <span>{formatPrice(subtotal())}</span>
        </div>
        <div style={summaryRowStyle}>
          <span style={summaryLabelStyle}>{shippingLabel()}</span>
          <span>{shipping() === 0 ? freeShippingLabel() : formatPrice(shipping())}</span>
        </div>
        <div style={summaryRowStyle}>
          <span style={summaryLabelStyle}>{taxLabel()}</span>
          <span>{formatPrice(tax())}</span>
        </div>
      </section>

      <Divider />

      <section style={sectionStyle}>
        <div style={totalRowStyle}>
          <span style={totalLabelStyle}>{totalLabel()}</span>
          <span style={totalValueStyle}>{formatPrice(total())}</span>
        </div>
      </section>
    </div>
  )
}
