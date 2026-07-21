<script lang="ts">
  // Moderno block — Header (Svelte). Copy-paste; edit freely.
  // Site header / marketing navigation: logo, nav links, and CTA button(s) in a top bar. Uses the Button primitive + Moderno tokens.
  import { Button } from '@moderno/svelte'

  interface HeaderNavItem {
    label: string
    href: string
  }

  const DEFAULT_NAV_ITEMS: HeaderNavItem[] = [
    { label: 'Producto', href: '#' },
    { label: 'Precios', href: '#' },
    { label: 'Documentación', href: '#' },
  ]

  let {
    logoLabel = 'Moderno',
    logoHref = '#',
    navItems = DEFAULT_NAV_ITEMS,
    secondaryLabel = 'Iniciar sesión',
    secondaryHref = '#',
    ctaLabel = 'Empezar ahora',
    ctaHref,
    onCtaClick,
  }: {
    logoLabel?: string
    logoHref?: string
    navItems?: HeaderNavItem[]
    secondaryLabel?: string
    secondaryHref?: string
    ctaLabel?: string
    ctaHref?: string
    onCtaClick?: () => void
  } = $props()
</script>

<header class="md-header">
  <div class="md-header__row">
    <a href={logoHref} class="md-header__logo">{logoLabel}</a>
    <nav class="md-header__nav">
      {#each navItems as item (item.label)}
        <a href={item.href} class="md-header__nav-link">{item.label}</a>
      {/each}
    </nav>
    <div class="md-header__actions">
      {#if secondaryLabel}
        <a href={secondaryHref} class="md-header__secondary-link">{secondaryLabel}</a>
      {/if}
      {#if ctaLabel && ctaHref}
        <a href={ctaHref} class="md-header__cta-link">{ctaLabel}</a>
      {:else if ctaLabel}
        <Button label={ctaLabel} size="sm" onclick={onCtaClick} />
      {/if}
    </div>
  </div>
</header>

<style>
  .md-header {
    background: var(--md-surface-base);
    border-bottom: 1px solid var(--md-border-default);
  }
  .md-header__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    max-width: 1040px;
    margin: 0 auto;
    padding: 16px 24px;
  }
  .md-header__logo {
    font-family: var(--md-font-serif);
    font-size: 20px;
    color: var(--md-text-primary);
    text-decoration: none;
  }
  .md-header__nav {
    display: flex;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;
  }
  .md-header__nav-link {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
    text-decoration: none;
    white-space: nowrap;
  }
  .md-header__actions {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .md-header__secondary-link {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
    text-decoration: none;
    white-space: nowrap;
  }
  .md-header__cta-link {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-primary);
    font-weight: 600;
    text-decoration: underline;
    white-space: nowrap;
  }
</style>
