<script lang="ts">
  // Moderno block — StoreNav (Svelte). Copy-paste; edit freely.
  // E-commerce storefront header navigation: logo, category links, a search field,
  // and a cart icon with an item-count badge. Uses the Badge + Input primitives +
  // Moderno tokens.
  import { Badge, Input } from '@moderno/svelte'

  export interface StoreNavCategory {
    label: string
    href: string
  }

  const DEFAULT_CATEGORIES: StoreNavCategory[] = [
    { label: 'Nuevo', href: '#' },
    { label: 'Mujer', href: '#' },
    { label: 'Hombre', href: '#' },
    { label: 'Ofertas', href: '#' },
  ]

  let {
    logoLabel = 'Moderno Store',
    logoHref = '#',
    categories = DEFAULT_CATEGORIES,
    searchPlaceholder = 'Buscar productos...',
    defaultSearchQuery = '',
    onSearch,
    cartCount = 3,
    onCartClick,
  }: {
    logoLabel?: string
    logoHref?: string
    categories?: StoreNavCategory[]
    searchPlaceholder?: string
    defaultSearchQuery?: string
    onSearch?: (query: string) => void
    cartCount?: number
    onCartClick?: () => void
  } = $props()

  let query = $state(defaultSearchQuery)

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    onSearch?.(query)
  }
</script>

<header class="md-store-nav">
  <div class="md-store-nav__row">
    <a href={logoHref} class="md-store-nav__logo">{logoLabel}</a>
    <nav class="md-store-nav__nav" aria-label="Categorías">
      {#each categories as category (category.label)}
        <a href={category.href} class="md-store-nav__nav-link">{category.label}</a>
      {/each}
    </nav>
    <div class="md-store-nav__actions">
      <form class="md-store-nav__search" role="search" onsubmit={handleSubmit}>
        <Input type="search" aria-label="Buscar productos" placeholder={searchPlaceholder} bind:value={query} />
      </form>
      <button
        type="button"
        class="md-store-nav__cart"
        aria-label={`Carrito, ${cartCount} artículos`}
        onclick={onCartClick}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h3l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        {#if cartCount > 0}
          <span class="md-store-nav__cart-badge">
            <Badge variant="solid">{cartCount}</Badge>
          </span>
        {/if}
      </button>
    </div>
  </div>
</header>

<style>
  .md-store-nav {
    background: var(--md-surface-base);
    border-bottom: 1px solid var(--md-border-default);
  }
  .md-store-nav__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    max-width: 1040px;
    margin: 0 auto;
    padding: 16px 24px;
  }
  .md-store-nav__logo {
    font-family: var(--md-font-serif);
    font-size: 20px;
    color: var(--md-text-primary);
    text-decoration: none;
  }
  .md-store-nav__nav {
    display: flex;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;
  }
  .md-store-nav__nav-link {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
    text-decoration: none;
    white-space: nowrap;
  }
  .md-store-nav__actions {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .md-store-nav__search {
    min-width: 160px;
  }
  .md-store-nav__cart {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    background: none;
    border: none;
    color: var(--md-text-primary);
    cursor: pointer;
  }
  .md-store-nav__cart-badge {
    position: absolute;
    top: -6px;
    right: -6px;
  }
</style>
