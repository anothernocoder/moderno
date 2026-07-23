import { useState } from 'react'
import { Cart, type ShoppingCartItem, type ShoppingCartCheckoutPayload } from '../../screens/ecommerce/cart/Cart'
import { Shipping } from '../../screens/ecommerce/shipping/Shipping'
import { Payment } from '../../screens/ecommerce/payment/Payment'
import { Review, type OrderSummariesItem } from '../../screens/ecommerce/review/Review'
import { Confirmation } from '../../screens/ecommerce/confirmation/Confirmation'
import type { CheckoutFormsValues } from '../../blocks/ecommerce/checkout-forms/CheckoutForms'

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
 * Moderno flow example — Checkout (React). Copy-paste; edit freely.
 * Thin assembly (ADR-0005): stitches the Cart, Shipping, Payment, Review and
 * Confirmation screens using React's own useState for a local `step` plus the
 * cart/order state carried between them, with no router dependency. This is
 * the first flow whose screens themselves `composes` E-Commerce blocks
 * (ShoppingCart, CheckoutForms, OrderSummaries) rather than only primitives —
 * a runnable demo and a copy-paste starting point, not the product.
 */
export function CheckoutExample({ initialStep = 'cart' }: CheckoutExampleProps = {}) {
  const [step, setStep] = useState<Step>(initialStep)
  const [cartPayload, setCartPayload] = useState<ShoppingCartCheckoutPayload>()
  const [checkoutValues, setCheckoutValues] = useState<CheckoutFormsValues>()
  const [orderNumber, setOrderNumber] = useState(randomOrderNumber)
  const [submitting, setSubmitting] = useState(false)

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

  switch (step) {
    case 'shipping':
      return (
        <Shipping
          values={checkoutValues}
          onNext={handleShippingNext}
          onBack={() => setStep('cart')}
        />
      )
    case 'payment':
      return (
        <Payment
          values={checkoutValues ?? EMPTY_CHECKOUT_VALUES}
          onNext={handlePaymentNext}
          onBack={() => setStep('shipping')}
        />
      )
    case 'review':
      return (
        <Review
          items={toOrderSummariesItems(cartPayload?.items ?? [])}
          shipping={checkoutValues ?? EMPTY_CHECKOUT_VALUES}
          payment={checkoutValues ?? EMPTY_CHECKOUT_VALUES}
          onNext={handleReviewNext}
          onBack={() => setStep('payment')}
          submitting={submitting}
        />
      )
    case 'confirmation':
      return (
        <Confirmation
          orderNumber={orderNumber}
          email={checkoutValues?.email}
          onContinueShopping={handleContinueShopping}
        />
      )
    case 'cart':
    default:
      return <Cart items={cartPayload?.items} onNext={handleCartNext} />
  }
}
