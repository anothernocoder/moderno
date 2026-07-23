<script setup lang="ts">
// Moderno screen — PlanSelect (Vue). Copy-paste; edit freely.
// Workspace/plan step of the Onboarding flow (ADR-0005): composes the
// Applications GridLists block — the plan tiles reuse its title/subtitle/
// status-badge card layout rather than re-implementing it. GridLists carries
// no internal state of its own, so wiring is a direct forward: choosing a
// tile fires the composed block's `item-action`, which this screen forwards
// straight through `next` — no separate "confirm" step, matching the pattern
// where a single meaningful action advances the flow.
import GridLists from '../../../blocks/applications/grid-lists/GridLists.vue'
import type { GridListItem } from '../../../blocks/applications/grid-lists/GridLists.vue'

export type { GridListItem }

// Vue's <script setup> compiler hoists withDefaults' default-factory functions
// out of setup(), so they can't close over a module-scope const — the plan
// list has to be inlined here rather than referencing a separate constant
// (unlike the React/Svelte/Solid siblings, which can use DEFAULT_PLANS).
withDefaults(
  defineProps<{
    plans?: GridListItem[]
    title?: string
    description?: string
    backLabel?: string
  }>(),
  {
    plans: () => [
      { id: 'starter', title: 'Starter', subtitle: '$0/mes · Para probar Moderno', initials: 'ST' },
      {
        id: 'pro',
        title: 'Pro',
        subtitle: '$29/mes · Para equipos pequeños',
        initials: 'PR',
        status: 'Recomendado',
        statusVariant: 'info',
      },
      { id: 'business', title: 'Business', subtitle: '$99/mes · SSO, roles y soporte prioritario', initials: 'BZ' },
    ],
    title: 'Elige un plan',
    description: 'Puedes cambiarlo después desde la configuración del workspace.',
    backLabel: 'Volver',
  },
)
const emit = defineEmits<{ next: [plan: GridListItem]; back: [] }>()
</script>

<template>
  <div class="md-plan-select">
    <div class="md-plan-select__header">
      <div>
        <h1 class="md-plan-select__title">{{ title }}</h1>
        <p class="md-plan-select__description">{{ description }}</p>
      </div>
      <button type="button" class="md-plan-select__link" @click="emit('back')">{{ backLabel }}</button>
    </div>
    <div class="md-plan-select__grid">
      <GridLists :items="plans" @item-action="emit('next', $event)" />
    </div>
  </div>
</template>

<style scoped>
.md-plan-select {
  min-height: 100%;
  background: var(--md-surface-base);
}
.md-plan-select__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 12px;
  max-width: 760px;
  margin: 0 auto;
  padding: 24px 24px 0;
}
.md-plan-select__title {
  font-family: var(--md-font-serif);
  font-size: var(--md-text-headline-lg);
  color: var(--md-text-primary);
  margin: 0 0 4px;
}
.md-plan-select__description {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
  margin: 0;
}
.md-plan-select__link {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  font-size: var(--md-text-body-sm);
  color: var(--md-text-primary);
  text-decoration: underline;
  cursor: pointer;
}
.md-plan-select__grid {
  max-width: 760px;
  margin: 0 auto;
}
</style>
