import { For, type JSX } from 'solid-js'
import { Chip } from '@moderno/solid'

export interface BlogHeaderProps {
  kicker?: string
  title?: string
  subtitle?: string
  categories?: string[]
}

const DEFAULT_CATEGORIES = ['Producto', 'Ingeniería', 'Diseño']

const sectionStyle: JSX.CSSProperties = {
  padding: '96px 24px',
  'text-align': 'center',
  background: 'var(--md-surface-base)',
}
const headerStyle: JSX.CSSProperties = { margin: '0 auto', 'max-width': '640px' }
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
const categoriesStyle: JSX.CSSProperties = {
  display: 'flex',
  'flex-wrap': 'wrap',
  'justify-content': 'center',
  gap: '8px',
  'margin-top': '24px',
}

/**
 * Moderno block — BlogHeader (Solid). Copy-paste; edit freely.
 * Index/landing header for a blog: centered kicker/title/subtitle above a row of category chips.
 * Uses the Chip primitive + Moderno tokens.
 */
export function BlogHeader(props: BlogHeaderProps) {
  const kicker = () => props.kicker ?? 'Blog'
  const title = () => props.title ?? 'Ideas, historias y aprendizajes del equipo'
  const subtitle = () =>
    props.subtitle ?? 'Reflexiones sobre diseño, ingeniería y producto, directo desde quienes construyen Moderno.'
  const categories = () => props.categories ?? DEFAULT_CATEGORIES

  return (
    <section style={sectionStyle}>
      <div style={headerStyle}>
        <p style={kickerStyle}>{kicker()}</p>
        <h1 style={titleStyle}>{title()}</h1>
        <p style={subtitleStyle}>{subtitle()}</p>
      </div>
      <div style={categoriesStyle}>
        <For each={categories()}>{(category) => <Chip>{category}</Chip>}</For>
      </div>
    </section>
  )
}
