<script lang="ts">
  // Moderno screen — Payment (Svelte). Copy-paste; edit freely.
  // Payment step of the Checkout flow (ADR-0005): re-surfaces the same ecommerce
  // CheckoutForms block used by the Shipping screen, pre-filled with `values`
  // carried forward from that step — since the block bundles address + payment
  // into one form, this is the point where the user reviews everything once
  // more and can still tweak the card fields before moving to review. `onNext`
  // forwards CheckoutForms' `onCheckout` callback.
  import CheckoutForms from '../../../blocks/ecommerce/checkout-forms/CheckoutForms.svelte'
  import type { CheckoutFormsValues } from '../../../blocks/ecommerce/checkout-forms/CheckoutForms.svelte'

  let {
    values,
    onNext,
    onBack,
    title = 'Método de pago',
    description = 'Confirma o actualiza los datos de tu tarjeta.',
    submitLabel = 'Continuar a revisión',
    backLabel = 'Volver a envío',
  }: {
    values: Partial<CheckoutFormsValues>
    onNext: (values: CheckoutFormsValues) => void
    onBack?: () => void
    title?: string
    description?: string
    submitLabel?: string
    backLabel?: string
  } = $props()
</script>

<div class="md-payment">
  <div class="md-payment__header">
    <div>
      <h1 class="md-payment__title">{title}</h1>
      <p class="md-payment__description">{description}</p>
    </div>
    {#if onBack}
      <button type="button" class="md-payment__link" onclick={() => onBack?.()}>{backLabel}</button>
    {/if}
  </div>
  <div class="md-payment__form">
    <CheckoutForms heading="" defaultValues={values} submitLabel={submitLabel} onCheckout={onNext} />
  </div>
</div>

<style>
  .md-payment {
    min-height: 100%;
    background: var(--md-surface-base);
    padding: 24px;
  }
  .md-payment__header {
    max-width: 640px;
    margin: 0 auto 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 8px 12px;
  }
  .md-payment__title {
    font-family: var(--md-font-serif);
    font-size: var(--md-text-headline-lg);
    color: var(--md-text-primary);
    margin: 0 0 4px;
  }
  .md-payment__description {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
    margin: 0;
  }
  .md-payment__link {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    font-size: var(--md-text-body-sm);
    color: var(--md-text-primary);
    text-decoration: underline;
    cursor: pointer;
  }
  .md-payment__form {
    max-width: 640px;
    margin: 0 auto;
  }
</style>
