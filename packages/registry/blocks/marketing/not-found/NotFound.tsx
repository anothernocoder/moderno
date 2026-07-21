import type { CSSProperties } from 'react'

export interface NotFoundProps {
  code?: string
  title?: string
  description?: string
  homeLabel?: string
  homeHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

const sectionStyle: CSSProperties = {
  padding: '120px 24px',
  textAlign: 'center',
  background: 'var(--md-surface-base)',
}
const codeStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '120px',
  lineHeight: 1,
  letterSpacing: '-0.02em',
  color: 'var(--md-text-primary)',
  margin: '0 0 24px',
}
const titleStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '28px',
  lineHeight: 1.2,
  letterSpacing: '-0.01em',
  color: 'var(--md-text-primary)',
  margin: '0 0 16px',
}
const descriptionStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-lg)',
  lineHeight: 'var(--md-text-body-lg-lh)',
  color: 'var(--md-text-secondary)',
  margin: '0 auto 32px',
  maxWidth: '52ch',
}
const ctaRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  flexWrap: 'wrap',
}
const homeLinkStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '48px',
  padding: '0 32px',
  background: 'var(--md-primary)',
  color: 'var(--md-on-primary)',
  fontSize: 'var(--md-text-body-md)',
  fontWeight: 600,
  borderRadius: 'var(--md-radius-none)',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
}
const secondaryLinkStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '48px',
  padding: '0 32px',
  background: 'transparent',
  color: 'var(--md-text-primary)',
  border: '1px solid var(--md-border-strong)',
  fontSize: 'var(--md-text-body-md)',
  fontWeight: 600,
  borderRadius: 'var(--md-radius-none)',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
}

/**
 * Moderno block — NotFound (React). Copy-paste; edit freely.
 * 404 / error-state marketing section: a big serif numeral, a message, and CTA link(s) back to
 * the site. No illustration asset — purely typographic, like the rest of Moderno's blocks.
 * Uses Moderno tokens (--md-* custom properties) only, no bespoke primitives.
 */
export function NotFound({
  code = '404',
  title = 'Página no encontrada',
  description = 'La página que buscas no existe o fue movida.',
  homeLabel = 'Volver al inicio',
  homeHref = '/',
  secondaryLabel,
  secondaryHref,
}: NotFoundProps) {
  return (
    <section style={sectionStyle}>
      <p style={codeStyle}>{code}</p>
      <h2 style={titleStyle}>{title}</h2>
      <p style={descriptionStyle}>{description}</p>
      <div style={ctaRowStyle}>
        <a href={homeHref} style={homeLinkStyle}>
          {homeLabel}
        </a>
        {secondaryLabel && secondaryHref ? (
          <a href={secondaryHref} style={secondaryLinkStyle}>
            {secondaryLabel}
          </a>
        ) : null}
      </div>
    </section>
  )
}
