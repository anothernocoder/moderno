import type { CSSProperties } from 'react'
import { Button } from '@moderno/react'

export interface HeaderNavItem {
  label: string
  href: string
}

export interface HeaderProps {
  logoLabel?: string
  logoHref?: string
  navItems?: HeaderNavItem[]
  secondaryLabel?: string
  secondaryHref?: string
  ctaLabel?: string
  ctaHref?: string
  onCtaClick?: () => void
}

const DEFAULT_NAV_ITEMS: HeaderNavItem[] = [
  { label: 'Producto', href: '#' },
  { label: 'Precios', href: '#' },
  { label: 'Documentación', href: '#' },
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
const secondaryLinkStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
}
const ctaLinkStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-primary)',
  fontWeight: 600,
  textDecoration: 'underline',
  whiteSpace: 'nowrap',
}

/**
 * Moderno block — Header (React). Copy-paste; edit freely.
 * Site header / marketing navigation: logo, nav links, and CTA button(s) in a top bar. Uses the Button primitive + Moderno tokens.
 */
export function Header({
  logoLabel = 'Moderno',
  logoHref = '#',
  navItems = DEFAULT_NAV_ITEMS,
  secondaryLabel = 'Iniciar sesión',
  secondaryHref = '#',
  ctaLabel = 'Empezar ahora',
  ctaHref,
  onCtaClick,
}: HeaderProps) {
  return (
    <header style={headerStyle}>
      <div style={rowStyle}>
        <a href={logoHref} style={logoStyle}>
          {logoLabel}
        </a>
        <nav style={navStyle}>
          {navItems.map((item) => (
            <a key={item.label} href={item.href} style={navLinkStyle}>
              {item.label}
            </a>
          ))}
        </nav>
        <div style={actionsStyle}>
          {secondaryLabel ? (
            <a href={secondaryHref} style={secondaryLinkStyle}>
              {secondaryLabel}
            </a>
          ) : null}
          {ctaLabel ? (
            ctaHref ? (
              <a href={ctaHref} style={ctaLinkStyle}>
                {ctaLabel}
              </a>
            ) : (
              <Button label={ctaLabel} size="sm" onClick={onCtaClick} />
            )
          ) : null}
        </div>
      </div>
    </header>
  )
}
