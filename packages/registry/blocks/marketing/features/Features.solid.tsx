import { Card } from '@moderno/solid'
import { For, Show } from 'solid-js'
import type { JSX } from 'solid-js'

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

const iconStyle: JSX.CSSProperties = {
  width: '40px',
  height: '40px',
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'center',
  'font-size': '20px',
  background: 'var(--md-surface-muted)',
  border: '1px solid var(--md-border-default)',
}
const featureTitleStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '20px',
  color: 'var(--md-text-primary)',
  margin: 0,
}
const featureDescriptionStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  'line-height': 'var(--md-text-body-sm-lh)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}

/**
 * Moderno block — Features (Solid). Copy-paste; edit freely.
 * Feature highlight grid: icon, title, and description per item. Uses the Card primitive + Moderno tokens.
 */
export function Features(props: FeaturesProps) {
  const kicker = () => props.kicker ?? 'Características'
  const title = () => props.title ?? 'Todo lo que necesitas para construir rápido'
  const subtitle = () =>
    props.subtitle ?? 'Primitives, blocks y tokens que funcionan igual en los cuatro frameworks.'
  const features = () => props.features ?? DEFAULT_FEATURES

  return (
    <section style={{ padding: '96px 24px', background: 'var(--md-surface-base)' }}>
      <div style={{ 'text-align': 'center', margin: '0 auto 56px', 'max-width': '640px' }}>
        <p
          style={{
            'font-size': 'var(--md-text-label-sm)',
            'letter-spacing': '0.14em',
            'text-transform': 'uppercase',
            color: 'var(--md-text-secondary)',
            margin: '0 0 16px',
          }}
        >
          {kicker()}
        </p>
        <h2
          style={{
            'font-family': 'var(--md-font-serif)',
            'font-size': '36px',
            'line-height': 1.1,
            'letter-spacing': '-0.02em',
            color: 'var(--md-text-primary)',
            margin: '0 0 16px',
          }}
        >
          {title()}
        </h2>
        <p
          style={{
            'font-size': 'var(--md-text-body-lg)',
            'line-height': 'var(--md-text-body-lg-lh)',
            color: 'var(--md-text-secondary)',
            margin: 0,
          }}
        >
          {subtitle()}
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          'grid-template-columns': 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
          'max-width': '1040px',
          margin: '0 auto',
        }}
      >
        <For each={features()}>
          {(feature) => (
            <Card>
              <Show when={feature.icon}>
                <div style={iconStyle}>{feature.icon}</div>
              </Show>
              <h3 style={featureTitleStyle}>{feature.title}</h3>
              <p style={featureDescriptionStyle}>{feature.description}</p>
            </Card>
          )}
        </For>
      </div>
    </section>
  )
}
