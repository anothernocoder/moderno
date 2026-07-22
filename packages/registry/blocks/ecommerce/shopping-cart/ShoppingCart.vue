<script setup lang="ts">
// Moderno block — ShoppingCart (Vue). Copy-paste; edit freely.
// Cart drawer/page: a list of line items (thumbnail, title, unit price, a
// quantity stepper, and a remove action) followed by a subtotal summary and
// a checkout CTA. Composes the Card + Button + NumberInput primitives +
// Moderno tokens. Quantity is simple local state per line item, updated
// through the NumberInput primitive — no bespoke stepper, no new primitives.
import { computed, ref } from 'vue'
import { Button, Card, NumberInput } from '@moderno/vue'

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

const props = withDefaults(
  defineProps<{
    heading?: string
    items?: ShoppingCartItem[]
    subtotalLabel?: string
    checkoutLabel?: string
    removeLabel?: string
    emptyMessage?: string
  }>(),
  {
    heading: 'Carrito de compras',
    items: () => [
      { id: 'silla-nordica', title: 'Silla Nórdica', price: 320000, quantity: 1 },
      { id: 'mesa-auxiliar', title: 'Mesa Auxiliar', price: 190000, quantity: 2 },
      { id: 'lampara-piso', title: 'Lámpara de Piso', price: 210000, quantity: 1 },
    ],
    subtotalLabel: 'Subtotal',
    checkoutLabel: 'Finalizar compra',
    removeLabel: 'Quitar',
    emptyMessage: 'Tu carrito está vacío.',
  },
)

const emit = defineEmits<{ checkout: [payload: ShoppingCartCheckoutPayload] }>()

const cartItems = ref<ShoppingCartItem[]>(props.items.map((item) => ({ ...item, quantity: item.quantity ?? 1 })))

const subtotal = computed(() => cartItems.value.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0))

function formatPrice(value: number): string {
  return `$${value.toLocaleString('es-CO')}`
}

function lineTotal(item: ShoppingCartItem): number {
  return item.price * (item.quantity ?? 1)
}

function imageStyle(item: ShoppingCartItem) {
  return { backgroundImage: item.image ? `url(${item.image})` : undefined }
}

function updateQuantity(id: ShoppingCartItem['id'], _value: string, valueAsNumber: number) {
  const item = cartItems.value.find((entry) => entry.id === id)
  if (item) item.quantity = valueAsNumber
}

function removeItem(id: ShoppingCartItem['id']) {
  cartItems.value = cartItems.value.filter((item) => item.id !== id)
}
</script>

<template>
  <section class="md-shopping-cart" :aria-label="heading">
    <h2 v-if="heading" class="md-shopping-cart__heading">{{ heading }}</h2>
    <div class="md-shopping-cart__wrapper">
      <p v-if="cartItems.length === 0" class="md-shopping-cart__empty">{{ emptyMessage }}</p>
      <div v-else class="md-shopping-cart__list">
        <Card v-for="item in cartItems" :key="item.id">
          <div class="md-shopping-cart__line-item">
            <div class="md-shopping-cart__image" :style="imageStyle(item)" />
            <div class="md-shopping-cart__item-info">
              <p class="md-shopping-cart__item-title">{{ item.title }}</p>
              <p class="md-shopping-cart__item-price">{{ formatPrice(item.price) }}</p>
              <div class="md-shopping-cart__item-controls">
                <NumberInput
                  label="Cantidad"
                  :default-value="item.quantity"
                  :min="1"
                  :max="item.maxQuantity ?? 10"
                  @update:model-value="(value, valueAsNumber) => updateQuantity(item.id, value, valueAsNumber)"
                />
                <Button variant="secondary" size="sm" @click="removeItem(item.id)">
                  {{ removeLabel }}
                </Button>
              </div>
            </div>
            <span class="md-shopping-cart__line-total">{{ formatPrice(lineTotal(item)) }}</span>
          </div>
        </Card>
      </div>
      <Card>
        <div class="md-shopping-cart__summary-row">
          <span class="md-shopping-cart__summary-label">{{ subtotalLabel }}</span>
          <span class="md-shopping-cart__summary-value">{{ formatPrice(subtotal) }}</span>
        </div>
        <template #footer>
          <Button
            variant="primary"
            size="lg"
            :disabled="cartItems.length === 0"
            style="width: 100%"
            @click="emit('checkout', { items: cartItems, subtotal })"
          >
            {{ checkoutLabel }}
          </Button>
        </template>
      </Card>
    </div>
  </section>
</template>

<style scoped>
.md-shopping-cart {
  padding: 48px 24px;
  background: var(--md-surface-base);
}
.md-shopping-cart__heading {
  font-family: var(--md-font-serif);
  font-size: 28px;
  line-height: 1.15;
  color: var(--md-text-primary);
  text-align: center;
  margin: 0 0 24px;
}
.md-shopping-cart__wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 720px;
  margin: 0 auto;
}
.md-shopping-cart__list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.md-shopping-cart__line-item {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: 16px;
  align-items: center;
}
.md-shopping-cart__image {
  width: 80px;
  height: 80px;
  background-color: var(--md-surface-muted);
  border: 1px solid var(--md-border-default);
  background-size: cover;
  background-position: center;
}
.md-shopping-cart__item-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.md-shopping-cart__item-title {
  font-size: var(--md-text-body-md);
  color: var(--md-text-primary);
  margin: 0;
}
.md-shopping-cart__item-price {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
  margin: 0;
}
.md-shopping-cart__item-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
}
.md-shopping-cart__line-total {
  font-family: var(--md-font-serif);
  font-size: 18px;
  color: var(--md-text-primary);
  text-align: right;
  white-space: nowrap;
}
.md-shopping-cart__empty {
  font-size: var(--md-text-body-md);
  color: var(--md-text-secondary);
  text-align: center;
  padding: 24px 0;
}
.md-shopping-cart__summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--md-text-body-md);
  color: var(--md-text-primary);
}
.md-shopping-cart__summary-label {
  color: var(--md-text-secondary);
}
.md-shopping-cart__summary-value {
  font-family: var(--md-font-serif);
  font-size: 20px;
}
</style>
