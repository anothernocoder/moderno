import { For, type JSX } from 'solid-js'
import { Avatar, Badge, Button, Divider } from '@moderno/solid'

export type ListContainerItemStatusVariant = 'neutral' | 'solid' | 'success' | 'warning' | 'error' | 'info'

export interface ListContainerItem {
  id: string
  title: string
  subtitle?: string
  meta?: string
  avatarSrc?: string
  avatarInitials?: string
  status?: string
  statusVariant?: ListContainerItemStatusVariant
}

export interface ListContainersProps {
  title?: string
  description?: string
  items?: ListContainerItem[]
  /** CSS `max-height` for the scrollable body, e.g. `'280px'`. */
  maxBodyHeight?: string
  footerLabel?: string
  onFooterAction?: () => void
}

const DEFAULT_ITEMS: ListContainerItem[] = [
  { id: '1', title: 'Diseñar el flujo de onboarding', subtitle: 'Producto', meta: 'Vence hoy', status: 'En curso', statusVariant: 'info' },
  { id: '2', title: 'Revisar copy de checkout', subtitle: 'Contenido', meta: 'Vence mañana', status: 'Pendiente', statusVariant: 'warning' },
  { id: '3', title: 'Migrar tokens de color', subtitle: 'Diseño', meta: 'Hace 1 d', status: 'Completada', statusVariant: 'success' },
  { id: '4', title: 'Auditoría de accesibilidad', subtitle: 'QA', meta: 'Hace 2 d', status: 'Bloqueada', statusVariant: 'error' },
  { id: '5', title: 'Actualizar guía de marca', subtitle: 'Marketing', meta: 'Hace 3 d', status: 'Completada', statusVariant: 'success' },
  { id: '6', title: 'Preparar demo de release', subtitle: 'Producto', meta: 'Hace 4 d', status: 'En curso', statusVariant: 'info' },
]

const wrapperStyle: JSX.CSSProperties = {
  display: 'flex',
  'flex-direction': 'column',
  background: 'var(--md-surface-base)',
  border: '1px solid var(--md-border-default)',
}
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
const bodyStyle: JSX.CSSProperties = {
  'overflow-y': 'auto',
}
const rowStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  gap: '12px',
  padding: '12px 24px',
}
const textStyle: JSX.CSSProperties = { flex: 1, 'min-width': 0 }
const itemTitleStyle: JSX.CSSProperties = {
  margin: 0,
  'font-size': 'var(--md-text-body-sm)',
  'font-weight': 500,
  color: 'var(--md-text-primary)',
  'white-space': 'nowrap',
  overflow: 'hidden',
  'text-overflow': 'ellipsis',
}
const subtitleStyle: JSX.CSSProperties = {
  margin: 0,
  'font-size': 'var(--md-text-label-sm)',
  color: 'var(--md-text-secondary)',
  'white-space': 'nowrap',
  overflow: 'hidden',
  'text-overflow': 'ellipsis',
}
const metaStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-label-sm)',
  color: 'var(--md-text-secondary)',
  'white-space': 'nowrap',
}
const footerStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'space-between',
  gap: '12px',
  padding: '12px 24px',
  'border-top': '1px solid var(--md-border-default)',
}
const footerMetaStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-label-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}

/**
 * Moderno block — List containers (Solid). Copy-paste; edit freely.
 * A specialized container for lists: a fixed header, a scrollable body (`overflow-y: auto`
 * on a bounded-height wrapper) holding the row items, and a footer with a summary + action.
 * Uses the Avatar + Badge + Button + Divider primitives + Moderno tokens — no bespoke
 * interaction logic, just layout.
 */
export function ListContainers(props: ListContainersProps) {
  const title = () => props.title ?? 'Tareas del sprint'
  const description = () => props.description ?? 'Pendientes del equipo, ordenadas por fecha de vencimiento.'
  const items = () => props.items ?? DEFAULT_ITEMS
  const maxBodyHeight = () => props.maxBodyHeight ?? '280px'
  const footerLabel = () => props.footerLabel ?? 'Ver todas las tareas'

  return (
    <section style={wrapperStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>{title()}</h2>
        {description() ? <p style={descriptionStyle}>{description()}</p> : null}
      </div>
      <div style={{ ...bodyStyle, 'max-height': maxBodyHeight() }}>
        <For each={items()}>
          {(item, index) => (
            <>
              <div style={rowStyle}>
                <Avatar src={item.avatarSrc} initials={item.avatarInitials} alt={item.title} size="md" />
                <div style={textStyle}>
                  <p style={itemTitleStyle}>{item.title}</p>
                  {item.subtitle ? <p style={subtitleStyle}>{item.subtitle}</p> : null}
                </div>
                {item.status ? (
                  <Badge variant={item.statusVariant} dot>
                    {item.status}
                  </Badge>
                ) : null}
                {item.meta ? <span style={metaStyle}>{item.meta}</span> : null}
              </div>
              {index() < items().length - 1 ? <Divider /> : null}
            </>
          )}
        </For>
      </div>
      <div style={footerStyle}>
        <p style={footerMetaStyle}>{items().length} tareas</p>
        <Button variant="secondary" size="sm" onClick={() => props.onFooterAction?.()}>
          {footerLabel()}
        </Button>
      </div>
    </section>
  )
}
