import { Fragment, type CSSProperties } from 'react'
import { Avatar, Badge, Button, Divider } from '@moderno/react'

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

const wrapperStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  background: 'var(--md-surface-base)',
  border: '1px solid var(--md-border-default)',
}
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
const bodyStyle: CSSProperties = {
  overflowY: 'auto',
}
const rowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 24px',
}
const textStyle: CSSProperties = { flex: 1, minWidth: 0 }
const itemTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: 'var(--md-text-body-sm)',
  fontWeight: 500,
  color: 'var(--md-text-primary)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}
const subtitleStyle: CSSProperties = {
  margin: 0,
  fontSize: 'var(--md-text-label-sm)',
  color: 'var(--md-text-secondary)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}
const metaStyle: CSSProperties = {
  fontSize: 'var(--md-text-label-sm)',
  color: 'var(--md-text-secondary)',
  whiteSpace: 'nowrap',
}
const footerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  padding: '12px 24px',
  borderTop: '1px solid var(--md-border-default)',
}
const footerMetaStyle: CSSProperties = {
  fontSize: 'var(--md-text-label-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}

/**
 * Moderno block — List containers (React). Copy-paste; edit freely.
 * A specialized container for lists: a fixed header, a scrollable body (`overflow-y: auto`
 * on a bounded-height wrapper) holding the row items, and a footer with a summary + action.
 * Uses the Avatar + Badge + Button + Divider primitives + Moderno tokens — no bespoke
 * interaction logic, just layout.
 */
export function ListContainers({
  title = 'Tareas del sprint',
  description = 'Pendientes del equipo, ordenadas por fecha de vencimiento.',
  items = DEFAULT_ITEMS,
  maxBodyHeight = '280px',
  footerLabel = 'Ver todas las tareas',
  onFooterAction,
}: ListContainersProps) {
  return (
    <section style={wrapperStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>{title}</h2>
        {description ? <p style={descriptionStyle}>{description}</p> : null}
      </div>
      <div style={{ ...bodyStyle, maxHeight: maxBodyHeight }}>
        {items.map((item, index) => (
          <Fragment key={item.id}>
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
            {index < items.length - 1 ? <Divider /> : null}
          </Fragment>
        ))}
      </div>
      <div style={footerStyle}>
        <p style={footerMetaStyle}>{items.length} tareas</p>
        <Button variant="secondary" size="sm" onClick={onFooterAction}>
          {footerLabel}
        </Button>
      </div>
    </section>
  )
}
