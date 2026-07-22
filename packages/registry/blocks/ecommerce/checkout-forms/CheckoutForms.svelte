<script lang="ts">
  // Moderno block — CheckoutForms (Svelte). Copy-paste; edit freely.
  // Checkout page layout: a shipping-address section and a payment section grouped into
  // a multi-section form, separated by a divider, with a footer submit action. Card
  // number/expiry/CVC are plain text inputs — no masking, no validation, no luhn-check.
  // Uses the Input + Select + Divider + Button primitives + Moderno tokens. Static
  // UI-only demo: no real payment processing, values only live in local controlled state.
  import { Button, Divider, Input, Select } from '@moderno/svelte'
  import type { SelectItem } from '@moderno/svelte'

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

  let {
    heading = 'Finalizar compra',
    shippingTitle = 'Dirección de envío',
    shippingDescription = 'A dónde enviamos tu pedido.',
    paymentTitle = 'Método de pago',
    paymentDescription = 'Datos de la tarjeta para procesar el cobro.',
    defaultValues,
    submitLabel = 'Confirmar pedido',
    onCheckout,
  }: {
    heading?: string
    shippingTitle?: string
    shippingDescription?: string
    paymentTitle?: string
    paymentDescription?: string
    defaultValues?: Partial<CheckoutFormsValues>
    submitLabel?: string
    onCheckout?: (values: CheckoutFormsValues) => void
  } = $props()

  const initial = { ...DEFAULT_VALUES, ...defaultValues }

  let fullName = $state(initial.fullName)
  let email = $state(initial.email)
  let address = $state(initial.address)
  let city = $state(initial.city)
  let postalCode = $state(initial.postalCode)
  let country = $state(initial.country)
  let cardName = $state(initial.cardName)
  let cardNumber = $state(initial.cardNumber)
  let cardExpiry = $state(initial.cardExpiry)
  let cardCvc = $state(initial.cardCvc)

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    onCheckout?.({
      fullName,
      email,
      address,
      city,
      postalCode,
      country,
      cardName,
      cardNumber,
      cardExpiry,
      cardCvc,
    })
  }
</script>

<div class="md-checkout-forms">
  <form onsubmit={handleSubmit}>
    {#if heading}
      <div class="md-checkout-forms__heading">
        <h2 class="md-checkout-forms__title">{heading}</h2>
      </div>
    {/if}

    <section class="md-checkout-forms__section">
      <div class="md-checkout-forms__header">
        <h3 class="md-checkout-forms__title">{shippingTitle}</h3>
        <p class="md-checkout-forms__description">{shippingDescription}</p>
      </div>
      <div class="md-checkout-forms__grid">
        <div class="md-checkout-forms__full">
          <Input label="Nombre completo" name="fullName" bind:value={fullName} required />
        </div>
        <div class="md-checkout-forms__full">
          <Input label="Correo electrónico" name="email" type="email" bind:value={email} required />
        </div>
        <div class="md-checkout-forms__full">
          <Input label="Dirección" name="address" bind:value={address} required />
        </div>
        <Input label="Ciudad" name="city" bind:value={city} required />
        <Input label="Código postal" name="postalCode" bind:value={postalCode} required />
        <Select.Root
          items={countryOptions}
          defaultValue={[country]}
          onValueChange={(v) => (country = v[0] ?? country)}
        >
          <Select.Label>País</Select.Label>
          <Select.Trigger placeholder="Elige un país" />
          <Select.Content>
            {#each countryOptions as item (item.value)}
              <Select.Item {item} />
            {/each}
          </Select.Content>
        </Select.Root>
      </div>
    </section>

    <Divider />

    <section class="md-checkout-forms__section">
      <div class="md-checkout-forms__header">
        <h3 class="md-checkout-forms__title">{paymentTitle}</h3>
        <p class="md-checkout-forms__description">{paymentDescription}</p>
      </div>
      <div class="md-checkout-forms__grid">
        <div class="md-checkout-forms__full">
          <Input label="Nombre en la tarjeta" name="cardName" bind:value={cardName} required />
        </div>
        <div class="md-checkout-forms__full">
          <Input
            label="Número de tarjeta"
            name="cardNumber"
            inputmode="numeric"
            placeholder="1234 5678 9012 3456"
            bind:value={cardNumber}
            required
          />
        </div>
        <Input label="Vencimiento" name="cardExpiry" placeholder="MM/AA" bind:value={cardExpiry} required />
        <Input
          label="CVC"
          name="cardCvc"
          inputmode="numeric"
          placeholder="123"
          bind:value={cardCvc}
          required
        />
      </div>
    </section>

    <div class="md-checkout-forms__footer">
      <Button type="submit" variant="primary">{submitLabel}</Button>
    </div>
  </form>
</div>

<style>
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
