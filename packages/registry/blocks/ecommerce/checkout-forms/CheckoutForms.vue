<script setup lang="ts">
// Moderno block — CheckoutForms (Vue). Copy-paste; edit freely.
// Checkout page layout: a shipping-address section and a payment section grouped into
// a multi-section form, separated by a divider, with a footer submit action. Card
// number/expiry/CVC are plain text inputs — no masking, no validation, no luhn-check.
// Uses the Input + Select + Divider + Button primitives + Moderno tokens. Static
// UI-only demo: no real payment processing, values only live in local controlled state.
import { reactive } from 'vue'
import { Button, Divider, Input, Select } from '@moderno/vue'
import type { SelectItem } from '@moderno/vue'

export interface CheckoutFormsValues {
  fullName: string
  email: string
  address: string
  city: string
  postalCode: string
  country: string
  cardName: string
  cardNumber: string
  cardExpiry: string
  cardCvc: string
}

const props = withDefaults(
  defineProps<{
    heading?: string
    shippingTitle?: string
    shippingDescription?: string
    paymentTitle?: string
    paymentDescription?: string
    defaultValues?: Partial<CheckoutFormsValues>
    submitLabel?: string
  }>(),
  {
    heading: 'Finalizar compra',
    shippingTitle: 'Dirección de envío',
    shippingDescription: 'A dónde enviamos tu pedido.',
    paymentTitle: 'Método de pago',
    paymentDescription: 'Datos de la tarjeta para procesar el cobro.',
    submitLabel: 'Confirmar pedido',
  },
)
const emit = defineEmits<{ checkout: [values: CheckoutFormsValues] }>()

const DEFAULT_VALUES: CheckoutFormsValues = {
  fullName: 'Camila Restrepo',
  email: 'camila@acme.com',
  address: 'Calle 10 # 5-30',
  city: 'Bogotá',
  postalCode: '110111',
  country: 'colombia',
  cardName: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
}

const countryOptions: SelectItem[] = [
  { label: 'Colombia', value: 'colombia' },
  { label: 'México', value: 'mexico' },
  { label: 'España', value: 'espana' },
]

const values = reactive<CheckoutFormsValues>({ ...DEFAULT_VALUES, ...props.defaultValues })

function handleCountryChange(value: string[]) {
  values.country = value[0] ?? values.country
}

function handleSubmit() {
  emit('checkout', { ...values })
}
</script>

<template>
  <div class="md-checkout-forms">
    <form @submit.prevent="handleSubmit">
      <div v-if="heading" class="md-checkout-forms__heading">
        <h2 class="md-checkout-forms__title">{{ heading }}</h2>
      </div>

      <section class="md-checkout-forms__section">
        <div class="md-checkout-forms__header">
          <h3 class="md-checkout-forms__title">{{ shippingTitle }}</h3>
          <p class="md-checkout-forms__description">{{ shippingDescription }}</p>
        </div>
        <div class="md-checkout-forms__grid">
          <div class="md-checkout-forms__full">
            <Input v-model="values.fullName" label="Nombre completo" name="fullName" required />
          </div>
          <div class="md-checkout-forms__full">
            <Input v-model="values.email" label="Correo electrónico" name="email" type="email" required />
          </div>
          <div class="md-checkout-forms__full">
            <Input v-model="values.address" label="Dirección" name="address" required />
          </div>
          <Input v-model="values.city" label="Ciudad" name="city" required />
          <Input v-model="values.postalCode" label="Código postal" name="postalCode" required />
          <Select.Root
            :items="countryOptions"
            :default-value="[values.country]"
            @update:model-value="handleCountryChange"
          >
            <Select.Label>País</Select.Label>
            <Select.Trigger placeholder="Elige un país" />
            <Select.Content>
              <Select.Item v-for="item in countryOptions" :key="item.value" :item="item" />
            </Select.Content>
          </Select.Root>
        </div>
      </section>

      <Divider />

      <section class="md-checkout-forms__section">
        <div class="md-checkout-forms__header">
          <h3 class="md-checkout-forms__title">{{ paymentTitle }}</h3>
          <p class="md-checkout-forms__description">{{ paymentDescription }}</p>
        </div>
        <div class="md-checkout-forms__grid">
          <div class="md-checkout-forms__full">
            <Input v-model="values.cardName" label="Nombre en la tarjeta" name="cardName" required />
          </div>
          <div class="md-checkout-forms__full">
            <Input
              v-model="values.cardNumber"
              label="Número de tarjeta"
              name="cardNumber"
              inputmode="numeric"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
          <Input v-model="values.cardExpiry" label="Vencimiento" name="cardExpiry" placeholder="MM/AA" required />
          <Input
            v-model="values.cardCvc"
            label="CVC"
            name="cardCvc"
            inputmode="numeric"
            placeholder="123"
            required
          />
        </div>
      </section>

      <div class="md-checkout-forms__footer">
        <Button type="submit" variant="primary" :label="submitLabel" />
      </div>
    </form>
  </div>
</template>

<style scoped>
.md-checkout-forms {
  background: var(--md-surface-base);
  border: 1px solid var(--md-border-default);
  max-width: 640px;
}
.md-checkout-forms__heading {
  padding: 24px 24px 0;
}
.md-checkout-forms__section {
  padding: 24px;
}
.md-checkout-forms__header {
  margin: 0 0 20px;
}
.md-checkout-forms__title {
  font-size: var(--md-text-headline-md);
  font-weight: 600;
  color: var(--md-text-primary);
  margin: 0 0 4px;
}
.md-checkout-forms__description {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
  margin: 0;
}
.md-checkout-forms__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}
.md-checkout-forms__full {
  grid-column: 1 / -1;
}
.md-checkout-forms__footer {
  display: flex;
  justify-content: flex-end;
  padding: 20px 24px;
}
</style>
