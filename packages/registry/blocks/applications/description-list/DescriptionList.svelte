<script lang="ts">
  // Moderno block — DescriptionList (Svelte). Copy-paste; edit freely.
  // Key/value detail list for a record view (order, profile, etc). Label above value on
  // narrow layouts, side-by-side on wider ones. Uses the Card primitive + Moderno tokens.
  import { Card } from '@moderno/svelte'

  interface DescriptionItem {
    label: string
    value: string
  }

  let {
    title = 'Detalle del pedido',
    items = [
      { label: 'Número de pedido', value: 'PED-1104' },
      { label: 'Fecha', value: '14 jul 2026' },
      { label: 'Cliente', value: 'Bruno Café' },
      { label: 'Correo electrónico', value: 'bruno@cafe.com' },
      { label: 'Dirección de envío', value: 'Cra 9 #63-25, Bogotá' },
      { label: 'Método de pago', value: 'Visa •••• 4242' },
      { label: 'Estado', value: 'Despachado' },
      { label: 'Total', value: '$412.800' },
    ],
  }: {
    title?: string
    items?: DescriptionItem[]
  } = $props()
</script>

{#snippet cardTitle()}{title}{/snippet}
<Card title={cardTitle}>
  <dl class="md-description-list">
    {#each items as item, index (item.label)}
      <div class="md-description-list__row" class:md-description-list__row--last={index === items.length - 1}>
        <dt class="md-description-list__label">{item.label}</dt>
        <dd class="md-description-list__value">{item.value}</dd>
      </div>
    {/each}
  </dl>
</Card>

<style>
  .md-description-list {
    margin: 0;
  }
  .md-description-list__row {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 24px;
    padding: 12px 0;
    border-bottom: 1px solid var(--md-border-default);
  }
  .md-description-list__row--last {
    border-bottom: none;
  }
  .md-description-list__label {
    flex: 1 1 160px;
    margin: 0;
    font-size: var(--md-text-label-md);
    color: var(--md-text-secondary);
  }
  .md-description-list__value {
    flex: 3 1 240px;
    margin: 0;
    font-size: var(--md-text-body-sm);
    color: var(--md-text-primary);
  }
</style>
