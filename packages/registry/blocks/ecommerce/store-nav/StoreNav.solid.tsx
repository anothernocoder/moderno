import { createSignal, For, Show, type JSX } from 'solid-js'
import { Badge, Input } from '@moderno/solid'

export interface StoreNavCategory {
  label: string
  href: string
}

export interface StoreNavProps {
  logoLabel?: string
  logoHref?: string
  categories?: StoreNavCategory[]
  searchPlaceholder?: string
  defaultSearchQuery?: string
  onSearch?: (query: string) => void
  cartCount?: number
  onCartClick?: () => void
}

const DEFAULT_CATEGORIES: StoreNavCategory[] = [
  { label: 'Nuevo', href: '#' },
  { label: 'Mujer', href: '#' },
  { label: 'Hombre', href: '#' },
  { label: 'Ofertas', href: '#' },
]

const headerStyle: JSX.CSSProperties = {
  background: 'var(--md-surface-base)',
  'border-bottom': '1px solid var(--md-border-default)',
}
const rowStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'space-between',
  'flex-wrap': 'wrap',
  gap: '16px',
  'max-width': '1040px',
  margin: '0 auto',
  padding: '16px 24px',
}
const logoStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '20px',
  color: 'var(--md-text-primary)',
  'text-decoration': 'none',
}
const navStyle: JSX.CSSProperties = { display: 'flex', 'align-items': 'center', gap: '24px', 'flex-wrap': 'wrap' }
const navLinkStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  'text-decoration': 'none',
  'white-space': 'nowrap',
}
const actionsStyle: JSX.CSSProperties = { display: 'flex', 'align-items': 'center', gap: '16px' }
const searchFormStyle: JSX.CSSProperties = { 'min-width': '160px' }
const cartButtonStyle: JSX.CSSProperties = {
  position: 'relative',
  display: 'inline-flex',
  'align-items': 'center',
  'justify-content': 'center',
  padding: '6px',
  background: 'none',
  border: 'none',
  color: 'var(--md-text-primary)',
  cursor: 'pointer',
}
const cartBadgeStyle: JSX.CSSProperties = { position: 'absolute', top: '-6px', right: '-6px' }

/**
 * Moderno block — StoreNav (Solid). Copy-paste; edit freely.
 * E-commerce storefront header navigation: logo, category links, a search field,
 * and a cart icon with an item-count badge. Uses the Badge + Input primitives +
 * Moderno tokens.
 */
export function StoreNav(props: StoreNavProps) {
  const logoLabel = () => props.logoLabel ?? 'Moderno Store'
  const logoHref = () => props.logoHref ?? '#'
  const categories = () => props.categories ?? DEFAULT_CATEGORIES
  const searchPlaceholder = () => props.searchPlaceholder ?? 'Buscar productos...'
  const cartCount = () => props.cartCount ?? 3

  const [query, setQuery] = createSignal(props.defaultSearchQuery ?? '')

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    props.onSearch?.(query())
  }

  return (
    <header style={headerStyle}>
      <div style={rowStyle}>
        <a href={logoHref()} style={logoStyle}>
          {logoLabel()}
        </a>
        <nav style={navStyle} aria-label="Categorías">
          <For each={categories()}>
            {(category) => (
              <a href={category.href} style={navLinkStyle}>
                {category.label}
              </a>
            )}
          </For>
        </nav>
        <div style={actionsStyle}>
          <form style={searchFormStyle} role="search" onSubmit={handleSubmit}>
            <Input
              type="search"
              aria-label="Buscar productos"
              placeholder={searchPlaceholder()}
              value={query()}
              onInput={(event) => setQuery(event.currentTarget.value)}
            />
          </form>
          <button
            type="button"
            style={cartButtonStyle}
            aria-label={`Carrito, ${cartCount()} artículos`}
            onClick={() => props.onCartClick?.()}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h3l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <Show when={cartCount() > 0}>
              <span style={cartBadgeStyle}>
                <Badge variant="solid">{cartCount()}</Badge>
              </span>
            </Show>
          </button>
        </div>
      </div>
    </header>
  )
}
