import { Divider } from '@moderno/solid'
import { For, Show } from 'solid-js'
import type { JSX } from 'solid-js'

export interface FooterLink {
  label: string
  href: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export interface FooterProps {
  logoLabel?: string
  logoHref?: string
  tagline?: string
  columns?: FooterColumn[]
  socialLinks?: FooterLink[]
  legalLinks?: FooterLink[]
  copyright?: string
}

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: 'Producto',
    links: [
      { label: 'Características', href: '#' },
      { label: 'Precios', href: '#' },
      { label: 'Documentación', href: '#' },
    ],
  },
  {
    title: 'Compañía',
    links: [
      { label: 'Sobre nosotros', href: '#' },
      { label: 'Carreras', href: '#' },
      { label: 'Blog', href: '#' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Guías', href: '#' },
      { label: 'Soporte', href: '#' },
      { label: 'Comunidad', href: '#' },
    ],
  },
]

const DEFAULT_SOCIAL_LINKS: FooterLink[] = [
  { label: 'Twitter', href: '#' },
  { label: 'GitHub', href: '#' },
  { label: 'LinkedIn', href: '#' },
]

const DEFAULT_LEGAL_LINKS: FooterLink[] = [
  { label: 'Privacidad', href: '#' },
  { label: 'Términos', href: '#' },
]

const footerStyle: JSX.CSSProperties = {
  padding: '64px 24px 32px',
  background: 'var(--md-surface-base)',
  'border-top': '1px solid var(--md-border-default)',
}
const topRowStyle: JSX.CSSProperties = {
  display: 'flex',
  'flex-wrap': 'wrap',
  gap: '48px',
  'max-width': '1040px',
  margin: '0 auto',
  'padding-bottom': '48px',
}
const brandColStyle: JSX.CSSProperties = { flex: '1 1 240px', 'max-width': '320px' }
const logoStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '20px',
  color: 'var(--md-text-primary)',
  'text-decoration': 'none',
}
const taglineStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: '12px 0 0',
}
const columnsStyle: JSX.CSSProperties = {
  display: 'flex',
  'flex-wrap': 'wrap',
  gap: '32px',
  flex: '2 1 480px',
}
const columnStyle: JSX.CSSProperties = { 'min-width': '140px' }
const columnTitleStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-label-sm)',
  'letter-spacing': '0.06em',
  'text-transform': 'uppercase',
  color: 'var(--md-text-primary)',
  margin: '0 0 16px',
}
const linkListStyle: JSX.CSSProperties = {
  'list-style': 'none',
  display: 'flex',
  'flex-direction': 'column',
  gap: '12px',
  margin: 0,
  padding: 0,
}
const linkStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  'text-decoration': 'none',
}
const bottomRowStyle: JSX.CSSProperties = {
  display: 'flex',
  'flex-wrap': 'wrap',
  'align-items': 'center',
  'justify-content': 'space-between',
  gap: '16px',
  'max-width': '1040px',
  margin: '0 auto',
  'padding-top': '24px',
}
const copyrightStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const legalRowStyle: JSX.CSSProperties = { display: 'flex', gap: '16px', 'flex-wrap': 'wrap' }
const legalLinkStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  'text-decoration': 'none',
}
const socialRowStyle: JSX.CSSProperties = { display: 'flex', gap: '16px', 'flex-wrap': 'wrap' }
const socialLinkStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-primary)',
  'text-decoration': 'none',
}

/**
 * Moderno block — Footer (Solid). Copy-paste; edit freely.
 * Site footer: logo/tagline, navigation link columns, legal links, social links, and copyright.
 * Uses the Divider primitive + Moderno tokens.
 */
export function Footer(props: FooterProps) {
  const logoLabel = () => props.logoLabel ?? 'Moderno'
  const logoHref = () => props.logoHref ?? '#'
  const tagline = () => props.tagline ?? 'Componentes y blocks para construir producto rápido.'
  const columns = () => props.columns ?? DEFAULT_COLUMNS
  const socialLinks = () => props.socialLinks ?? DEFAULT_SOCIAL_LINKS
  const legalLinks = () => props.legalLinks ?? DEFAULT_LEGAL_LINKS
  const copyright = () => props.copyright ?? '© 2026 Moderno. Todos los derechos reservados.'

  return (
    <footer style={footerStyle}>
      <div style={topRowStyle}>
        <div style={brandColStyle}>
          <a href={logoHref()} style={logoStyle}>
            {logoLabel()}
          </a>
          <Show when={tagline()}>
            <p style={taglineStyle}>{tagline()}</p>
          </Show>
        </div>
        <div style={columnsStyle}>
          <For each={columns()}>
            {(column) => (
              <div style={columnStyle}>
                <h3 style={columnTitleStyle}>{column.title}</h3>
                <ul style={linkListStyle}>
                  <For each={column.links}>
                    {(link) => (
                      <li>
                        <a href={link.href} style={linkStyle}>
                          {link.label}
                        </a>
                      </li>
                    )}
                  </For>
                </ul>
              </div>
            )}
          </For>
        </div>
      </div>
      <Divider />
      <div style={bottomRowStyle}>
        <p style={copyrightStyle}>{copyright()}</p>
        <div style={legalRowStyle}>
          <For each={legalLinks()}>
            {(link) => (
              <a href={link.href} style={legalLinkStyle}>
                {link.label}
              </a>
            )}
          </For>
        </div>
        <div style={socialRowStyle}>
          <For each={socialLinks()}>
            {(link) => (
              <a href={link.href} style={socialLinkStyle}>
                {link.label}
              </a>
            )}
          </For>
        </div>
      </div>
    </footer>
  )
}
