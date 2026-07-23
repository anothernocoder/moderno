<script setup lang="ts">
import CheckoutExample from '@moderno/registry/flows/checkout/Checkout.example.vue'

// `step` is a plain string prop passed from the MDX doc across the
// Astro-island boundary (which serializes to JSON) so each screen can be
// demoed individually alongside the full assembled journey.
const props = withDefaults(defineProps<{ step?: string }>(), { step: 'cart' })
</script>

<template>
  <CheckoutExample :initial-step="props.step" />
</template>
