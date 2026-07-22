<script lang="ts">
  // Moderno block — ShoppingCart (Svelte). Copy-paste; edit freely.
  // Cart drawer/page: a list of line items (thumbnail, title, unit price, a
  // quantity stepper, and a remove action) followed by a subtotal summary and
  // a checkout CTA. Composes the Card + Button + NumberInput primitives +
  // Moderno tokens. Quantity is simple local state per line item, updated
  // through the NumberInput primitive — no bespoke stepper, no new primitives.
  import { Button, Card, NumberInput } from '@moderno/svelte'

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

  const DEFAULT_ITEMS: ShoppingCartItem[] = [
    { id: 'silla-nordica', title: 'Silla Nórdica', price: 320000, quantity: 1 },
    { id: 'mesa-auxiliar', title: 'Mesa Auxiliar', price: 190000, quantity: 2 },
    { id: 'lampara-piso', title: 'Lámpara de Piso', price: 210000, quantity: 1 },
  ]

  function formatPrice(value: number): string {
    return `$${value.toLocaleString('es-CO')}`
  }

  let {
    heading = 'Carrito de compras',
    items = DEFAULT_ITEMS,
    subtotalLabel = 'Subtotal',
    checkoutLabel = 'Finalizar compra',
    removeLabel = 'Quitar',
    emptyMessage = 'Tu carrito está vacío.',
    onCheckout,
  }: {
    heading?: string
    items?: ShoppingCartItem[]
    subtotalLabel?: string
    checkoutLabel?: string
    removeLabel?: string
    emptyMessage?: string
    onCheckout?: (payload: ShoppingCartCheckoutPayload) => void
  } = $props()

  let cartItems = $state(items.map((item) => ({ ...item, quantity: item.quantity ?? 1 })))

  let subtotal = $derived(cartItems.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0))

  function updateQuantity(id: ShoppingCartItem['id'], valueAsNumber: number) {
    cartItems = cartItems.map((item) => (item.id === id ? { ...item, quantity: valueAsNumber } : item))
  }

  function removeItem(id: ShoppingCartItem['id']) {
    cartItems = cartItems.filter((item) => item.id !== id)
  }
</script>

<section class="md-shopping-cart" aria-label={heading}>
  {#if heading}
    <h2 class="md-shopping-cart__heading">{heading}</h2>
  {/if}
  <div class="md-shopping-cart__wrapper">
    {#if cartItems.length === 0}
      <p class="md-shopping-cart__empty">{emptyMessage}</p>
    {:else}
      <div class="md-shopping-cart__list">
        {#each cartItems as item (item.id)}
          <Card>
            <div class="md-shopping-cart__line-item">
              <div
                class="md-shopping-cart__image"
                style:background-image={item.image ? `url(${item.image})` : undefined}
              ></div>
              <div class="md-shopping-cart__item-info">
                <p class="md-shopping-cart__item-title">{item.title}</p>
                <p class="md-shopping-cart__item-price">{formatPrice(item.price)}</p>
                <div class="md-shopping-cart__item-controls">
                  <NumberInput
                    label="Cantidad"
                    defaultValue={item.quantity}
                    min={1}
                    max={item.maxQuantity ?? 10}
                    onValueChange={(_, valueAsNumber) => updateQuantity(item.id, valueAsNumber)}
                  />
                  <Button variant="secondary" size="sm" onclick={() => removeItem(item.id)}>
                    {removeLabel}
                  </Button>
                </div>
              </div>
              <span class="md-shopping-cart__line-total">{formatPrice(item.price * (item.quantity ?? 1))}</span>
            </div>
          </Card>
        {/each}
      </div>
    {/if}
    <Card>
      <div class="md-shopping-cart__summary-row">
        <span class="md-shopping-cart__summary-label">{subtotalLabel}</span>
        <span class="md-shopping-cart__summary-value">{formatPrice(subtotal)}</span>
      </div>
      {#snippet footer()}
        <Button
          variant="primary"
          size="lg"
          disabled={cartItems.length === 0}
          style="width: 100%"
          onclick={() => onCheckout?.({ items: cartItems, subtotal })}
        >
          {checkoutLabel}
        </Button>
      {/snippet}
    </Card>
  </div>
</section>

<style>
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
