<script lang="ts">
  // Moderno screen — Review (Svelte). Copy-paste; edit freely.
  // Review step of the Checkout flow (ADR-0005): composes the ecommerce
  // OrderSummaries block for the read-only items/subtotal/shipping/tax/total
  // breakdown instead of re-implementing that markup. The shipping-address and
  // masked-payment recap alongside it is this screen's own simple text markup —
  // there's no dedicated "read-only address/card" block to compose, so it isn't
  // duplicating any block's internals. `onNext` places the order.
  import { Button, Divider } from '@moderno/svelte'
  import OrderSummaries from '../../../blocks/ecommerce/order-summaries/OrderSummaries.svelte'
  import type { OrderSummariesItem } from '../../../blocks/ecommerce/order-summaries/OrderSummaries.svelte'
  import type { CheckoutFormsValues } from '../../../blocks/ecommerce/checkout-forms/CheckoutForms.svelte'

  function maskCardNumber(cardNumber: string): string {
    const digits = cardNumber.replace(/\D/g, '')
    if (digits.length < 4) return '••••'
    return `•••• ${digits.slice(-4)}`
  }

  let {
    items,
    shipping,
    payment,
    onNext,
    onBack,
    title = 'Revisa tu pedido',
    description = 'Confirma que todo esté correcto antes de completar la compra.',
    submitLabel = 'Confirmar pedido',
    backLabel = 'Volver a pago',
    submitting,
  }: {
    items?: OrderSummariesItem[]
    shipping: Pick<CheckoutFormsValues, 'fullName' | 'address' | 'city' | 'postalCode' | 'country'>
    payment: Pick<CheckoutFormsValues, 'cardName' | 'cardNumber'>
    onNext: () => void
    onBack?: () => void
    title?: string
    description?: string
    submitLabel?: string
    backLabel?: string
    submitting?: boolean
  } = $props()
</script>

<div class="md-review">
  <div class="md-review__header">
    <div>
      <h1 class="md-review__title">{title}</h1>
      <p class="md-review__description">{description}</p>
    </div>
    {#if onBack}
      <button type="button" class="md-review__link" onclick={() => onBack?.()}>{backLabel}</button>
    {/if}
  </div>

  <div class="md-review__grid">
    <OrderSummaries {items} />

    <div class="md-review__recap-card">
      <div class="md-review__recap-section">
        <h2 class="md-review__recap-title">Envío</h2>
        <p class="md-review__recap-line">{shipping.fullName}</p>
        <p class="md-review__recap-line">{shipping.address}</p>
        <p class="md-review__recap-line">{shipping.city}, {shipping.postalCode}</p>
        <p class="md-review__recap-line">{shipping.country}</p>
      </div>
      <Divider />
      <div class="md-review__recap-section">
        <h2 class="md-review__recap-title">Pago</h2>
        <p class="md-review__recap-line">{payment.cardName}</p>
        <p class="md-review__recap-line">{maskCardNumber(payment.cardNumber)}</p>
      </div>
    </div>
  </div>

  <div class="md-review__footer">
    <Button variant="primary" size="lg" disabled={submitting} onclick={() => onNext()}>
      {submitting ? 'Procesando…' : submitLabel}
    </Button>
  </div>
</div>

<style>
  .md-review {
    min-height: 100%;
    background: var(--md-surface-base);
    padding: 24px;
  }
  .md-review__header {
    max-width: 720px;
    margin: 0 auto 24px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 8px 12px;
  }
  .md-review__title {
    font-family: var(--md-font-serif);
    font-size: var(--md-text-headline-lg);
    color: var(--md-text-primary);
    margin: 0 0 4px;
  }
  .md-review__description {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
    margin: 0;
  }
  .md-review__link {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    font-size: var(--md-text-body-sm);
    color: var(--md-text-primary);
    text-decoration: underline;
    cursor: pointer;
  }
  .md-review__grid {
    max-width: 720px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    align-items: start;
  }
  .md-review__recap-card {
    border: 1px solid var(--md-border-default);
    background: var(--md-surface-base);
  }
  .md-review__recap-section {
    padding: 20px 24px;
  }
  .md-review__recap-title {
    font-size: var(--md-text-headline-md);
    font-weight: 600;
    color: var(--md-text-primary);
    margin: 0 0 8px;
  }
  .md-review__recap-line {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
    margin: 0;
    line-height: var(--md-text-body-sm-lh);
  }
  .md-review__footer {
    max-width: 720px;
    margin: 24px auto 0;
    display: flex;
    justify-content: flex-end;
  }
</style>
