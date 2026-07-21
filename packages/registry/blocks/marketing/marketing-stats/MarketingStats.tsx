import type { CSSProperties } from 'react'

export interface StatItem {
  value: string
  label: string
}

export interface MarketingStatsProps {
  kicker?: string
  title?: string
  subtitle?: string
  items?: StatItem[]
}

const DEFAULT_ITEMS: StatItem[] = [
  { value: '4', label: 'Frameworks soportados' },
  { value: '30+', label: 'Componentes' },
  { value: '100%', label: 'Tokens compartidos' },
  { value: '0', label: 'Dependencias de UI extra' },
]

const sectionStyle: CSSProperties = { padding: '96px 24px', background: 'var(--md-surface-base)' }
const headerStyle: CSSProperties = { textAlign: 'center', margin: '0 auto 56px', maxWidth: '640px' }
const kickerStyle: CSSProperties = {
  fontSize: 'var(--md-text-label-sm)',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--md-text-secondary)',
  margin: '0 0 16px',
}
const titleStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '36px',
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  color: 'var(--md-text-primary)',
  margin: '0 0 16px',
}
const subtitleStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-lg)',
  lineHeight: 'var(--md-text-body-lg-lh)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const rowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '48px',
  maxWidth: '960px',
  margin: '0 auto',
}
const itemStyle: CSSProperties = { textAlign: 'center' }
const valueStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '52px',
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  color: 'var(--md-text-primary)',
  margin: '0 0 8px',
}
const labelStyle: CSSProperties = {
  fontSize: 'var(--md-text-label-sm)',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--md-text-secondary)',
  margin: 0,
}

/**
 * Moderno block — MarketingStats (React). Copy-paste; edit freely.
 * Marketing brag row: centered header above a row of big serif numbers with uppercase labels.
 * Distinct from the applications `Stats` block (no Card/Badge, editorial rather than dashboard).
 * Uses Moderno tokens only — no primitives.
 */
export function MarketingStats({
  kicker = 'En números',
  title = 'El impacto de Moderno',
  subtitle = 'Un solo design system, cuatro frameworks, resultados medibles.',
  items = DEFAULT_ITEMS,
}: MarketingStatsProps) {
  return (
    <section style={sectionStyle}>
      <div style={headerStyle}>
        <p style={kickerStyle}>{kicker}</p>
        <h2 style={titleStyle}>{title}</h2>
        <p style={subtitleStyle}>{subtitle}</p>
      </div>
      <div style={rowStyle}>
        {items.map((item) => (
          <div key={item.label} style={itemStyle}>
            <p style={valueStyle}>{item.value}</p>
            <p style={labelStyle}>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
