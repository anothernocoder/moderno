<script lang="ts">
  // Moderno flow example — Checkout (Svelte). Copy-paste; edit freely.
  // Thin assembly (ADR-0005): stitches the Cart, Shipping, Payment, Review and
  // Confirmation screens using Svelte's own $state runes for a local `step`
  // plus the cart/order state carried between them, with no router
  // dependency. This is the first flow whose screens themselves `composes`
  // E-Commerce blocks (ShoppingCart, CheckoutForms, OrderSummaries) rather
  // than only primitives — a runnable demo and a copy-paste starting point,
  // not the product.
  import Cart from '../../screens/ecommerce/cart/Cart.svelte'
  import Shipping from '../../screens/ecommerce/shipping/Shipping.svelte'
  import Payment from '../../screens/ecommerce/payment/Payment.svelte'
  import Review from '../../screens/ecommerce/review/Review.svelte'
  import Confirmation from '../../screens/ecommerce/confirmation/Confirmation.svelte'
  import type { ShoppingCartItem, ShoppingCartCheckoutPayload } from '../../blocks/ecommerce/shopping-cart/ShoppingCart.svelte'
  import type { OrderSummariesItem } from '../../blocks/ecommerce/order-summaries/OrderSummaries.svelte'
  import type { CheckoutFormsValues } from '../../blocks/ecommerce/checkout-forms/CheckoutForms.svelte'

  type Step = 'cart' | 'shipping' | 'payment' | 'review' | 'confirmation'

  const EMPTY_CHECKOUT_VALUES: CheckoutFormsValues = {
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  }

  function toOrderSummariesItems(items: ShoppingCartItem[]): OrderSummariesItem[] {
    return items.map(({ id, title, price, quantity }) => ({ id, title, price, quantity }))
  }

  function randomOrderNumber(): string {
    return `#MD-${Math.floor(10000 + Math.random() * 90000)}`
  }

  // `initialStep` lets the docs demo jump straight to a given screen via a
  // plain string prop (the Astro-island boundary serializes to JSON, so this
  // stays a string rather than richer state).
  let { initialStep = 'cart' }: { initialStep?: Step } = $props()

  let step: Step = $state(initialStep)
  let cartPayload: ShoppingCartCheckoutPayload | undefined = $state(undefined)
  let checkoutValues: CheckoutFormsValues | undefined = $state(undefined)
  let orderNumber = $state(randomOrderNumber())
  let submitting = $state(false)

  function handleCartNext(payload: ShoppingCartCheckoutPayload) {
    cartPayload = payload
    step = 'shipping'
  }

  function handleShippingNext(values: CheckoutFormsValues) {
    checkoutValues = values
    step = 'payment'
  }

  function handlePaymentNext(values: CheckoutFormsValues) {
    checkoutValues = values
    step = 'review'
  }

  function handleReviewNext() {
    submitting = true
    // Replace with your real "place order" request.
    window.setTimeout(() => {
      submitting = false
      orderNumber = randomOrderNumber()
      step = 'confirmation'
    }, 600)
  }

  function handleContinueShopping() {
    cartPayload = undefined
    checkoutValues = undefined
    step = 'cart'
  }
</script>

{#if step === 'shipping'}
  <Shipping values={checkoutValues} onNext={handleShippingNext} onBack={() => (step = 'cart')} />
{:else if step === 'payment'}
  <Payment
    values={checkoutValues ?? EMPTY_CHECKOUT_VALUES}
    onNext={handlePaymentNext}
    onBack={() => (step = 'shipping')}
  />
{:else if step === 'review'}
  <Review
    items={toOrderSummariesItems(cartPayload?.items ?? [])}
    shipping={checkoutValues ?? EMPTY_CHECKOUT_VALUES}
    payment={checkoutValues ?? EMPTY_CHECKOUT_VALUES}
    {submitting}
    onNext={handleReviewNext}
    onBack={() => (step = 'payment')}
  />
{:else if step === 'confirmation'}
  <Confirmation {orderNumber} email={checkoutValues?.email} onContinueShopping={handleContinueShopping} />
{:else}
  <Cart items={cartPayload?.items} onNext={handleCartNext} />
{/if}
