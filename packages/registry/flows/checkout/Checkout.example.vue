<script setup lang="ts">
// Moderno flow example — Checkout (Vue). Copy-paste; edit freely.
// Thin assembly (ADR-0005): stitches the Cart, Shipping, Payment, Review and
// Confirmation screens using Vue's own reactive()/ref() for a local `step`
// plus the cart/order state carried between them, with no router dependency.
// This is the first flow whose screens themselves `composes` E-Commerce
// blocks (ShoppingCart, CheckoutForms, OrderSummaries) rather than only
// primitives — a runnable demo and a copy-paste starting point, not the
// product.
import { ref } from 'vue'
import Cart from '../../screens/ecommerce/cart/Cart.vue'
import Shipping from '../../screens/ecommerce/shipping/Shipping.vue'
import Payment from '../../screens/ecommerce/payment/Payment.vue'
import Review from '../../screens/ecommerce/review/Review.vue'
import Confirmation from '../../screens/ecommerce/confirmation/Confirmation.vue'
import type { ShoppingCartItem, ShoppingCartCheckoutPayload } from '../../blocks/ecommerce/shopping-cart/ShoppingCart.vue'
import type { OrderSummariesItem } from '../../blocks/ecommerce/order-summaries/OrderSummaries.vue'
import type { CheckoutFormsValues } from '../../blocks/ecommerce/checkout-forms/CheckoutForms.vue'

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

const props = withDefaults(
  defineProps<{
    /** Which screen to mount first — lets the docs demo jump straight to a given
     * screen via a plain string prop (the Astro-island boundary serializes to
     * JSON, so this stays a string rather than richer state). */
    initialStep?: Step
  }>(),
  { initialStep: 'cart' },
)

const step = ref<Step>(props.initialStep)
const cartPayload = ref<ShoppingCartCheckoutPayload>()
const checkoutValues = ref<CheckoutFormsValues>()
const orderNumber = ref(randomOrderNumber())
const submitting = ref(false)

function handleCartNext(payload: ShoppingCartCheckoutPayload) {
  cartPayload.value = payload
  step.value = 'shipping'
}

function handleShippingNext(values: CheckoutFormsValues) {
  checkoutValues.value = values
  step.value = 'payment'
}

function handlePaymentNext(values: CheckoutFormsValues) {
  checkoutValues.value = values
  step.value = 'review'
}

function handleReviewNext() {
  submitting.value = true
  // Replace with your real "place order" request.
  window.setTimeout(() => {
    submitting.value = false
    orderNumber.value = randomOrderNumber()
    step.value = 'confirmation'
  }, 600)
}

function handleContinueShopping() {
  cartPayload.value = undefined
  checkoutValues.value = undefined
  step.value = 'cart'
}
</script>

<template>
  <Shipping
    v-if="step === 'shipping'"
    :values="checkoutValues"
    @next="handleShippingNext"
    @back="() => (step = 'cart')"
  />
  <Payment
    v-else-if="step === 'payment'"
    :values="checkoutValues ?? EMPTY_CHECKOUT_VALUES"
    @next="handlePaymentNext"
    @back="() => (step = 'shipping')"
  />
  <Review
    v-else-if="step === 'review'"
    :items="toOrderSummariesItems(cartPayload?.items ?? [])"
    :shipping="checkoutValues ?? EMPTY_CHECKOUT_VALUES"
    :payment="checkoutValues ?? EMPTY_CHECKOUT_VALUES"
    :submitting="submitting"
    @next="handleReviewNext"
    @back="() => (step = 'payment')"
  />
  <Confirmation
    v-else-if="step === 'confirmation'"
    :order-number="orderNumber"
    :email="checkoutValues?.email"
    @continue-shopping="handleContinueShopping"
  />
  <Cart v-else :items="cartPayload?.items" @next="handleCartNext" />
</template>
