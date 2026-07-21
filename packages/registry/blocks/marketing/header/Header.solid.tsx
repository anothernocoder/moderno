import { For, Show } from 'solid-js'
import type { JSX } from 'solid-js'
import { Button } from '@moderno/solid'

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
const navStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  gap: '24px',
  'flex-wrap': 'wrap',
}
const navLinkStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  'text-decoration': 'none',
  'white-space': 'nowrap',
}
const actionsStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  gap: '16px',
}
const secondaryLinkStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  'text-decoration': 'none',
  'white-space': 'nowrap',
}
const ctaLinkStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-primary)',
  'font-weight': 600,
  'text-decoration': 'underline',
  'white-space': 'nowrap',
}

/**
 * Moderno block — Header (Solid). Copy-paste; edit freely.
 * Site header / marketing navigation: logo, nav links, and CTA button(s) in a top bar. Uses the Button primitive + Moderno tokens.
 */
export function Header(props: HeaderProps) {
  const logoLabel = () => props.logoLabel ?? 'Moderno'
  const logoHref = () => props.logoHref ?? '#'
  const navItems = () => props.navItems ?? DEFAULT_NAV_ITEMS
  const secondaryLabel = () => props.secondaryLabel ?? 'Iniciar sesión'
  const secondaryHref = () => props.secondaryHref ?? '#'
  const ctaLabel = () => props.ctaLabel ?? 'Empezar ahora'

  return (
    <header style={headerStyle}>
      <div style={rowStyle}>
        <a href={logoHref()} style={logoStyle}>
          {logoLabel()}
        </a>
        <nav style={navStyle}>
          <For each={navItems()}>
            {(item) => (
              <a href={item.href} style={navLinkStyle}>
                {item.label}
              </a>
            )}
          </For>
        </nav>
        <div style={actionsStyle}>
          <Show when={secondaryLabel()}>
            <a href={secondaryHref()} style={secondaryLinkStyle}>
              {secondaryLabel()}
            </a>
          </Show>
          <Show when={ctaLabel()}>
            <Show
              when={props.ctaHref}
              fallback={<Button label={ctaLabel()} size="sm" onClick={props.onCtaClick} />}
            >
              <a href={props.ctaHref} style={ctaLinkStyle}>
                {ctaLabel()}
              </a>
            </Show>
          </Show>
        </div>
      </div>
    </header>
  )
}
