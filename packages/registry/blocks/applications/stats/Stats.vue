<script setup lang="ts">
// Moderno block — Stats (Vue). Copy-paste; edit freely.
// KPI metric row. Uses the Card + Badge primitives + Moderno tokens.
import { Card, Badge } from '@moderno/vue'

interface StatItem {
  label: string
  value: string
  delta?: string
  trend?: 'up' | 'down'
}

withDefaults(
  defineProps<{
    items?: StatItem[]
  }>(),
  {
    items: () => [
      { label: 'Ingresos', value: '$48.2k', delta: '+12.4%', trend: 'up' },
      { label: 'Clientes activos', value: '1,294', delta: '+3.1%', trend: 'up' },
      { label: 'Cancelaciones', value: '38', delta: '-0.8%', trend: 'down' },
      { label: 'Ticket promedio', value: '$37', delta: '+1.9%', trend: 'up' },
    ],
  },
)
</script>

<template>
  <section class="md-stats">
    <Card v-for="item in items" :key="item.label">
      <p class="md-stats__label">{{ item.label }}</p>
      <p class="md-stats__value">{{ item.value }}</p>
      <Badge v-if="item.delta" :variant="item.trend === 'down' ? 'error' : 'success'" dot>
        {{ item.delta }}
      </Badge>
    </Card>
  </section>
</template>

<style scoped>
.md-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  padding: 24px;
  background: var(--md-surface-base);
}
.md-stats__label {
  font-size: var(--md-text-label-md);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--md-text-secondary);
  margin: 0 0 8px;
}
.md-stats__value {
  font-family: var(--md-font-serif);
  font-size: 32px;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--md-text-primary);
  margin: 0 0 12px;
}
</style>
