<script lang="ts">
  // Moderno block — NotFound (Svelte). Copy-paste; edit freely.
  // 404 / error-state marketing section: a big serif numeral, a message, and CTA link(s) back to
  // the site. No illustration asset — purely typographic, like the rest of Moderno's blocks.
  // Uses Moderno tokens (--md-* custom properties) only, no bespoke primitives.

  let {
    code = '404',
    title = 'Página no encontrada',
    description = 'La página que buscas no existe o fue movida.',
    homeLabel = 'Volver al inicio',
    homeHref = '/',
    secondaryLabel,
    secondaryHref,
  }: {
    code?: string
    title?: string
    description?: string
    homeLabel?: string
    homeHref?: string
    secondaryLabel?: string
    secondaryHref?: string
  } = $props()
</script>

<section class="md-not-found">
  <p class="md-not-found__code">{code}</p>
  <h2 class="md-not-found__title">{title}</h2>
  <p class="md-not-found__description">{description}</p>
  <div class="md-not-found__cta-row">
    <a href={homeHref} class="md-not-found__home-link">{homeLabel}</a>
    {#if secondaryLabel && secondaryHref}
      <a href={secondaryHref} class="md-not-found__secondary-link">{secondaryLabel}</a>
    {/if}
  </div>
</section>

<style>
  .md-not-found {
    padding: 120px 24px;
    text-align: center;
    background: var(--md-surface-base);
  }
  .md-not-found__code {
    font-family: var(--md-font-serif);
    font-size: 120px;
    line-height: 1;
    letter-spacing: -0.02em;
    color: var(--md-text-primary);
    margin: 0 0 24px;
  }
  .md-not-found__title {
    font-family: var(--md-font-serif);
    font-size: 28px;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: var(--md-text-primary);
    margin: 0 0 16px;
  }
  .md-not-found__description {
    font-size: var(--md-text-body-lg);
    line-height: var(--md-text-body-lg-lh);
    color: var(--md-text-secondary);
    margin: 0 auto 32px;
    max-width: 52ch;
  }
  .md-not-found__cta-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
  }
  .md-not-found__home-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 0 32px;
    background: var(--md-primary);
    color: var(--md-on-primary);
    font-size: var(--md-text-body-md);
    font-weight: 600;
    border-radius: var(--md-radius-none);
    text-decoration: none;
    white-space: nowrap;
  }
  .md-not-found__secondary-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 0 32px;
    background: transparent;
    color: var(--md-text-primary);
    border: 1px solid var(--md-border-strong);
    font-size: var(--md-text-body-md);
    font-weight: 600;
    border-radius: var(--md-radius-none);
    text-decoration: none;
    white-space: nowrap;
  }
</style>
