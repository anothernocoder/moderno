import { useState, type CSSProperties, type FormEvent } from 'react'
import { Badge, Input } from '@moderno/react'

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

const headerStyle: CSSProperties = {
  background: 'var(--md-surface-base)',
  borderBottom: '1px solid var(--md-border-default)',
}
const rowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '16px',
  maxWidth: '1040px',
  margin: '0 auto',
  padding: '16px 24px',
}
const logoStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '20px',
  color: 'var(--md-text-primary)',
  textDecoration: 'none',
}
const navStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  flexWrap: 'wrap',
}
const navLinkStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
}
const actionsStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
}
const searchFormStyle: CSSProperties = { minWidth: '160px' }
const cartButtonStyle: CSSProperties = {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '6px',
  background: 'none',
  border: 'none',
  color: 'var(--md-text-primary)',
  cursor: 'pointer',
}
const cartBadgeStyle: CSSProperties = {
  position: 'absolute',
  top: '-6px',
  right: '-6px',
}

/**
 * Moderno block — StoreNav (React). Copy-paste; edit freely.
 * E-commerce storefront header navigation: logo, category links, a search field,
 * and a cart icon with an item-count badge. Uses the Badge + Input primitives +
 * Moderno tokens.
 */
export function StoreNav({
  logoLabel = 'Moderno Store',
  logoHref = '#',
  categories = DEFAULT_CATEGORIES,
  searchPlaceholder = 'Buscar productos...',
  defaultSearchQuery = '',
  onSearch,
  cartCount = 3,
  onCartClick,
}: StoreNavProps) {
  const [query, setQuery] = useState(defaultSearchQuery)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSearch?.(query)
  }

  return (
    <header style={headerStyle}>
      <div style={rowStyle}>
        <a href={logoHref} style={logoStyle}>
          {logoLabel}
        </a>
        <nav style={navStyle} aria-label="Categorías">
          {categories.map((category) => (
            <a key={category.label} href={category.href} style={navLinkStyle}>
              {category.label}
            </a>
          ))}
        </nav>
        <div style={actionsStyle}>
          <form style={searchFormStyle} role="search" onSubmit={handleSubmit}>
            <Input
              type="search"
              aria-label="Buscar productos"
              placeholder={searchPlaceholder}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </form>
          <button
            type="button"
            style={cartButtonStyle}
            aria-label={`Carrito, ${cartCount} artículos`}
            onClick={onCartClick}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h3l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 ? (
              <span style={cartBadgeStyle}>
                <Badge variant="solid">{cartCount}</Badge>
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </header>
  )
}
