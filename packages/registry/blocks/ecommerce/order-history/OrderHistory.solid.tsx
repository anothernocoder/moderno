import { For, Show, type JSX } from 'solid-js'
import { Badge, Card } from '@moderno/solid'

export type OrderHistoryStatus = 'delivered' | 'shipping' | 'processing' | 'cancelled'

export interface OrderHistoryOrder {
  id: string | number
  orderNumber: string
  date: string
  status: OrderHistoryStatus
  total: number
  href: string
}

export interface OrderHistoryProps {
  heading?: string
  orders?: OrderHistoryOrder[]
  emptyMessage?: string
  detailsLabel?: string
}

const DEFAULT_ORDERS: OrderHistoryOrder[] = [
  { id: 'ord-8823', orderNumber: '8823', date: '15 de julio, 2026', status: 'delivered', total: 458000, href: '/orders/8823' },
  { id: 'ord-8794', orderNumber: '8794', date: '2 de julio, 2026', status: 'shipping', total: 210000, href: '/orders/8794' },
  { id: 'ord-8755', orderNumber: '8755', date: '20 de junio, 2026', status: 'processing', total: 128000, href: '/orders/8755' },
  { id: 'ord-8710', orderNumber: '8710', date: '5 de junio, 2026', status: 'cancelled', total: 320000, href: '/orders/8710' },
]

const STATUS_LABELS: Record<OrderHistoryStatus, string> = {
  delivered: 'Entregado',
  shipping: 'En camino',
  processing: 'Procesando',
  cancelled: 'Cancelado',
}

const STATUS_VARIANTS: Record<OrderHistoryStatus, 'success' | 'info' | 'warning' | 'error'> = {
  delivered: 'success',
  shipping: 'info',
  processing: 'warning',
  cancelled: 'error',
}

function formatPrice(value: number): string {
  return `$${Math.round(value).toLocaleString('es-CO')}`
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
const listStyle: JSX.CSSProperties = {
  display: 'flex',
  'flex-direction': 'column',
  gap: '16px',
  'max-width': '640px',
  margin: '0 auto',
}
const rowTopStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'flex-start',
  'justify-content': 'space-between',
  gap: '16px',
}
const orderInfoStyle: JSX.CSSProperties = { display: 'flex', 'flex-direction': 'column', gap: '2px' }
const orderNumberStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-md)',
  color: 'var(--md-text-primary)',
  'font-weight': 600,
  margin: 0,
}
const orderDateStyle: JSX.CSSProperties = { 'font-size': 'var(--md-text-body-sm)', color: 'var(--md-text-secondary)', margin: 0 }
const rowBottomStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'space-between',
  'margin-top': '4px',
}
const totalStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '18px',
  color: 'var(--md-text-primary)',
}
const detailsLinkStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-primary)',
  'text-decoration': 'underline',
}
const emptyStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-md)',
  color: 'var(--md-text-secondary)',
  'text-align': 'center',
  padding: '8px 0',
}

/**
 * Moderno block — OrderHistory (Solid). Copy-paste; edit freely.
 * A customer's past orders: each row shows the order number, date, a status
 * pill, and total, linking into order details via a plain `href` per order
 * — no routing logic, just an anchor. Composes the Card + Badge primitives +
 * Moderno tokens — no new primitives, no bespoke interaction logic.
 */
export function OrderHistory(props: OrderHistoryProps) {
  const heading = () => props.heading ?? 'Historial de pedidos'
  const orders = () => props.orders ?? DEFAULT_ORDERS
  const emptyMessage = () => props.emptyMessage ?? 'Todavía no tienes pedidos.'
  const detailsLabel = () => props.detailsLabel ?? 'Ver detalles'

  return (
    <section style={sectionStyle} aria-label={heading()}>
      <Show when={heading()}>
        <h2 style={headingStyle}>{heading()}</h2>
      </Show>
      <Show when={orders().length > 0} fallback={<p style={emptyStyle}>{emptyMessage()}</p>}>
        <div style={listStyle}>
          <For each={orders()}>
            {(order) => (
              <Card>
                <div style={rowTopStyle}>
                  <div style={orderInfoStyle}>
                    <p style={orderNumberStyle}>Pedido #{order.orderNumber}</p>
                    <p style={orderDateStyle}>{order.date}</p>
                  </div>
                  <Badge variant={STATUS_VARIANTS[order.status]}>{STATUS_LABELS[order.status]}</Badge>
                </div>
                <div style={rowBottomStyle}>
                  <span style={totalStyle}>{formatPrice(order.total)}</span>
                  <a href={order.href} style={detailsLinkStyle}>
                    {detailsLabel()}
                  </a>
                </div>
              </Card>
            )}
          </For>
        </div>
      </Show>
    </section>
  )
}
