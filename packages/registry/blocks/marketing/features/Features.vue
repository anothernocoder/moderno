<script setup lang="ts">
// Moderno block — Features (Vue). Copy-paste; edit freely.
// Feature highlight grid: icon, title, and description per item. Uses the Card primitive + Moderno tokens.
import { Card } from '@moderno/vue'

export interface FeatureItem {
  icon?: string
  title: string
  description: string
}

withDefaults(
  defineProps<{
    kicker?: string
    title?: string
    subtitle?: string
    features?: FeatureItem[]
  }>(),
  {
    kicker: 'Características',
    title: 'Todo lo que necesitas para construir rápido',
    subtitle: 'Primitives, blocks y tokens que funcionan igual en los cuatro frameworks.',
    features: () => [
      { icon: '🎨', title: 'Un solo look', description: 'Tokens --md-* compartidos entre React, Vue, Svelte y Solid.' },
      {
        icon: '⚙️',
        title: 'Un solo comportamiento',
        description: 'Zag.js maneja estado e interacción bajo el capó, sin reescribir lógica por framework.',
      },
      {
        icon: '🧩',
        title: 'Primitives versionados',
        description: 'Componentes npm que se actualizan solos; los arreglos se propagan al centro.',
      },
      {
        icon: '📦',
        title: 'Blocks copy-paste',
        description: 'Composiciones de layout que copias a tu repo y editas libremente.',
      },
      {
        icon: '♿',
        title: 'Accesible por defecto',
        description: 'Construido sobre primitives con soporte ARIA y navegación por teclado.',
      },
      {
        icon: '🚀',
        title: 'Listo para producción',
        description: 'La misma API en los cuatro frameworks, desde el prototipo hasta producción.',
      },
    ],
  },
)
</script>

<template>
  <section class="md-features">
    <div class="md-features__header">
      <p class="md-features__kicker">{{ kicker }}</p>
      <h2 class="md-features__title">{{ title }}</h2>
      <p class="md-features__subtitle">{{ subtitle }}</p>
    </div>
    <div class="md-features__grid">
      <Card v-for="feature in features" :key="feature.title">
        <div v-if="feature.icon" class="md-features__icon">{{ feature.icon }}</div>
        <h3 class="md-features__feature-title">{{ feature.title }}</h3>
        <p class="md-features__feature-description">{{ feature.description }}</p>
      </Card>
    </div>
  </section>
</template>

<style scoped>
.md-features {
  padding: 96px 24px;
  background: var(--md-surface-base);
}
.md-features__header {
  text-align: center;
  margin: 0 auto 56px;
  max-width: 640px;
}
.md-features__kicker {
  font-size: var(--md-text-label-sm);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--md-text-secondary);
  margin: 0 0 16px;
}
.md-features__title {
  font-family: var(--md-font-serif);
  font-size: 36px;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--md-text-primary);
  margin: 0 0 16px;
}
.md-features__subtitle {
  font-size: var(--md-text-body-lg);
  line-height: var(--md-text-body-lg-lh);
  color: var(--md-text-secondary);
  margin: 0;
}
.md-features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  max-width: 1040px;
  margin: 0 auto;
}
.md-features__icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background: var(--md-surface-muted);
  border: 1px solid var(--md-border-default);
}
.md-features__feature-title {
  font-family: var(--md-font-serif);
  font-size: 20px;
  color: var(--md-text-primary);
  margin: 0;
}
.md-features__feature-description {
  font-size: var(--md-text-body-sm);
  line-height: var(--md-text-body-sm-lh);
  color: var(--md-text-secondary);
  margin: 0;
}
</style>
