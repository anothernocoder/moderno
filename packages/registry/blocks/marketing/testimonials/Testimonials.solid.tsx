import { For, Show, type JSX } from 'solid-js'
import { Avatar, Card } from '@moderno/solid'

export interface TestimonialItem {
  quote: string
  name: string
  role?: string
  avatarSrc?: string
  initials?: string
}

export interface TestimonialsProps {
  kicker?: string
  title?: string
  subtitle?: string
  items?: TestimonialItem[]
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      'Moderno nos permitió lanzar el rediseño completo en dos semanas, sin reescribir la lógica de interacción por framework.',
    name: 'Marta Gómez',
    role: 'Head of Design, Nimbus',
    initials: 'MG',
  },
  {
    quote:
      'La misma API en React, Vue, Svelte y Solid nos dejó compartir un solo design system entre equipos con stacks distintos.',
    name: 'Carlos Peña',
    role: 'Frontend Lead, Kairos',
    initials: 'CP',
  },
  {
    quote: 'Los tokens --md-* hicieron trivial tematizar toda la app sin tocar un solo componente.',
    name: 'Sofía Iglesias',
    role: 'Product Engineer, Vela',
    initials: 'SI',
  },
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
const gridStyle: JSX.CSSProperties = {
  display: 'grid',
  'grid-template-columns': 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '24px',
  'max-width': '1040px',
  margin: '0 auto',
}
const quoteStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-md)',
  'line-height': 'var(--md-text-body-md-lh)',
  color: 'var(--md-text-primary)',
  margin: 0,
}
const authorRowStyle: JSX.CSSProperties = { display: 'flex', 'align-items': 'center', gap: '12px' }
const authorNameStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-label-md)',
  'font-weight': 600,
  color: 'var(--md-text-primary)',
  margin: 0,
}
const authorRoleStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}

/**
 * Moderno block — Testimonials (Solid). Copy-paste; edit freely.
 * Social proof section: centered header above a grid of customer quotes with author and avatar.
 * Uses the Card + Avatar primitives + Moderno tokens.
 */
export function Testimonials(props: TestimonialsProps) {
  const kicker = () => props.kicker ?? 'Testimonios'
  const title = () => props.title ?? 'Lo que dicen nuestros clientes'
  const subtitle = () => props.subtitle ?? 'Equipos de todos los tamaños construyen con Moderno.'
  const items = () => props.items ?? DEFAULT_TESTIMONIALS

  return (
    <section style={sectionStyle}>
      <div style={headerStyle}>
        <p style={kickerStyle}>{kicker()}</p>
        <h2 style={titleStyle}>{title()}</h2>
        <p style={subtitleStyle}>{subtitle()}</p>
      </div>
      <div style={gridStyle}>
        <For each={items()}>
          {(item) => (
            <Card
              footer={
                <div style={authorRowStyle}>
                  <Avatar src={item.avatarSrc} initials={item.initials} alt={item.name} size="sm" />
                  <div>
                    <p style={authorNameStyle}>{item.name}</p>
                    <Show when={item.role}>
                      <p style={authorRoleStyle}>{item.role}</p>
                    </Show>
                  </div>
                </div>
              }
            >
              <p style={quoteStyle}>&ldquo;{item.quote}&rdquo;</p>
            </Card>
          )}
        </For>
      </div>
    </section>
  )
}
