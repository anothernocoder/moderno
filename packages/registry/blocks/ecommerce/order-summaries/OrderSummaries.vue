<script setup lang="ts">
// Moderno block — OrderSummaries (Vue). Copy-paste; edit freely.
// Read-only order summary panel: a list of line items (title, quantity, line
// total), followed by subtotal, shipping, and tax rows, and a final total —
// typically shown alongside a checkout form or an order confirmation. Purely
// presentational, no interactive controls (unlike Shopping Cart, which has
// quantity editing). Composes the Divider primitive + Moderno tokens — no
// new primitives.
import { computed } from 'vue'
import { Divider } from '@moderno/vue'

export interface OrderSummariesItem {
  id: string | number
  title: string
  price: number
  quantity?: number
}

const props = withDefaults(
  defineProps<{
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
  }>(),
  {
    heading: 'Resumen del pedido',
    items: () => [
      { id: 'silla-nordica', title: 'Silla Nórdica', price: 320000, quantity: 1 },
      { id: 'mesa-auxiliar', title: 'Mesa Auxiliar', price: 190000, quantity: 2 },
      { id: 'lampara-piso', title: 'Lámpara de Piso', price: 210000, quantity: 1 },
    ],
    emptyMessage: 'No hay productos en el pedido.',
    subtotalLabel: 'Subtotal',
    shippingLabel: 'Envío',
    shipping: 15000,
    freeShippingLabel: 'Gratis',
    taxLabel: 'Impuestos',
    taxRate: 0.19,
    totalLabel: 'Total',
  },
)

function formatPrice(value: number): string {
  return `$${Math.round(value).toLocaleString('es-CO')}`
}

function lineTotal(item: OrderSummariesItem): number {
  return item.price * (item.quantity ?? 1)
}

const subtotal = computed(() => props.items.reduce((sum, item) => sum + lineTotal(item), 0))
const tax = computed(() => subtotal.value * props.taxRate)
const total = computed(() => subtotal.value + props.shipping + tax.value)
</script>

<template>
  <div class="md-order-summaries" :aria-label="heading">
    <div v-if="heading" class="md-order-summaries__section md-order-summaries__section--heading">
      <h2 class="md-order-summaries__heading">{{ heading }}</h2>
    </div>

    <section class="md-order-summaries__section">
      <p v-if="items.length === 0" class="md-order-summaries__empty">{{ emptyMessage }}</p>
      <div v-else class="md-order-summaries__list">
        <div v-for="item in items" :key="item.id" class="md-order-summaries__item-row">
          <div class="md-order-summaries__item-info">
            <p class="md-order-summaries__item-title">{{ item.title }}</p>
            <p v-if="item.quantity && item.quantity > 1" class="md-order-summaries__item-qty">
              Cantidad: {{ item.quantity }}
            </p>
          </div>
          <span class="md-order-summaries__item-total">{{ formatPrice(lineTotal(item)) }}</span>
        </div>
      </div>
    </section>

    <Divider />

    <section class="md-order-summaries__section md-order-summaries__section--summary">
      <div class="md-order-summaries__summary-row">
        <span class="md-order-summaries__summary-label">{{ subtotalLabel }}</span>
        <span>{{ formatPrice(subtotal) }}</span>
      </div>
      <div class="md-order-summaries__summary-row">
        <span class="md-order-summaries__summary-label">{{ shippingLabel }}</span>
        <span>{{ shipping === 0 ? freeShippingLabel : formatPrice(shipping) }}</span>
      </div>
      <div class="md-order-summaries__summary-row">
        <span class="md-order-summaries__summary-label">{{ taxLabel }}</span>
        <span>{{ formatPrice(tax) }}</span>
      </div>
    </section>

    <Divider />

    <section class="md-order-summaries__section">
      <div class="md-order-summaries__total-row">
        <span class="md-order-summaries__total-label">{{ totalLabel }}</span>
        <span class="md-order-summaries__total-value">{{ formatPrice(total) }}</span>
      </div>
    </section>
  </div>
</template>

<style scoped>
.md-order-summaries {
  background: var(--md-surface-base);
  border: 1px solid var(--md-border-default);
  max-width: 420px;
}
.md-order-summaries__section {
  padding: 24px;
}
.md-order-summaries__section--heading {
  padding-bottom: 0;
}
.md-order-summaries__section--summary {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.md-order-summaries__heading {
  font-size: var(--md-text-headline-md);
  font-weight: 600;
  color: var(--md-text-primary);
  margin: 0;
}
.md-order-summaries__list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.md-order-summaries__item-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}
.md-order-summaries__item-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.md-order-summaries__item-title {
  font-size: var(--md-text-body-md);
  color: var(--md-text-primary);
  margin: 0;
}
.md-order-summaries__item-qty {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
  margin: 0;
}
.md-order-summaries__item-total {
  font-size: var(--md-text-body-md);
  color: var(--md-text-primary);
  white-space: nowrap;
}
.md-order-summaries__empty {
  font-size: var(--md-text-body-md);
  color: var(--md-text-secondary);
  text-align: center;
  padding: 8px 0;
}
.md-order-summaries__summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--md-text-body-md);
  color: var(--md-text-primary);
}
.md-order-summaries__summary-label {
  color: var(--md-text-secondary);
}
.md-order-summaries__total-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.md-order-summaries__total-label {
  font-size: var(--md-text-headline-md);
  font-weight: 600;
  color: var(--md-text-primary);
}
.md-order-summaries__total-value {
  font-family: var(--md-font-serif);
  font-size: 22px;
  color: var(--md-text-primary);
}
</style>
