<script lang="ts">
  // Moderno block — Panels (Svelte). Copy-paste; edit freely.
  // Generic panel surfaces for grouping content within a screen: a header (title + description)
  // above a responsive grid of bordered panel surfaces, each with a heading, a body slot, and an
  // optional footer action. Uses the Card + Button primitives + Moderno tokens — no new
  // primitives and no bespoke interaction logic, just layout.
  import { Button, Card } from '@moderno/svelte'

  interface PanelItem {
    id: string
    title: string
    body: string
    actionLabel?: string
  }

  const defaultPanels: PanelItem[] = [
    { id: 'profile', title: 'Perfil', body: 'Actualiza tu nombre, foto y biografía pública.', actionLabel: 'Editar perfil' },
    {
      id: 'notifications',
      title: 'Notificaciones',
      body: 'Elige qué actualizaciones quieres recibir por correo y en la app.',
      actionLabel: 'Gestionar',
    },
    {
      id: 'billing',
      title: 'Facturación',
      body: 'Consulta tu plan actual, método de pago y el historial de facturas.',
      actionLabel: 'Ver facturación',
    },
    {
      id: 'security',
      title: 'Seguridad',
      body: 'Activa la verificación en dos pasos y revisa las sesiones activas.',
      actionLabel: 'Revisar',
    },
  ]

  let {
    title = 'Ajustes de la cuenta',
    description = 'Agrupa opciones relacionadas en paneles independientes dentro de la misma pantalla.',
    panels = defaultPanels,
    onPanelAction,
  }: {
    title?: string
    description?: string
    panels?: PanelItem[]
    onPanelAction?: (panel: PanelItem) => void
  } = $props()
</script>

<section class="md-panels">
  <div class="md-panels__header">
    <h2 class="md-panels__title">{title}</h2>
    {#if description}<p class="md-panels__description">{description}</p>{/if}
  </div>
  <div class="md-panels__grid">
    {#each panels as panel (panel.id)}
      <Card>
        {#snippet title()}{panel.title}{/snippet}
        <p class="md-panels__body">{panel.body}</p>
        {#if panel.actionLabel}
          {#snippet footer()}
            <Button variant="secondary" size="sm" style="width: 100%" onclick={() => onPanelAction?.(panel)}>
              {panel.actionLabel}
            </Button>
          {/snippet}
        {/if}
      </Card>
    {/each}
  </div>
</section>

<style>
  .md-panels {
    display: flex;
    flex-direction: column;
    background: var(--md-surface-base);
    border: 1px solid var(--md-border-default);
  }
  .md-panels__header {
    padding: 20px 24px;
    border-bottom: 1px solid var(--md-border-default);
  }
  .md-panels__title {
    font-family: var(--md-font-serif);
    font-size: 20px;
    color: var(--md-text-primary);
    margin: 0 0 4px;
  }
  .md-panels__description {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
    margin: 0;
  }
  .md-panels__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
    padding: 20px 24px;
  }
  .md-panels__body {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
    line-height: 1.5;
    margin: 8px 0 0;
  }
</style>
