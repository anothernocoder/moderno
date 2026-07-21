<script lang="ts">
  // Moderno block — Banner (Svelte). Copy-paste; edit freely.
  // Dismissible top-of-page promo/announcement strip. Uses the Button primitive + Moderno tokens.
  import { Button } from '@moderno/svelte'

  let {
    message = 'Lanzamos blocks para React, Vue, Svelte y Solid — mismo look, cualquier framework.',
    ctaLabel = 'Ver blocks',
    ctaHref,
    onCtaClick,
    dismissible = true,
    onDismiss,
    closeLabel = 'Cerrar',
  }: {
    message?: string
    ctaLabel?: string
    ctaHref?: string
    onCtaClick?: () => void
    dismissible?: boolean
    onDismiss?: () => void
    closeLabel?: string
  } = $props()

  let dismissed = $state(false)

  function handleDismiss() {
    dismissed = true
    onDismiss?.()
  }
</script>

{#if !dismissed}
  <div class="md-banner">
    <div class="md-banner__row">
      <p class="md-banner__message">{message}</p>
      {#if ctaLabel && ctaHref}
        <a href={ctaHref} class="md-banner__cta-link">{ctaLabel}</a>
      {:else if ctaLabel}
        <Button
          label={ctaLabel}
          size="sm"
          variant="secondary"
          style="border-color: var(--md-on-primary); color: var(--md-on-primary)"
          onclick={onCtaClick}
        />
      {/if}
    </div>
    {#if dismissible}
      <button type="button" class="md-banner__close" aria-label={closeLabel} onclick={handleDismiss}>
        ×
      </button>
    {/if}
  </div>
{/if}

<style>
  .md-banner {
    position: relative;
    background: var(--md-primary);
    color: var(--md-on-primary);
  }
  .md-banner__row {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
    max-width: 1040px;
    margin: 0 auto;
    padding: 12px 56px;
  }
  .md-banner__message {
    margin: 0;
    font-size: var(--md-text-body-sm);
    line-height: var(--md-text-body-sm-lh);
    text-align: center;
  }
  .md-banner__cta-link {
    color: inherit;
    font-weight: 600;
    text-decoration: underline;
    white-space: nowrap;
  }
  .md-banner__close {
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
