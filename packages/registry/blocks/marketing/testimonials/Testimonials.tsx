import type { CSSProperties } from 'react'
import { Avatar, Card } from '@moderno/react'

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
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '24px',
  maxWidth: '1040px',
  margin: '0 auto',
}
const quoteStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-md)',
  lineHeight: 'var(--md-text-body-md-lh)',
  color: 'var(--md-text-primary)',
  margin: 0,
}
const authorRowStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: '12px' }
const authorNameStyle: CSSProperties = {
  fontSize: 'var(--md-text-label-md)',
  fontWeight: 600,
  color: 'var(--md-text-primary)',
  margin: 0,
}
const authorRoleStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}

/**
 * Moderno block — Testimonials (React). Copy-paste; edit freely.
 * Social proof section: centered header above a grid of customer quotes with author and avatar.
 * Uses the Card + Avatar primitives + Moderno tokens.
 */
export function Testimonials({
  kicker = 'Testimonios',
  title = 'Lo que dicen nuestros clientes',
  subtitle = 'Equipos de todos los tamaños construyen con Moderno.',
  items = DEFAULT_TESTIMONIALS,
}: TestimonialsProps) {
  return (
    <section style={sectionStyle}>
      <div style={headerStyle}>
        <p style={kickerStyle}>{kicker}</p>
        <h2 style={titleStyle}>{title}</h2>
        <p style={subtitleStyle}>{subtitle}</p>
      </div>
      <div style={gridStyle}>
        {items.map((item) => (
          <Card
            key={item.name}
            footer={
              <div style={authorRowStyle}>
                <Avatar src={item.avatarSrc} initials={item.initials} alt={item.name} size="sm" />
                <div>
                  <p style={authorNameStyle}>{item.name}</p>
                  {item.role ? <p style={authorRoleStyle}>{item.role}</p> : null}
                </div>
              </div>
            }
          >
            <p style={quoteStyle}>&ldquo;{item.quote}&rdquo;</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
