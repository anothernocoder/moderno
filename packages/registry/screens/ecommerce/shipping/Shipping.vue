<script setup lang="ts">
// Moderno screen — Shipping (Vue). Copy-paste; edit freely.
// Shipping step of the Checkout flow (ADR-0005): composes the ecommerce
// CheckoutForms block, which bundles the shipping-address and payment sections
// into one form (that's how the block itself ships — it isn't split by
// section). This screen is the one place in the journey where the user types
// in both; the screen's own header/back-link chrome wraps the block without
// touching its internal markup. `next` forwards CheckoutForms' `checkout`
// emit — the Payment screen re-surfaces the same block, pre-filled, to let the
// user review or adjust the card details before moving on.
import CheckoutForms from '../../../blocks/ecommerce/checkout-forms/CheckoutForms.vue'
import type { CheckoutFormsValues } from '../../../blocks/ecommerce/checkout-forms/CheckoutForms.vue'

withDefaults(
  defineProps<{
    values?: Partial<CheckoutFormsValues>
    title?: string
    description?: string
    submitLabel?: string
    backLabel?: string
  }>(),
  {
    title: 'Dirección de envío',
    description: 'Cuéntanos a dónde enviamos tu pedido y cómo prefieres pagar.',
    submitLabel: 'Continuar a pago',
    backLabel: 'Volver al carrito',
  },
)
const emit = defineEmits<{ next: [values: CheckoutFormsValues]; back: [] }>()
</script>

<template>
  <div class="md-shipping">
    <div class="md-shipping__header">
      <div>
        <h1 class="md-shipping__title">{{ title }}</h1>
        <p class="md-shipping__description">{{ description }}</p>
      </div>
      <button type="button" class="md-shipping__link" @click="emit('back')">{{ backLabel }}</button>
    </div>
    <div class="md-shipping__form">
      <CheckoutForms
        heading=""
        :default-values="values"
        :submit-label="submitLabel"
        @checkout="emit('next', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.md-shipping {
  min-height: 100%;
  background: var(--md-surface-base);
  padding: 24px;
}
.md-shipping__header {
  max-width: 640px;
  margin: 0 auto 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 12px;
}
.md-shipping__title {
  font-family: var(--md-font-serif);
  font-size: var(--md-text-headline-lg);
  color: var(--md-text-primary);
  margin: 0 0 4px;
}
.md-shipping__description {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
  margin: 0;
}
.md-shipping__link {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  font-size: var(--md-text-body-sm);
  color: var(--md-text-primary);
  text-decoration: underline;
  cursor: pointer;
}
.md-shipping__form {
  max-width: 640px;
  margin: 0 auto;
}
</style>
