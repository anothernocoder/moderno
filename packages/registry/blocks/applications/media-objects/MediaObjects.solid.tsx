import { For, Show, type JSX } from 'solid-js'
import { Avatar } from '@moderno/solid'

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

const wrapperStyle: JSX.CSSProperties = { background: 'var(--md-surface-base)', border: '1px solid var(--md-border-default)' }
const headerStyle: JSX.CSSProperties = { padding: '20px 24px', 'border-bottom': '1px solid var(--md-border-default)' }
const titleStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '20px',
  color: 'var(--md-text-primary)',
  margin: '0 0 4px',
}
const descriptionStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const rowStyle: JSX.CSSProperties = {
  display: 'flex',
  gap: '16px',
  padding: '20px 24px',
  'border-bottom': '1px solid var(--md-border-default)',
}
const lastRowStyle: JSX.CSSProperties = { ...rowStyle, 'border-bottom': 'none' }
const contentStyle: JSX.CSSProperties = { display: 'flex', 'flex-direction': 'column', gap: '4px', flex: 1 }
const headingStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-md)',
  'font-weight': 500,
  color: 'var(--md-text-primary)',
  margin: 0,
}
const bodyStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
  'line-height': 1.5,
}
const metaStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-label-sm)',
  color: 'var(--md-text-secondary)',
  margin: '4px 0 0',
}

/**
 * Moderno block — Media objects (Solid). Copy-paste; edit freely.
 * Media + text layout: a list of rows pairing an Avatar (image or initials fallback) with a
 * heading, body copy and an optional meta line — the classic "media object" pattern for
 * comments, activity, or contact lists. Uses the Avatar primitive + Moderno tokens.
 */
export function MediaObjects(props: MediaObjectsProps) {
  const title = () => props.title ?? 'Comentarios'
  const description = () => props.description ?? 'Retroalimentación reciente del equipo sobre el diseño.'
  const items = () => props.items ?? DEFAULT_ITEMS

  return (
    <section style={wrapperStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>{title()}</h2>
        <Show when={description()}>
          <p style={descriptionStyle}>{description()}</p>
        </Show>
      </div>
      <For each={items()}>
        {(item, index) => (
          <div style={index() === items().length - 1 ? lastRowStyle : rowStyle}>
            <Avatar size="md" src={item.avatarSrc} alt={item.avatarAlt} initials={item.initials} />
            <div style={contentStyle}>
              <p style={headingStyle}>{item.heading}</p>
              <p style={bodyStyle}>{item.body}</p>
              <Show when={item.meta}>
                <p style={metaStyle}>{item.meta}</p>
              </Show>
            </div>
          </div>
        )}
      </For>
    </section>
  )
}
