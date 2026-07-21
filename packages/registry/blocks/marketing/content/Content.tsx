import type { CSSProperties } from 'react'
import { Divider } from '@moderno/react'

export interface ContentSection {
  heading?: string
  body: string[]
}

export interface ContentProps {
  kicker?: string
  title?: string
  subtitle?: string
  sections?: ContentSection[]
}

const DEFAULT_SECTIONS: ContentSection[] = [
  {
    heading: 'Diseñado para crecer con tu producto',
    body: [
      'Moderno empieza como un puñado de primitives accesibles y termina siendo el sistema de diseño completo detrás de tu producto. Los tokens --md-* viven en un solo lugar y se comparten entre React, Vue, Svelte y Solid, así que el look no diverge por framework.',
      'Cada componente está construido sobre Zag.js, lo que significa que el comportamiento — estado, teclado, foco, ARIA — es el mismo sin importar en qué framework lo uses.',
    ],
  },
  {
    heading: 'De prototipo a producción sin reescribir',
    body: [
      'Los primitives se instalan como paquetes npm versionados: los arreglos y mejoras de accesibilidad se propagan al centro sin que tengas que tocar tu código.',
      'Los blocks, en cambio, se copian a tu repo con el CLI del registry. Son tuyos desde el primer commit: edítalos, córtalos, combínalos con tus propios componentes.',
    ],
  },
  {
    heading: 'Una sola fuente de verdad para el contenido',
    body: [
      'Este block existe para secciones de contenido largo: páginas "Acerca de", posts de blog, documentación de producto o cualquier copy que necesite jerarquía tipográfica clara sin salir del sistema de diseño.',
    ],
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
const proseStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  maxWidth: '720px',
  margin: '0 auto',
}
const sectionHeadingStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '22px',
  color: 'var(--md-text-primary)',
  margin: '0 0 12px',
}
const bodyStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-md)',
  lineHeight: 'var(--md-text-body-md-lh)',
  color: 'var(--md-text-secondary)',
  margin: '0 0 12px',
}

/**
 * Moderno block — Content (React). Copy-paste; edit freely.
 * General content/prose section: heading, subtitle, and long-form copy broken into
 * headed sections. Uses the Divider primitive + Moderno tokens.
 */
export function Content({
  kicker = 'Contenido',
  title = 'Escrito para durar, no solo para lanzar',
  subtitle = 'Secciones de contenido largo con jerarquía tipográfica clara, listas para copiar en tu repo.',
  sections = DEFAULT_SECTIONS,
}: ContentProps) {
  return (
    <section style={sectionStyle}>
      <div style={headerStyle}>
        <p style={kickerStyle}>{kicker}</p>
        <h2 style={titleStyle}>{title}</h2>
        <p style={subtitleStyle}>{subtitle}</p>
      </div>
      <div style={proseStyle}>
        {sections.map((section, index) => (
          <div key={section.heading ?? index}>
            {index > 0 ? <Divider /> : null}
            <div style={{ marginTop: index > 0 ? '32px' : 0 }}>
              {section.heading ? <h3 style={sectionHeadingStyle}>{section.heading}</h3> : null}
              {section.body.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex} style={bodyStyle}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
