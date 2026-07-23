import { createSignal, Switch, Match } from 'solid-js'
import { Cart } from '../../screens/ecommerce/cart/Cart.solid'
import { Shipping } from '../../screens/ecommerce/shipping/Shipping.solid'
import { Payment } from '../../screens/ecommerce/payment/Payment.solid'
import { Review } from '../../screens/ecommerce/review/Review.solid'
import { Confirmation } from '../../screens/ecommerce/confirmation/Confirmation.solid'
import type { ShoppingCartItem, ShoppingCartCheckoutPayload } from '../../blocks/ecommerce/shopping-cart/ShoppingCart.solid'
import type { OrderSummariesItem } from '../../blocks/ecommerce/order-summaries/OrderSummaries.solid'
import type { CheckoutFormsValues } from '../../blocks/ecommerce/checkout-forms/CheckoutForms.solid'

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

export interface CheckoutExampleProps {
  /** Which screen to mount first — lets the docs demo jump straight to a given
   * screen via a plain string prop (the Astro-island boundary serializes to
   * JSON, so this stays a string rather than richer state). Defaults to `'cart'`. */
  initialStep?: Step
}

/**
 * Moderno flow example — Checkout (Solid). Copy-paste; edit freely.
 * Thin assembly (ADR-0005): stitches the Cart, Shipping, Payment, Review and
 * Confirmation screens using Solid's own createSignal for a local `step` plus
 * the cart/order state carried between them, with no router dependency. This
 * is the first flow whose screens themselves `composes` E-Commerce blocks
 * (ShoppingCart, CheckoutForms, OrderSummaries) rather than only primitives —
 * a runnable demo and a copy-paste starting point, not the product.
 */
export function CheckoutExample(props: CheckoutExampleProps = {}) {
  const [step, setStep] = createSignal<Step>(props.initialStep ?? 'cart')
  const [cartPayload, setCartPayload] = createSignal<ShoppingCartCheckoutPayload>()
  const [checkoutValues, setCheckoutValues] = createSignal<CheckoutFormsValues>()
  const [orderNumber, setOrderNumber] = createSignal(randomOrderNumber())
  const [submitting, setSubmitting] = createSignal(false)

  function handleCartNext(payload: ShoppingCartCheckoutPayload) {
    setCartPayload(payload)
    setStep('shipping')
  }

  function handleShippingNext(values: CheckoutFormsValues) {
    setCheckoutValues(values)
    setStep('payment')
  }

  function handlePaymentNext(values: CheckoutFormsValues) {
    setCheckoutValues(values)
    setStep('review')
  }

  function handleReviewNext() {
    setSubmitting(true)
    // Replace with your real "place order" request.
    window.setTimeout(() => {
      setSubmitting(false)
      setOrderNumber(randomOrderNumber())
      setStep('confirmation')
    }, 600)
  }

  function handleContinueShopping() {
    setCartPayload(undefined)
    setCheckoutValues(undefined)
    setStep('cart')
  }

  return (
    <Switch fallback={<Cart items={cartPayload()?.items} onNext={handleCartNext} />}>
      <Match when={step() === 'shipping'}>
        <Shipping values={checkoutValues()} onNext={handleShippingNext} onBack={() => setStep('cart')} />
      </Match>
      <Match when={step() === 'payment'}>
        <Payment
          values={checkoutValues() ?? EMPTY_CHECKOUT_VALUES}
          onNext={handlePaymentNext}
          onBack={() => setStep('shipping')}
        />
      </Match>
      <Match when={step() === 'review'}>
        <Review
          items={toOrderSummariesItems(cartPayload()?.items ?? [])}
          shipping={checkoutValues() ?? EMPTY_CHECKOUT_VALUES}
          payment={checkoutValues() ?? EMPTY_CHECKOUT_VALUES}
          submitting={submitting()}
          onNext={handleReviewNext}
          onBack={() => setStep('payment')}
        />
      </Match>
      <Match when={step() === 'confirmation'}>
        <Confirmation
          orderNumber={orderNumber()}
          email={checkoutValues()?.email}
          onContinueShopping={handleContinueShopping}
        />
      </Match>
      <Match when={step() === 'cart'}>
        <Cart items={cartPayload()?.items} onNext={handleCartNext} />
      </Match>
    </Switch>
  )
}
