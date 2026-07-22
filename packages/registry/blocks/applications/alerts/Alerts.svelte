<script lang="ts">
  // Moderno block — Alerts (Svelte). Copy-paste; edit freely.
  // Inline info/success/warning/error message patterns composed into an application
  // layout section (dashboard/form alerts area). Uses the Alert + Button primitives + Moderno tokens.
  import { Alert, Button } from '@moderno/svelte'

  export type AlertVariant = 'info' | 'success' | 'warning' | 'error'

  export interface AlertItem {
    id: string
    variant: AlertVariant
    title?: string
    description: string
    dismissible?: boolean
    actionLabel?: string
  }

  const defaultItems: AlertItem[] = [
    {
      id: 'maintenance',
      variant: 'info',
      title: 'Mantenimiento programado',
      description: 'El sistema no estará disponible el sábado de 2:00 a 4:00 a. m.',
      dismissible: true,
    },
    {
      id: 'saved',
      variant: 'success',
      title: 'Cambios guardados',
      description: 'La información de tu perfil se actualizó correctamente.',
      dismissible: true,
    },
    {
      id: 'card-expiring',
      variant: 'warning',
      title: 'Tu tarjeta vence pronto',
      description: 'Actualiza el método de pago para evitar interrupciones en tu suscripción.',
      actionLabel: 'Actualizar método de pago',
    },
    {
      id: 'payment-failed',
      variant: 'error',
      title: 'El pago no se pudo procesar',
      description: 'Verifica los datos de la tarjeta e inténtalo de nuevo.',
      actionLabel: 'Reintentar pago',
    },
  ]

  let {
    items = defaultItems,
    onDismiss,
    onAction,
  }: {
    items?: AlertItem[]
    onDismiss?: (id: string) => void
    onAction?: (id: string) => void
  } = $props()

  let dismissed = $state<Set<string>>(new Set())

  const visible = $derived(items.filter((item) => !dismissed.has(item.id)))

  function handleDismiss(id: string) {
    dismissed = new Set(dismissed).add(id)
    onDismiss?.(id)
  }
</script>

<section class="md-alerts">
  {#each visible as item (item.id)}
    <div class="md-alerts__item">
      <Alert variant={item.variant} title={item.title}>
        {item.description}
        {#if item.actionLabel}
          <Button variant="secondary" size="sm" style="margin-left: 12px" onclick={() => onAction?.(item.id)}>
            {item.actionLabel}
          </Button>
        {/if}
      </Alert>
      {#if item.dismissible}
        <button type="button" aria-label="Cerrar" class="md-alerts__dismiss" onclick={() => handleDismiss(item.id)}>
          ×
        </button>
      {/if}
    </div>
  {/each}
</section>

<style>
  .md-alerts {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 24px;
    background: var(--md-surface-base);
  }
  .md-alerts__item {
    position: relative;
  }
  .md-alerts__dismiss {
    position: absolute;
    top: 12px;
    right: 12px;
    background: transparent;
    border: none;
    color: inherit;
    font: inherit;
    font-size: 16px;
    line-height: 1;
    cursor: pointer;
    padding: 4px;
  }
</style>
