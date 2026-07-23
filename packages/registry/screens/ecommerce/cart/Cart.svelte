<script lang="ts">
  // Moderno screen — Cart (Svelte). Copy-paste; edit freely.
  // Cart step of the Checkout flow (ADR-0005): composes the ecommerce ShoppingCart
  // block instead of re-implementing its line-item/quantity/subtotal markup. This
  // screen owns no state of its own — quantity edits and removals live inside
  // ShoppingCart's own local state — it only forwards ShoppingCart's `onCheckout`
  // callback through `onNext`. Also addable standalone (`moderno add cart`) since
  // a cart view is reused outside the checkout journey too.
  import ShoppingCart from '../../../blocks/ecommerce/shopping-cart/ShoppingCart.svelte'
  import type { ShoppingCartItem, ShoppingCartCheckoutPayload } from '../../../blocks/ecommerce/shopping-cart/ShoppingCart.svelte'

  let {
    items,
    onNext,
    onBack,
    title = 'Tu carrito',
    description = 'Revisa tus productos antes de continuar.',
    checkoutLabel = 'Continuar a envío',
    backLabel = 'Seguir comprando',
  }: {
    items?: ShoppingCartItem[]
    onNext: (payload: ShoppingCartCheckoutPayload) => void
    onBack?: () => void
    title?: string
    description?: string
    checkoutLabel?: string
    backLabel?: string
  } = $props()
</script>

<div class="md-cart">
  <div class="md-cart__top-bar">
    <p class="md-cart__description">{description}</p>
    {#if onBack}
      <button type="button" class="md-cart__link" onclick={() => onBack?.()}>{backLabel}</button>
    {/if}
  </div>
  <ShoppingCart heading={title} {items} checkoutLabel={checkoutLabel} onCheckout={onNext} />
</div>

<style>
  .md-cart {
    min-height: 100%;
    background: var(--md-surface-base);
  }
  .md-cart__top-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 8px 12px;
    max-width: 720px;
    margin: 0 auto;
    padding: 24px 24px 0;
  }
  .md-cart__description {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
    margin: 0;
  }
  .md-cart__link {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    font-size: var(--md-text-body-sm);
    color: var(--md-text-primary);
    text-decoration: underline;
    cursor: pointer;
  }
</style>
