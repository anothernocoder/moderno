import { useMemo, type CSSProperties } from 'react'
import { Divider } from '@moderno/react'

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

const wrapperStyle: CSSProperties = {
  background: 'var(--md-surface-base)',
  border: '1px solid var(--md-border-default)',
  maxWidth: '420px',
}
const sectionStyle: CSSProperties = { padding: '24px' }
const headingStyle: CSSProperties = {
  fontSize: 'var(--md-text-headline-md)',
  fontWeight: 600,
  color: 'var(--md-text-primary)',
  margin: 0,
}
const listStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '16px' }
const itemRowStyle: CSSProperties = { display: 'flex', justifyContent: 'space-between', gap: '16px' }
const itemInfoStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '2px' }
const itemTitleStyle: CSSProperties = { fontSize: 'var(--md-text-body-md)', color: 'var(--md-text-primary)', margin: 0 }
const itemQtyStyle: CSSProperties = { fontSize: 'var(--md-text-body-sm)', color: 'var(--md-text-secondary)', margin: 0 }
const itemTotalStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-md)',
  color: 'var(--md-text-primary)',
  whiteSpace: 'nowrap',
}
const emptyStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-md)',
  color: 'var(--md-text-secondary)',
  textAlign: 'center',
  padding: '8px 0',
}
const summaryRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: 'var(--md-text-body-md)',
  color: 'var(--md-text-primary)',
}
const summaryLabelStyle: CSSProperties = { color: 'var(--md-text-secondary)' }
const totalRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}
const totalLabelStyle: CSSProperties = {
  fontSize: 'var(--md-text-headline-md)',
  fontWeight: 600,
  color: 'var(--md-text-primary)',
}
const totalValueStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '22px',
  color: 'var(--md-text-primary)',
}

/**
 * Moderno block — OrderSummaries (React). Copy-paste; edit freely.
 * Read-only order summary panel: a list of line items (title, quantity, line
 * total), followed by subtotal, shipping, and tax rows, and a final total —
 * typically shown alongside a checkout form or an order confirmation. Purely
 * presentational, no interactive controls (unlike Shopping Cart, which has
 * quantity editing). Composes the Divider primitive + Moderno tokens — no
 * new primitives.
 */
export function OrderSummaries({
  heading = 'Resumen del pedido',
  items = DEFAULT_ITEMS,
  emptyMessage = 'No hay productos en el pedido.',
  subtotalLabel = 'Subtotal',
  shippingLabel = 'Envío',
  shipping = 15000,
  freeShippingLabel = 'Gratis',
  taxLabel = 'Impuestos',
  taxRate = 0.19,
  totalLabel = 'Total',
}: OrderSummariesProps) {
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0), [items])
  const tax = useMemo(() => subtotal * taxRate, [subtotal, taxRate])
  const total = subtotal + shipping + tax

  return (
    <div style={wrapperStyle} aria-label={heading}>
      {heading ? (
        <div style={{ ...sectionStyle, paddingBottom: 0 }}>
          <h2 style={headingStyle}>{heading}</h2>
        </div>
      ) : null}

      <section style={sectionStyle}>
        {items.length === 0 ? (
          <p style={emptyStyle}>{emptyMessage}</p>
        ) : (
          <div style={listStyle}>
            {items.map((item) => (
              <div key={item.id} style={itemRowStyle}>
                <div style={itemInfoStyle}>
                  <p style={itemTitleStyle}>{item.title}</p>
                  {item.quantity && item.quantity > 1 ? (
                    <p style={itemQtyStyle}>Cantidad: {item.quantity}</p>
                  ) : null}
                </div>
                <span style={itemTotalStyle}>{formatPrice(item.price * (item.quantity ?? 1))}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      <Divider />

      <section style={{ ...sectionStyle, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={summaryRowStyle}>
          <span style={summaryLabelStyle}>{subtotalLabel}</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div style={summaryRowStyle}>
          <span style={summaryLabelStyle}>{shippingLabel}</span>
          <span>{shipping === 0 ? freeShippingLabel : formatPrice(shipping)}</span>
        </div>
        <div style={summaryRowStyle}>
          <span style={summaryLabelStyle}>{taxLabel}</span>
          <span>{formatPrice(tax)}</span>
        </div>
      </section>

      <Divider />

      <section style={sectionStyle}>
        <div style={totalRowStyle}>
          <span style={totalLabelStyle}>{totalLabel}</span>
          <span style={totalValueStyle}>{formatPrice(total)}</span>
        </div>
      </section>
    </div>
  )
}
