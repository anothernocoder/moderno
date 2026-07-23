<script lang="ts">
  // Moderno screen — Confirmation (Svelte). Copy-paste; edit freely.
  // Final step of the Checkout flow (ADR-0005): a simple presentational
  // "order placed" success view. No E-Commerce block fits a one-off success
  // message, so this screen composes only the Button primitive + Moderno
  // tokens — matching how a screen may compose blocks OR primitives directly,
  // whichever the step actually needs.
  import { Button } from '@moderno/svelte'

  let {
    orderNumber = '#MD-10482',
    email,
    onContinueShopping,
    title = '¡Pedido confirmado!',
    description = 'Gracias por tu compra. Te enviamos los detalles de tu pedido por correo.',
    continueLabel = 'Seguir comprando',
  }: {
    orderNumber?: string
    email?: string
    onContinueShopping?: () => void
    title?: string
    description?: string
    continueLabel?: string
  } = $props()
</script>

<div class="md-confirmation">
  <div class="md-confirmation__card">
    <div class="md-confirmation__badge">✓</div>
    <h1 class="md-confirmation__title">{title}</h1>
    <p class="md-confirmation__description">
      {description}{#if email} Revisa {email}.{/if}
    </p>
    <p class="md-confirmation__order-number">{orderNumber}</p>
    <Button variant="primary" style="width: 100%;" onclick={() => onContinueShopping?.()}>
      {continueLabel}
    </Button>
  </div>
</div>

<style>
  .md-confirmation {
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: var(--md-surface-base);
  }
  .md-confirmation__card {
    width: 100%;
    max-width: 420px;
    border: 1px solid var(--md-border-default);
    padding: 32px;
    text-align: center;
  }
  .md-confirmation__badge {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--md-surface-muted);
    color: var(--md-text-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    font-size: 24px;
  }
  .md-confirmation__title {
    font-family: var(--md-font-serif);
    font-size: var(--md-text-headline-lg);
    color: var(--md-text-primary);
    margin: 0 0 8px;
  }
  .md-confirmation__description {
    font-size: var(--md-text-body-sm);
    line-height: var(--md-text-body-sm-lh);
    color: var(--md-text-secondary);
    margin: 0 0 24px;
  }
  .md-confirmation__order-number {
    font-family: var(--md-font-serif);
    font-size: 20px;
    color: var(--md-text-primary);
    margin: 0 0 24px;
  }
</style>
