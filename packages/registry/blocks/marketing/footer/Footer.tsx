import type { CSSProperties } from 'react'
import { Divider } from '@moderno/react'

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

const footerStyle: CSSProperties = {
  padding: '64px 24px 32px',
  background: 'var(--md-surface-base)',
  borderTop: '1px solid var(--md-border-default)',
}
const topRowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '48px',
  maxWidth: '1040px',
  margin: '0 auto',
  paddingBottom: '48px',
}
const brandColStyle: CSSProperties = { flex: '1 1 240px', maxWidth: '320px' }
const logoStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '20px',
  color: 'var(--md-text-primary)',
  textDecoration: 'none',
}
const taglineStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: '12px 0 0',
}
const columnsStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '32px',
  flex: '2 1 480px',
}
const columnStyle: CSSProperties = { minWidth: '140px' }
const columnTitleStyle: CSSProperties = {
  fontSize: 'var(--md-text-label-sm)',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--md-text-primary)',
  margin: '0 0 16px',
}
const linkListStyle: CSSProperties = {
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  margin: 0,
  padding: 0,
}
const linkStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  textDecoration: 'none',
}
const bottomRowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
  maxWidth: '1040px',
  margin: '0 auto',
  paddingTop: '24px',
}
const copyrightStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const legalRowStyle: CSSProperties = { display: 'flex', gap: '16px', flexWrap: 'wrap' }
const legalLinkStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  textDecoration: 'none',
}
const socialRowStyle: CSSProperties = { display: 'flex', gap: '16px', flexWrap: 'wrap' }
const socialLinkStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-primary)',
  textDecoration: 'none',
}

/**
 * Moderno block — Footer (React). Copy-paste; edit freely.
 * Site footer: logo/tagline, navigation link columns, legal links, social links, and copyright.
 * Uses the Divider primitive + Moderno tokens.
 */
export function Footer({
  logoLabel = 'Moderno',
  logoHref = '#',
  tagline = 'Componentes y blocks para construir producto rápido.',
  columns = DEFAULT_COLUMNS,
  socialLinks = DEFAULT_SOCIAL_LINKS,
  legalLinks = DEFAULT_LEGAL_LINKS,
  copyright = '© 2026 Moderno. Todos los derechos reservados.',
}: FooterProps) {
  return (
    <footer style={footerStyle}>
      <div style={topRowStyle}>
        <div style={brandColStyle}>
          <a href={logoHref} style={logoStyle}>
            {logoLabel}
          </a>
          {tagline ? <p style={taglineStyle}>{tagline}</p> : null}
        </div>
        <div style={columnsStyle}>
          {columns.map((column) => (
            <div key={column.title} style={columnStyle}>
              <h3 style={columnTitleStyle}>{column.title}</h3>
              <ul style={linkListStyle}>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} style={linkStyle}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <Divider />
      <div style={bottomRowStyle}>
        <p style={copyrightStyle}>{copyright}</p>
        <div style={legalRowStyle}>
          {legalLinks.map((link) => (
            <a key={link.label} href={link.href} style={legalLinkStyle}>
              {link.label}
            </a>
          ))}
        </div>
        <div style={socialRowStyle}>
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} style={socialLinkStyle}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
