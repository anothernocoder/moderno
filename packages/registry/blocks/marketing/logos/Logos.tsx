import type { CSSProperties } from 'react'

export interface LogoItem {
  name: string
  src?: string
  href?: string
}

export interface LogosProps {
  kicker?: string
  items?: LogoItem[]
}

const DEFAULT_LOGOS: LogoItem[] = [
  { name: 'Nimbus' },
  { name: 'Kairos' },
  { name: 'Vela' },
  { name: 'Orbit' },
  { name: 'Halcyon' },
  { name: 'Fenwick' },
]

const sectionStyle: CSSProperties = { padding: '96px 24px', background: 'var(--md-surface-base)' }
const kickerStyle: CSSProperties = {
  fontSize: 'var(--md-text-label-sm)',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--md-text-secondary)',
  textAlign: 'center',
  margin: '0 auto 40px',
}
const rowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '48px',
  maxWidth: '960px',
  margin: '0 auto',
}
const imgStyle: CSSProperties = { filter: 'grayscale(1)', opacity: 0.6, height: '28px' }
const wordmarkStyle: CSSProperties = {
  color: 'var(--md-text-secondary)',
  fontWeight: 600,
  letterSpacing: '0.02em',
  fontSize: 'var(--md-text-label-md)',
  textTransform: 'uppercase',
}

/**
 * Moderno block — Logos (React). Copy-paste; edit freely.
 * Trusted-by section: small centered kicker above a wrapped, centered row of partner/customer logos.
 * Uses plain composition + Moderno tokens (--md-* custom properties), no primitives.
 */
export function Logos({
  kicker = 'Con la confianza de equipos de todos los tamaños',
  items = DEFAULT_LOGOS,
}: LogosProps) {
  return (
    <section style={sectionStyle}>
      <p style={kickerStyle}>{kicker}</p>
      <div style={rowStyle}>
        {items.map((item) => {
          const content = item.src ? (
            <img src={item.src} alt={item.name} style={imgStyle} />
          ) : (
            <span style={wordmarkStyle}>{item.name}</span>
          )
          return item.href ? (
            <a key={item.name} href={item.href}>
              {content}
            </a>
          ) : (
            <span key={item.name}>{content}</span>
          )
        })}
      </div>
    </section>
  )
}
