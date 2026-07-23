<script lang="ts">
  import CheckoutExample from '@moderno/registry/flows/checkout/Checkout.example.svelte'

  // `step` is a plain string prop passed from the MDX doc across the
  // Astro-island boundary (which serializes to JSON) so each screen can be
  // demoed individually alongside the full assembled journey.
  let { step = 'cart' }: { step?: string } = $props()
</script>

<CheckoutExample initialStep={step} />
