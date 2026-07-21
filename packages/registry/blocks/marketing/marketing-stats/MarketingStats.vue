<script setup lang="ts">
// Moderno block — MarketingStats (Vue). Copy-paste; edit freely.
// Marketing brag row: centered header above a row of big serif numbers with uppercase labels.
// Distinct from the applications `Stats` block (no Card/Badge, editorial rather than dashboard).
// Uses Moderno tokens only — no primitives.

export interface StatItem {
  value: string
  label: string
}

const DEFAULT_ITEMS: StatItem[] = [
  { value: '4', label: 'Frameworks soportados' },
  { value: '30+', label: 'Componentes' },
  { value: '100%', label: 'Tokens compartidos' },
  { value: '0', label: 'Dependencias de UI extra' },
]

const props = withDefaults(
  defineProps<{
    kicker?: string
    title?: string
    subtitle?: string
    items?: StatItem[]
  }>(),
  {
    kicker: 'En números',
    title: 'El impacto de Moderno',
    subtitle: 'Un solo design system, cuatro frameworks, resultados medibles.',
  },
)

const items = props.items ?? DEFAULT_ITEMS
</script>

<template>
  <section class="md-marketing-stats">
    <div class="md-marketing-stats__header">
      <p class="md-marketing-stats__kicker">{{ kicker }}</p>
      <h2 class="md-marketing-stats__title">{{ title }}</h2>
      <p class="md-marketing-stats__subtitle">{{ subtitle }}</p>
    </div>
    <div class="md-marketing-stats__row">
      <div v-for="item in items" :key="item.label" class="md-marketing-stats__item">
        <p class="md-marketing-stats__value">{{ item.value }}</p>
        <p class="md-marketing-stats__label">{{ item.label }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.md-marketing-stats {
  padding: 96px 24px;
  background: var(--md-surface-base);
}
.md-marketing-stats__header {
  text-align: center;
  margin: 0 auto 56px;
  max-width: 640px;
}
.md-marketing-stats__kicker {
  font-size: var(--md-text-label-sm);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--md-text-secondary);
  margin: 0 0 16px;
}
.md-marketing-stats__title {
  font-family: var(--md-font-serif);
  font-size: 36px;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--md-text-primary);
  margin: 0 0 16px;
}
.md-marketing-stats__subtitle {
  font-size: var(--md-text-body-lg);
  line-height: var(--md-text-body-lg-lh);
  color: var(--md-text-secondary);
  margin: 0;
}
.md-marketing-stats__row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 48px;
  max-width: 960px;
  margin: 0 auto;
}
.md-marketing-stats__item {
  text-align: center;
}
.md-marketing-stats__value {
  font-family: var(--md-font-serif);
  font-size: 52px;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--md-text-primary);
  margin: 0 0 8px;
}
.md-marketing-stats__label {
  font-size: var(--md-text-label-sm);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--md-text-secondary);
  margin: 0;
}
</style>
