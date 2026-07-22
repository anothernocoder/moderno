<script lang="ts">
  // Moderno block — ActionPanels (Svelte). Copy-paste; edit freely.
  // Settings/account panel list: title + description on the left, a single action on the
  // right, with an optional "destructive" (danger-zone) style. Uses the Card + Button +
  // Divider primitives + Moderno tokens.
  import { Button, Card, Divider } from '@moderno/svelte'

  export interface ActionPanelItem {
    title: string
    description: string
    actionLabel: string
    /** Danger-zone styling: colors the title and action with the error token. */
    destructive?: boolean
  }

  const defaultItems: ActionPanelItem[] = [
    {
      title: 'Descargar tus datos',
      description: 'Exporta toda tu información de la cuenta en un archivo JSON.',
      actionLabel: 'Exportar',
    },
    {
      title: 'Transferir propiedad',
      description: 'Transfiere esta cuenta a otro miembro del equipo. Perderás el acceso de administrador.',
      actionLabel: 'Transferir',
    },
    {
      title: 'Eliminar cuenta',
      description: 'Esta acción es permanente y no se puede deshacer. Se eliminarán todos tus datos.',
      actionLabel: 'Eliminar cuenta',
      destructive: true,
    },
  ]

  let {
    items = defaultItems,
    onAction,
  }: {
    items?: ActionPanelItem[]
    onAction?: (item: ActionPanelItem) => void
  } = $props()
</script>

<Card>
  {#each items as item, index (item.title)}
    {#if index > 0}<Divider />{/if}
    <div class="md-action-panels__row">
      <div class="md-action-panels__text">
        <h3 class="md-action-panels__title" class:md-action-panels__title--destructive={item.destructive}>
          {item.title}
        </h3>
        <p class="md-action-panels__description">{item.description}</p>
      </div>
      <Button
        variant="secondary"
        size="sm"
        style={item.destructive ? 'border-color: var(--md-error); color: var(--md-error);' : undefined}
        onclick={() => onAction?.(item)}
      >
        {item.actionLabel}
      </Button>
    </div>
  {/each}
</Card>

<style>
  .md-action-panels__row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: wrap;
  }
  .md-action-panels__text {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-width: 520px;
  }
  .md-action-panels__title {
    margin: 0;
    font-size: var(--md-text-body-md);
    font-weight: 600;
    color: var(--md-text-primary);
  }
  .md-action-panels__title--destructive {
    color: var(--md-error);
  }
  .md-action-panels__description {
    margin: 0;
    font-size: var(--md-text-body-sm);
    line-height: var(--md-text-body-sm-lh);
    color: var(--md-text-secondary);
  }
</style>
