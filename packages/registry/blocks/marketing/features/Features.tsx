import type { CSSProperties } from 'react'
import { Card } from '@moderno/react'

export interface FeatureItem {
  icon?: string
  title: string
  description: string
}

export interface FeaturesProps {
  kicker?: string
  title?: string
  subtitle?: string
  features?: FeatureItem[]
}

const DEFAULT_FEATURES: FeatureItem[] = [
  { icon: '🎨', title: 'Un solo look', description: 'Tokens --md-* compartidos entre React, Vue, Svelte y Solid.' },
  {
    icon: '⚙️',
    title: 'Un solo comportamiento',
    description: 'Zag.js maneja estado e interacción bajo el capó, sin reescribir lógica por framework.',
  },
  {
    icon: '🧩',
    title: 'Primitives versionados',
    description: 'Componentes npm que se actualizan solos; los arreglos se propagan al centro.',
  },
  {
    icon: '📦',
    title: 'Blocks copy-paste',
    description: 'Composiciones de layout que copias a tu repo y editas libremente.',
  },
  {
    icon: '♿',
    title: 'Accesible por defecto',
    description: 'Construido sobre primitives con soporte ARIA y navegación por teclado.',
  },
  {
    icon: '🚀',
    title: 'Listo para producción',
    description: 'La misma API en los cuatro frameworks, desde el prototipo hasta producción.',
  },
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
const gridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '24px',
  maxWidth: '1040px',
  margin: '0 auto',
}
const iconStyle: CSSProperties = {
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  background: 'var(--md-surface-muted)',
  border: '1px solid var(--md-border-default)',
}
const featureTitleStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '20px',
  color: 'var(--md-text-primary)',
  margin: 0,
}
const featureDescriptionStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  lineHeight: 'var(--md-text-body-sm-lh)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}

/**
 * Moderno block — Features (React). Copy-paste; edit freely.
 * Feature highlight grid: icon, title, and description per item. Uses the Card primitive + Moderno tokens.
 */
export function Features({
  kicker = 'Características',
  title = 'Todo lo que necesitas para construir rápido',
  subtitle = 'Primitives, blocks y tokens que funcionan igual en los cuatro frameworks.',
  features = DEFAULT_FEATURES,
}: FeaturesProps) {
  return (
    <section style={sectionStyle}>
      <div style={headerStyle}>
        <p style={kickerStyle}>{kicker}</p>
        <h2 style={titleStyle}>{title}</h2>
        <p style={subtitleStyle}>{subtitle}</p>
      </div>
      <div style={gridStyle}>
        {features.map((feature) => (
          <Card key={feature.title}>
            {feature.icon ? <div style={iconStyle}>{feature.icon}</div> : null}
            <h3 style={featureTitleStyle}>{feature.title}</h3>
            <p style={featureDescriptionStyle}>{feature.description}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
