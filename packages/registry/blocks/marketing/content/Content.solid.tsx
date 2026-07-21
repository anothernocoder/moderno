import { Divider } from '@moderno/solid'
import { For, Show } from 'solid-js'
import type { JSX } from 'solid-js'

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

const proseStyle: JSX.CSSProperties = {
  display: 'flex',
  'flex-direction': 'column',
  gap: '32px',
  'max-width': '720px',
  margin: '0 auto',
}
const sectionHeadingStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '22px',
  color: 'var(--md-text-primary)',
  margin: '0 0 12px',
}
const bodyStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-md)',
  'line-height': 'var(--md-text-body-md-lh)',
  color: 'var(--md-text-secondary)',
  margin: '0 0 12px',
}

/**
 * Moderno block — Content (Solid). Copy-paste; edit freely.
 * General content/prose section: heading, subtitle, and long-form copy broken into headed
 * sections. Uses the Divider primitive + Moderno tokens.
 */
export function Content(props: ContentProps) {
  const kicker = () => props.kicker ?? 'Contenido'
  const title = () => props.title ?? 'Escrito para durar, no solo para lanzar'
  const subtitle = () =>
    props.subtitle ?? 'Secciones de contenido largo con jerarquía tipográfica clara, listas para copiar en tu repo.'
  const sections = () => props.sections ?? DEFAULT_SECTIONS

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
      <div style={proseStyle}>
        <For each={sections()}>
          {(section, index) => (
            <div>
              <Show when={index() > 0}>
                <Divider />
              </Show>
              <div style={{ 'margin-top': index() > 0 ? '32px' : 0 }}>
                <Show when={section.heading}>
                  <h3 style={sectionHeadingStyle}>{section.heading}</h3>
                </Show>
                <For each={section.body}>{(paragraph) => <p style={bodyStyle}>{paragraph}</p>}</For>
              </div>
            </div>
          )}
        </For>
      </div>
    </section>
  )
}
