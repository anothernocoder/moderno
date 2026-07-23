<script setup lang="ts">
import AuthExample from '@moderno/registry/flows/auth/Auth.example.vue'

// `step` is a plain string prop passed from the MDX doc across the
// Astro-island boundary (which serializes to JSON) so each screen can be
// demoed individually alongside the full assembled journey.
const props = withDefaults(defineProps<{ step?: string }>(), { step: 'sign-in' })
</script>

<template>
  <AuthExample :initial-step="props.step" />
</template>
