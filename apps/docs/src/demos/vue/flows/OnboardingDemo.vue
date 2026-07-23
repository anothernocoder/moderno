<script setup lang="ts">
import OnboardingExample from '@moderno/registry/flows/onboarding/Onboarding.example.vue'

// `step` is a plain string prop passed from the MDX doc across the
// Astro-island boundary (which serializes to JSON) so each screen can be
// demoed individually alongside the full assembled journey.
const props = withDefaults(defineProps<{ step?: string }>(), { step: 'welcome' })
</script>

<template>
  <OnboardingExample :initial-step="props.step" />
</template>
