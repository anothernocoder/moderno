import { CheckoutExample, type CheckoutExampleProps } from '@moderno/registry/flows/checkout/Checkout.example.tsx'

// `step` is a plain string prop passed from the MDX doc across the
// Astro-island boundary (which serializes to JSON) so each screen can be
// demoed individually alongside the full assembled journey.
export default function CheckoutDemo({ step }: { step?: CheckoutExampleProps['initialStep'] }) {
  return <CheckoutExample initialStep={step} />
}
