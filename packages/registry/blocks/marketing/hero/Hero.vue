<script setup lang="ts">
// Moderno block — Hero (Vue). Copy-paste; edit freely.
// Uses the Button primitive + Moderno tokens (--md-* custom properties).
import { Button } from '@moderno/vue'

withDefaults(
  defineProps<{
    kicker?: string
    title?: string
    subtitle?: string
    ctaLabel?: string
  }>(),
  {
    kicker: 'Moderno',
    title: 'Construye productos, no componentes.',
    subtitle:
      'Un sistema de diseño agnóstico al framework: un comportamiento y un look, usables desde React, Vue, Svelte y Solid.',
    ctaLabel: 'Empezar ahora',
  },
)

defineEmits<{ cta: [] }>()
</script>

<template>
  <section class="md-hero">
    <p class="md-hero__kicker">{{ kicker }}</p>
    <h1 class="md-hero__title">{{ title }}</h1>
    <p class="md-hero__subtitle">{{ subtitle }}</p>
    <Button :label="ctaLabel" size="lg" @click="$emit('cta')" />
  </section>
</template>

<style scoped>
.md-hero {
  padding: 96px 24px;
  text-align: center;
  background: var(--md-surface-base);
  border-bottom: 1px solid var(--md-border-default);
}
.md-hero__kicker {
  font-size: var(--md-text-label-sm);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--md-text-secondary);
  margin: 0 0 16px;
}
.md-hero__title {
  font-family: var(--md-font-serif);
  font-size: 48px;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--md-text-primary);
  margin: 0 auto 16px;
  max-width: 16ch;
}
.md-hero__subtitle {
  font-size: var(--md-text-body-lg);
  line-height: var(--md-text-body-lg-lh);
  color: var(--md-text-secondary);
  margin: 0 auto 32px;
  max-width: 52ch;
}
</style>
