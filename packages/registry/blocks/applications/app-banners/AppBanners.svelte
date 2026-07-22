<script lang="ts">
  // Moderno block — AppBanners (Svelte). Copy-paste; edit freely.
  // Application-level system notification banners: impersonation, trial, and incident notices
  // stacked full-width at the top of an authenticated app shell. Uses the Button primitive + Moderno tokens.
  import { Button } from '@moderno/svelte'

  type AppBannerVariant = 'info' | 'success' | 'warning' | 'error'

  interface AppBannerItem {
    id: string
    variant?: AppBannerVariant
    icon?: string
    message: string
    actionLabel?: string
    actionHref?: string
    onAction?: () => void
    dismissible?: boolean
    closeLabel?: string
  }

  let {
    items = [
      {
        id: 'impersonation',
        variant: 'warning',
        icon: '🕵️',
        message: 'Estás en modo impersonación: viendo la cuenta de Ana Pérez.',
        actionLabel: 'Salir',
        dismissible: false,
      },
      {
        id: 'trial',
        variant: 'info',
        icon: '⏳',
        message: 'Tu prueba termina en 3 días.',
        actionLabel: 'Actualizar plan',
      },
      {
        id: 'incident',
        variant: 'error',
        icon: '⚠️',
        message: 'Servicio degradado: algunas funciones pueden no responder con normalidad.',
      },
    ],
    onDismiss,
  }: {
    items?: AppBannerItem[]
    onDismiss?: (id: string) => void
  } = $props()

  const VARIANT_TOKEN: Record<AppBannerVariant, string> = {
    info: 'var(--md-info)',
    success: 'var(--md-success)',
    warning: 'var(--md-warning)',
    error: 'var(--md-error)',
  }

  function tokenFor(variant?: AppBannerVariant) {
    return VARIANT_TOKEN[variant ?? 'info']
  }

  let dismissedIds = $state(new Set<string>())

  let visibleItems = $derived(items.filter((item) => !dismissedIds.has(item.id)))

  function handleDismiss(id: string) {
    dismissedIds = new Set(dismissedIds).add(id)
    onDismiss?.(id)
  }
</script>

<div class="md-app-banners">
  {#each visibleItems as item (item.id)}
    {@const variant = item.variant ?? 'info'}
    {@const dismissible = item.dismissible ?? true}
    <div
      class="md-app-banners__row"
      role="alert"
      style="background: color-mix(in srgb, {tokenFor(variant)} 12%, var(--md-surface-base));"
    >
      {#if item.icon}
        <span aria-hidden="true" class="md-app-banners__icon" style="color: {tokenFor(variant)};">{item.icon}</span>
      {/if}
      <p class="md-app-banners__message">{item.message}</p>
      {#if item.actionLabel && item.actionHref}
        <a href={item.actionHref} class="md-app-banners__action" style="color: {tokenFor(variant)};">
          {item.actionLabel}
        </a>
      {:else if item.actionLabel}
        <Button label={item.actionLabel} size="sm" variant="secondary" onclick={item.onAction} />
      {/if}
      {#if dismissible}
        <button
          type="button"
          class="md-app-banners__close"
          aria-label={item.closeLabel ?? 'Cerrar'}
          onclick={() => handleDismiss(item.id)}
        >
          ×
        </button>
      {/if}
    </div>
  {/each}
</div>

<style>
  .md-app-banners__row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    border-bottom: 1px solid var(--md-border-default);
  }
  .md-app-banners__icon {
    font-size: 18px;
    line-height: 1;
    flex-shrink: 0;
  }
  .md-app-banners__message {
    flex: 1;
    margin: 0;
    font-size: var(--md-text-body-sm);
    line-height: var(--md-text-body-sm-lh);
    color: var(--md-text-primary);
  }
  .md-app-banners__action {
    font-weight: 600;
    text-decoration: underline;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .md-app-banners__close {
    background: transparent;
    border: none;
    color: var(--md-text-secondary);
    font: inherit;
    font-size: 16px;
    line-height: 1;
    cursor: pointer;
    padding: 4px;
    flex-shrink: 0;
  }
</style>
