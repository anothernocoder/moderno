<script setup lang="ts">
// Moderno block — Cta (Vue). Copy-paste; edit freely.
// A focused headline + CTA button section — no kicker, no subtitle-as-secondary-emphasis.
// Uses the Button primitive + Moderno tokens (--md-* custom properties).
import { Button } from '@moderno/vue'

withDefaults(
  defineProps<{
    title?: string
    description?: string
    ctaLabel?: string
    secondaryLabel?: string
  }>(),
  {
    title: '¿Listo para construir con Moderno?',
    description: 'Copia el block, instala el primitive y personaliza los tokens a tu gusto.',
    ctaLabel: 'Empezar ahora',
  },
)

defineEmits<{ cta: []; secondary: [] }>()
</script>

<template>
  <section class="md-cta">
    <h2 class="md-cta__title">{{ title }}</h2>
    <p v-if="description" class="md-cta__description">{{ description }}</p>
    <div class="md-cta__actions">
      <Button variant="primary" size="lg" :label="ctaLabel" @click="$emit('cta')" />
      <Button
        v-if="secondaryLabel"
        variant="secondary"
        size="lg"
        :label="secondaryLabel"
        @click="$emit('secondary')"
      />
    </div>
  </section>
</template>

<style scoped>
.md-cta {
  padding: 96px 24px;
  text-align: center;
  background: var(--md-surface-raised);
  border-radius: var(--md-radius-none);
}
.md-cta__title {
  font-family: var(--md-font-serif);
  font-size: 40px;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--md-text-primary);
  margin: 0 auto 16px;
  max-width: 18ch;
}
.md-cta__description {
  font-size: var(--md-text-body-lg);
  line-height: var(--md-text-body-lg-lh);
  color: var(--md-text-secondary);
  margin: 0 auto 32px;
  max-width: 52ch;
}
.md-cta__actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
