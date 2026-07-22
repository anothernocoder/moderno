<script lang="ts">
  // Moderno block — Promo (Svelte). Copy-paste; edit freely.
  // Sitewide promotional announcement bar: a message, an optional CTA link, and an
  // optional close button. Plain layout + `--md-*` tokens, no primitives.

  let {
    message = 'Envío gratis en pedidos mayores a $50.000. Hoy: 20% de descuento en toda la tienda.',
    ctaLabel = 'Ver ofertas',
    ctaHref = '#',
    onCtaClick,
    dismissible = true,
    onDismiss,
    closeLabel = 'Cerrar',
  }: {
    message?: string
    ctaLabel?: string
    ctaHref?: string
    onCtaClick?: (event: MouseEvent) => void
    dismissible?: boolean
    onDismiss?: () => void
    closeLabel?: string
  } = $props()

  let visible = $state(true)

  function handleDismiss() {
    visible = false
    onDismiss?.()
  }
</script>

{#if visible}
  <div class="md-promo" role="region" aria-label="Promoción">
    <div class="md-promo__row">
      <p class="md-promo__message">{message}</p>
      {#if ctaLabel}
        <a href={ctaHref} class="md-promo__cta" onclick={onCtaClick}>{ctaLabel}</a>
      {/if}
    </div>
    {#if dismissible}
      <button type="button" class="md-promo__close" aria-label={closeLabel} onclick={handleDismiss}>×</button>
    {/if}
  </div>
{/if}

<style>
  .md-promo {
    position: relative;
    background: var(--md-primary);
    color: var(--md-on-primary);
  }
  .md-promo__row {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px 16px;
    max-width: 1040px;
    margin: 0 auto;
    padding: 10px 48px;
    text-align: center;
  }
  .md-promo__message {
    margin: 0;
    font-size: var(--md-text-body-sm);
    line-height: var(--md-text-body-sm-lh);
    font-weight: 600;
  }
  .md-promo__cta {
    color: inherit;
    font-size: var(--md-text-body-sm);
    font-weight: 600;
    text-decoration: underline;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .md-promo__close {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    color: inherit;
    font: inherit;
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
    padding: 4px;
  }
</style>
