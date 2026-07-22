<script lang="ts">
  // Moderno block — OrderHistory (Svelte). Copy-paste; edit freely.
  // A customer's past orders: each row shows the order number, date, a status
  // pill, and total, linking into order details via a plain `href` per order
  // — no routing logic, just an anchor. Composes the Card + Badge primitives +
  // Moderno tokens — no new primitives, no bespoke interaction logic.
  import { Badge, Card } from '@moderno/svelte'

  export type OrderHistoryStatus = 'delivered' | 'shipping' | 'processing' | 'cancelled'

  export interface OrderHistoryOrder {
    id: string | number
    orderNumber: string
    date: string
    status: OrderHistoryStatus
    total: number
    href: string
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

  let {
    heading = 'Historial de pedidos',
    orders = DEFAULT_ORDERS,
    emptyMessage = 'Todavía no tienes pedidos.',
    detailsLabel = 'Ver detalles',
  }: {
    heading?: string
    orders?: OrderHistoryOrder[]
    emptyMessage?: string
    detailsLabel?: string
  } = $props()
</script>

<section class="md-order-history" aria-label={heading}>
  {#if heading}
    <h2 class="md-order-history__heading">{heading}</h2>
  {/if}
  {#if orders.length === 0}
    <p class="md-order-history__empty">{emptyMessage}</p>
  {:else}
    <div class="md-order-history__list">
      {#each orders as order (order.id)}
        <Card>
          <div class="md-order-history__row-top">
            <div class="md-order-history__order-info">
              <p class="md-order-history__order-number">Pedido #{order.orderNumber}</p>
              <p class="md-order-history__order-date">{order.date}</p>
            </div>
            <Badge variant={STATUS_VARIANTS[order.status]}>{STATUS_LABELS[order.status]}</Badge>
          </div>
          <div class="md-order-history__row-bottom">
            <span class="md-order-history__total">{formatPrice(order.total)}</span>
            <a href={order.href} class="md-order-history__details-link">{detailsLabel}</a>
          </div>
        </Card>
      {/each}
    </div>
  {/if}
</section>

<style>
  .md-order-history {
    padding: 48px 24px;
    background: var(--md-surface-base);
  }
  .md-order-history__heading {
    font-family: var(--md-font-serif);
    font-size: 28px;
    line-height: 1.15;
    color: var(--md-text-primary);
    text-align: center;
    margin: 0 0 24px;
  }
  .md-order-history__list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 640px;
    margin: 0 auto;
  }
  .md-order-history__row-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }
  .md-order-history__order-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .md-order-history__order-number {
    font-size: var(--md-text-body-md);
    color: var(--md-text-primary);
    font-weight: 600;
    margin: 0;
  }
  .md-order-history__order-date {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
    margin: 0;
  }
  .md-order-history__row-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 4px;
  }
  .md-order-history__total {
    font-family: var(--md-font-serif);
    font-size: 18px;
    color: var(--md-text-primary);
  }
  .md-order-history__details-link {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-primary);
    text-decoration: underline;
  }
  .md-order-history__empty {
    font-size: var(--md-text-body-md);
    color: var(--md-text-secondary);
    text-align: center;
    padding: 8px 0;
  }
</style>
