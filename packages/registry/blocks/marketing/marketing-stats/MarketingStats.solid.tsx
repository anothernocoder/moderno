import { For, type JSX } from 'solid-js'

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

const sectionStyle: JSX.CSSProperties = { padding: '96px 24px', background: 'var(--md-surface-base)' }
const headerStyle: JSX.CSSProperties = { 'text-align': 'center', margin: '0 auto 56px', 'max-width': '640px' }
const kickerStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-label-sm)',
  'letter-spacing': '0.14em',
  'text-transform': 'uppercase',
  color: 'var(--md-text-secondary)',
  margin: '0 0 16px',
}
const titleStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '36px',
  'line-height': 1.1,
  'letter-spacing': '-0.02em',
  color: 'var(--md-text-primary)',
  margin: '0 0 16px',
}
const subtitleStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-lg)',
  'line-height': 'var(--md-text-body-lg-lh)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const rowStyle: JSX.CSSProperties = {
  display: 'flex',
  'flex-wrap': 'wrap',
  'justify-content': 'center',
  gap: '48px',
  'max-width': '960px',
  margin: '0 auto',
}
const itemStyle: JSX.CSSProperties = { 'text-align': 'center' }
const valueStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '52px',
  'line-height': 1.1,
  'letter-spacing': '-0.02em',
  color: 'var(--md-text-primary)',
  margin: '0 0 8px',
}
const labelStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-label-sm)',
  'letter-spacing': '0.08em',
  'text-transform': 'uppercase',
  color: 'var(--md-text-secondary)',
  margin: 0,
}

/**
 * Moderno block — MarketingStats (Solid). Copy-paste; edit freely.
 * Marketing brag row: centered header above a row of big serif numbers with uppercase labels.
 * Distinct from the applications `Stats` block (no Card/Badge, editorial rather than dashboard).
 * Uses Moderno tokens only — no primitives.
 */
export function MarketingStats(props: MarketingStatsProps) {
  const kicker = () => props.kicker ?? 'En números'
  const title = () => props.title ?? 'El impacto de Moderno'
  const subtitle = () => props.subtitle ?? 'Un solo design system, cuatro frameworks, resultados medibles.'
  const items = () => props.items ?? DEFAULT_ITEMS

  return (
    <section style={sectionStyle}>
      <div style={headerStyle}>
        <p style={kickerStyle}>{kicker()}</p>
        <h2 style={titleStyle}>{title()}</h2>
        <p style={subtitleStyle}>{subtitle()}</p>
      </div>
      <div style={rowStyle}>
        <For each={items()}>
          {(item) => (
            <div style={itemStyle}>
              <p style={valueStyle}>{item.value}</p>
              <p style={labelStyle}>{item.label}</p>
            </div>
          )}
        </For>
      </div>
    </section>
  )
}
