<script lang="ts">
  // Moderno screen — PlanSelect (Svelte). Copy-paste; edit freely.
  // Workspace/plan step of the Onboarding flow (ADR-0005): composes the
  // Applications GridLists block — the plan tiles reuse its title/subtitle/
  // status-badge card layout rather than re-implementing it. GridLists carries
  // no internal state of its own, so wiring is a direct forward: choosing a
  // tile fires the composed block's `onItemAction`, which this screen forwards
  // straight through `onNext` — no separate "confirm" step, matching the
  // pattern where a single meaningful action advances the flow.
  import GridLists from '../../../blocks/applications/grid-lists/GridLists.svelte'
  import type { GridListItem } from '../../../blocks/applications/grid-lists/GridLists.svelte'

  const DEFAULT_PLANS: GridListItem[] = [
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
  ]

  let {
    plans = DEFAULT_PLANS,
    onNext,
    onBack,
    title = 'Elige un plan',
    description = 'Puedes cambiarlo después desde la configuración del workspace.',
    backLabel = 'Volver',
  }: {
    plans?: GridListItem[]
    onNext: (plan: GridListItem) => void
    onBack?: () => void
    title?: string
    description?: string
    backLabel?: string
  } = $props()
</script>

<div class="md-plan-select">
  <div class="md-plan-select__header">
    <div>
      <h1 class="md-plan-select__title">{title}</h1>
      <p class="md-plan-select__description">{description}</p>
    </div>
    {#if onBack}
      <button type="button" class="md-plan-select__link" onclick={() => onBack?.()}>{backLabel}</button>
    {/if}
  </div>
  <div class="md-plan-select__grid">
    <GridLists items={plans} onItemAction={onNext} />
  </div>
</div>

<style>
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
