<script lang="ts">
  // Moderno block — Cta (Svelte). Copy-paste; edit freely.
  // A focused headline + CTA button section — no kicker, no subtitle-as-secondary-emphasis.
  // Uses the Button primitive + Moderno tokens (--md-* custom properties).
  import { Button } from '@moderno/svelte'

  let {
    title = '¿Listo para construir con Moderno?',
    description = 'Copia el block, instala el primitive y personaliza los tokens a tu gusto.',
    ctaLabel = 'Empezar ahora',
    onCta,
    secondaryLabel,
    onSecondary,
  }: {
    title?: string
    description?: string
    ctaLabel?: string
    onCta?: () => void
    secondaryLabel?: string
    onSecondary?: () => void
  } = $props()
</script>

<section class="md-cta">
  <h2 class="md-cta__title">{title}</h2>
  {#if description}<p class="md-cta__description">{description}</p>{/if}
  <div class="md-cta__actions">
    <Button variant="primary" size="lg" label={ctaLabel} onclick={() => onCta?.()} />
    {#if secondaryLabel}
      <Button variant="secondary" size="lg" label={secondaryLabel} onclick={() => onSecondary?.()} />
    {/if}
  </div>
</section>

<style>
  .md-cta {
    padding: 96px 24px;
    text-align: center;
    background: var(--md-surface-raised);
    border-radius: var(--md-radius-none);
  }
  .md-cta__title {
    font-family: var(--md-font-serif);
    font-size: 40px;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--md-text-primary);
    margin: 0 auto 16px;
    max-width: 18ch;
  }
  .md-cta__description {
    font-size: var(--md-text-body-lg);
    line-height: var(--md-text-body-lg-lh);
    color: var(--md-text-secondary);
    margin: 0 auto 32px;
    max-width: 52ch;
  }
  .md-cta__actions {
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
  }
</style>
