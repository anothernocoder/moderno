<script setup lang="ts">
// Moderno block — KpiCards (Vue). Copy-paste; edit freely.
// Primary metric cards with a trend indicator. Single-metric counterpart to
// the Stats row block. Uses the Card + Badge primitives + Moderno tokens.
import { Card, Badge } from '@moderno/vue'

interface KpiCardItem {
  label: string
  value: string
  helpText?: string
  delta?: string
  trend?: 'up' | 'down'
}

withDefaults(
  defineProps<{
    items?: KpiCardItem[]
  }>(),
  {
    items: () => [
      {
        label: 'Ingresos recurrentes',
        value: '$128.4k',
        helpText: 'vs. mes anterior',
        delta: '+8.2%',
        trend: 'up',
      },
      {
        label: 'Usuarios activos',
        value: '24,891',
        helpText: 'vs. mes anterior',
        delta: '+4.6%',
        trend: 'up',
      },
      {
        label: 'Tasa de cancelación',
        value: '2.3%',
        helpText: 'vs. mes anterior',
        delta: '-0.4%',
        trend: 'down',
      },
    ],
  },
)
</script>

<template>
  <section class="md-kpi-cards">
    <Card v-for="item in items" :key="item.label">
      <p class="md-kpi-cards__label">{{ item.label }}</p>
      <p class="md-kpi-cards__value">{{ item.value }}</p>
      <div v-if="item.delta || item.helpText" class="md-kpi-cards__meta">
        <Badge v-if="item.delta" :variant="item.trend === 'down' ? 'error' : 'success'" dot>
          {{ item.trend === 'down' ? '↓' : '↑' }} {{ item.delta }}
        </Badge>
        <span v-if="item.helpText" class="md-kpi-cards__help">{{ item.helpText }}</span>
      </div>
    </Card>
  </section>
</template>

<style scoped>
.md-kpi-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  padding: 24px;
  background: var(--md-surface-base);
}
.md-kpi-cards__label {
  font-size: var(--md-text-label-md);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--md-text-secondary);
  margin: 0 0 8px;
}
.md-kpi-cards__value {
  font-family: var(--md-font-serif);
  font-size: 40px;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--md-text-primary);
  margin: 0 0 12px;
}
.md-kpi-cards__meta {
  display: flex;
  align-items: center;
  gap: 8px;
}
.md-kpi-cards__help {
  font-size: var(--md-text-label-md);
  color: var(--md-text-secondary);
}
</style>
