import { Show } from 'solid-js'
import type { JSX } from 'solid-js'

export interface NotFoundProps {
  code?: string
  title?: string
  description?: string
  homeLabel?: string
  homeHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

const sectionStyle: JSX.CSSProperties = {
  padding: '120px 24px',
  'text-align': 'center',
  background: 'var(--md-surface-base)',
}
const codeStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '120px',
  'line-height': 1,
  'letter-spacing': '-0.02em',
  color: 'var(--md-text-primary)',
  margin: '0 0 24px',
}
const titleStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '28px',
  'line-height': 1.2,
  'letter-spacing': '-0.01em',
  color: 'var(--md-text-primary)',
  margin: '0 0 16px',
}
const descriptionStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-lg)',
  'line-height': 'var(--md-text-body-lg-lh)',
  color: 'var(--md-text-secondary)',
  margin: '0 auto 32px',
  'max-width': '52ch',
}
const ctaRowStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'center',
  gap: '16px',
  'flex-wrap': 'wrap',
}
const homeLinkStyle: JSX.CSSProperties = {
  display: 'inline-flex',
  'align-items': 'center',
  'justify-content': 'center',
  height: '48px',
  padding: '0 32px',
  background: 'var(--md-primary)',
  color: 'var(--md-on-primary)',
  'font-size': 'var(--md-text-body-md)',
  'font-weight': 600,
  'border-radius': 'var(--md-radius-none)',
  'text-decoration': 'none',
  'white-space': 'nowrap',
}
const secondaryLinkStyle: JSX.CSSProperties = {
  display: 'inline-flex',
  'align-items': 'center',
  'justify-content': 'center',
  height: '48px',
  padding: '0 32px',
  background: 'transparent',
  color: 'var(--md-text-primary)',
  border: '1px solid var(--md-border-strong)',
  'font-size': 'var(--md-text-body-md)',
  'font-weight': 600,
  'border-radius': 'var(--md-radius-none)',
  'text-decoration': 'none',
  'white-space': 'nowrap',
}

/**
 * Moderno block — NotFound (Solid). Copy-paste; edit freely.
 * 404 / error-state marketing section: a big serif numeral, a message, and CTA link(s) back to
 * the site. No illustration asset — purely typographic, like the rest of Moderno's blocks.
 * Uses Moderno tokens (--md-* custom properties) only, no bespoke primitives.
 */
export function NotFound(props: NotFoundProps) {
  const code = () => props.code ?? '404'
  const title = () => props.title ?? 'Página no encontrada'
  const description = () => props.description ?? 'La página que buscas no existe o fue movida.'
  const homeLabel = () => props.homeLabel ?? 'Volver al inicio'
  const homeHref = () => props.homeHref ?? '/'

  return (
    <section style={sectionStyle}>
      <p style={codeStyle}>{code()}</p>
      <h2 style={titleStyle}>{title()}</h2>
      <p style={descriptionStyle}>{description()}</p>
      <div style={ctaRowStyle}>
        <a href={homeHref()} style={homeLinkStyle}>
          {homeLabel()}
        </a>
        <Show when={props.secondaryLabel && props.secondaryHref}>
          <a href={props.secondaryHref} style={secondaryLinkStyle}>
            {props.secondaryLabel}
          </a>
        </Show>
      </div>
    </section>
  )
}
