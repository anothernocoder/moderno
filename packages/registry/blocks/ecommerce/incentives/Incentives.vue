<script setup lang="ts">
// Moderno block — Incentives (Vue). Copy-paste; edit freely.
// Storefront-wide trust/incentive strip: icon + label + short description
// per incentive (free shipping, easy returns, secure payment). Composes
// the Card primitive + Moderno tokens. No new primitives, no bespoke
// interaction logic — purely presentational.
import { Card } from '@moderno/vue'

export type IncentiveIcon = 'shipping' | 'returns' | 'payment'

export interface IncentiveItem {
  icon?: IncentiveIcon
  label: string
  description: string
}

interface IconSpec {
  viewBox: string
  paths: string[]
  circles?: { cx: number; cy: number; r: number }[]
}

const ICONS: Record<IncentiveIcon, IconSpec> = {
  shipping: {
    viewBox: '0 0 24 24',
    paths: ['M2 7h11v9H2z', 'M13 10h4l4 3v3h-8z'],
    circles: [
      { cx: 6, cy: 18, r: 1.6 },
      { cx: 17, cy: 18, r: 1.6 },
    ],
  },
  returns: {
    viewBox: '0 0 24 24',
    paths: ['M9 4 4 9l5 5', 'M4 9h9a7 7 0 0 1 7 7v1'],
  },
  payment: {
    viewBox: '0 0 24 24',
    paths: ['M5 11h14v9H5z', 'M7 11V7a5 5 0 0 1 10 0v4'],
    circles: [{ cx: 12, cy: 15.5, r: 1.3 }],
  },
}

const props = withDefaults(
  defineProps<{
    heading?: string
    items?: IncentiveItem[]
  }>(),
  {
    heading: 'Compra con confianza',
    items: () => [
      {
        icon: 'shipping',
        label: 'Envío gratis',
        description: 'Envío sin costo en compras desde $250.000 a todo el país.',
      },
      {
        icon: 'returns',
        label: 'Cambios y devoluciones fáciles',
        description: 'Tienes 30 días desde la entrega para cambiar o devolver tu compra sin costo.',
      },
      {
        icon: 'payment',
        label: 'Pago 100% seguro',
        description: 'Tus datos están protegidos con cifrado en cada transacción.',
      },
    ],
  },
)

function iconSpec(icon?: IncentiveIcon): IconSpec {
  return ICONS[icon ?? 'shipping']
}
</script>

<template>
  <section class="md-incentives" :aria-label="heading">
    <h2 v-if="heading" class="md-incentives__heading">{{ heading }}</h2>
    <div class="md-incentives__grid">
      <Card v-for="(item, index) in props.items" :key="item.label ?? index">
        <template #title>
          <span class="md-incentives__title-row">
            <svg
              :viewBox="iconSpec(item.icon).viewBox"
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              class="md-incentives__icon"
              aria-hidden="true"
            >
              <circle
                v-for="(c, cIndex) in iconSpec(item.icon).circles"
                :key="`c-${cIndex}`"
                :cx="c.cx"
                :cy="c.cy"
                :r="c.r"
              />
              <path v-for="(d, dIndex) in iconSpec(item.icon).paths" :key="`p-${dIndex}`" :d="d" />
            </svg>
            <span>{{ item.label }}</span>
          </span>
        </template>
        <p class="md-incentives__description">{{ item.description }}</p>
      </Card>
    </div>
  </section>
</template>

<style scoped>
.md-incentives {
  padding: 48px 24px;
  background: var(--md-surface-base);
}
.md-incentives__heading {
  font-family: var(--md-font-serif);
  font-size: 28px;
  line-height: 1.15;
  color: var(--md-text-primary);
  text-align: center;
  margin: 0 0 24px;
}
.md-incentives__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  max-width: 1040px;
  margin: 0 auto;
}
.md-incentives__title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.md-incentives__icon {
  color: var(--md-primary);
  flex-shrink: 0;
}
.md-incentives__description {
  font-size: var(--md-text-body-sm);
  line-height: var(--md-text-body-sm-lh);
  color: var(--md-text-secondary);
  margin: 0;
}
</style>
