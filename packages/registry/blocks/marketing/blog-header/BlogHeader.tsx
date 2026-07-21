import type { CSSProperties } from 'react'
import { Chip } from '@moderno/react'

export interface BlogHeaderProps {
  kicker?: string
  title?: string
  subtitle?: string
  categories?: string[]
}

const DEFAULT_CATEGORIES = ['Producto', 'Ingeniería', 'Diseño']

const sectionStyle: CSSProperties = {
  padding: '96px 24px',
  textAlign: 'center',
  background: 'var(--md-surface-base)',
}
const headerStyle: CSSProperties = { margin: '0 auto', maxWidth: '640px' }
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
const categoriesStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '8px',
  marginTop: '24px',
}

/**
 * Moderno block — BlogHeader (React). Copy-paste; edit freely.
 * Index/landing header for a blog: centered kicker/title/subtitle above a row of category chips.
 * Uses the Chip primitive + Moderno tokens.
 */
export function BlogHeader({
  kicker = 'Blog',
  title = 'Ideas, historias y aprendizajes del equipo',
  subtitle = 'Reflexiones sobre diseño, ingeniería y producto, directo desde quienes construyen Moderno.',
  categories = DEFAULT_CATEGORIES,
}: BlogHeaderProps) {
  return (
    <section style={sectionStyle}>
      <div style={headerStyle}>
        <p style={kickerStyle}>{kicker}</p>
        <h1 style={titleStyle}>{title}</h1>
        <p style={subtitleStyle}>{subtitle}</p>
      </div>
      <div style={categoriesStyle}>
        {categories.map((category) => (
          <Chip key={category}>{category}</Chip>
        ))}
      </div>
    </section>
  )
}
