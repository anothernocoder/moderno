import type { CSSProperties } from 'react'
import { Avatar } from '@moderno/react'

export interface MediaObjectItem {
  id: string
  heading: string
  body: string
  meta?: string
  avatarSrc?: string
  avatarAlt?: string
  initials: string
}

export interface MediaObjectsProps {
  title?: string
  description?: string
  items?: MediaObjectItem[]
}

const DEFAULT_ITEMS: MediaObjectItem[] = [
  {
    id: 'valentina-rios',
    heading: 'Valentina Ríos',
    body: 'El nuevo flujo de checkout se ve mucho más claro. ¿Podemos aplicar el mismo patrón en el panel de pedidos?',
    meta: 'Hace 10 min',
    initials: 'VR',
  },
  {
    id: 'mateo-fernandez',
    heading: 'Mateo Fernández',
    body: 'Buen trabajo con los estados vacíos. Sugiero agregar un ícono ilustrativo para reforzar el mensaje.',
    meta: 'Hace 1 h',
    initials: 'MF',
  },
  {
    id: 'sofia-castillo',
    heading: 'Sofía Castillo',
    body: 'Aprobado. Podemos pasar este componente a producción esta semana.',
    meta: 'Ayer',
    initials: 'SC',
  },
]

const wrapperStyle: CSSProperties = { background: 'var(--md-surface-base)', border: '1px solid var(--md-border-default)' }
const headerStyle: CSSProperties = { padding: '20px 24px', borderBottom: '1px solid var(--md-border-default)' }
const titleStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '20px',
  color: 'var(--md-text-primary)',
  margin: '0 0 4px',
}
const descriptionStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const rowStyle: CSSProperties = {
  display: 'flex',
  gap: '16px',
  padding: '20px 24px',
  borderBottom: '1px solid var(--md-border-default)',
}
const lastRowStyle: CSSProperties = { ...rowStyle, borderBottom: 'none' }
const contentStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }
const headingStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-md)',
  fontWeight: 500,
  color: 'var(--md-text-primary)',
  margin: 0,
}
const bodyStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
  lineHeight: 1.5,
}
const metaStyle: CSSProperties = {
  fontSize: 'var(--md-text-label-sm)',
  color: 'var(--md-text-secondary)',
  margin: '4px 0 0',
}

/**
 * Moderno block — Media objects (React). Copy-paste; edit freely.
 * Media + text layout: a list of rows pairing an `Avatar` (image or initials fallback) with a
 * heading, body copy and an optional meta line — the classic "media object" pattern for
 * comments, activity, or contact lists. Uses the Avatar primitive + Moderno tokens.
 */
export function MediaObjects({
  title = 'Comentarios',
  description = 'Retroalimentación reciente del equipo sobre el diseño.',
  items = DEFAULT_ITEMS,
}: MediaObjectsProps) {
  return (
    <section style={wrapperStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>{title}</h2>
        {description ? <p style={descriptionStyle}>{description}</p> : null}
      </div>
      {items.map((item, index) => (
        <div key={item.id} style={index === items.length - 1 ? lastRowStyle : rowStyle}>
          <Avatar size="md" src={item.avatarSrc} alt={item.avatarAlt} initials={item.initials} />
          <div style={contentStyle}>
            <p style={headingStyle}>{item.heading}</p>
            <p style={bodyStyle}>{item.body}</p>
            {item.meta ? <p style={metaStyle}>{item.meta}</p> : null}
          </div>
        </div>
      ))}
    </section>
  )
}
