import { Fragment, type CSSProperties } from 'react'
import { Avatar, Badge, Button, Divider } from '@moderno/react'

export type ListItemStatusVariant = 'neutral' | 'solid' | 'success' | 'warning' | 'error' | 'info'

export interface ListItem {
  id: string
  title: string
  subtitle?: string
  meta?: string
  avatarSrc?: string
  avatarInitials?: string
  status?: string
  statusVariant?: ListItemStatusVariant
}

export interface ListProps {
  items?: ListItem[]
  onItemAction?: (item: ListItem) => void
}

const DEFAULT_ITEMS: ListItem[] = [
  { id: '1', title: 'Bruno Café', subtitle: 'bruno@brunocafe.co', avatarInitials: 'BC', status: 'Activo', statusVariant: 'success', meta: 'Hace 2 h' },
  { id: '2', title: 'Verde Logística', subtitle: 'contacto@verdelog.com', avatarInitials: 'VL', status: 'Pendiente', statusVariant: 'warning', meta: 'Hace 1 d' },
  { id: '3', title: 'Kapital Foods', subtitle: 'hola@kapitalfoods.com', avatarInitials: 'KF', status: 'Inactivo', statusVariant: 'neutral', meta: 'Hace 5 d' },
  { id: '4', title: 'Norte Distribución', subtitle: 'ventas@nortedist.com', avatarInitials: 'ND', status: 'Activo', statusVariant: 'success', meta: 'Hace 3 h' },
]

const wrapperStyle: CSSProperties = {
  background: 'var(--md-surface-base)',
  border: '1px solid var(--md-border-default)',
}
const rowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 16px',
}
const textStyle: CSSProperties = {
  flex: 1,
  minWidth: 0,
}
const titleStyle: CSSProperties = {
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

/**
 * Moderno block — List (React). Copy-paste; edit freely.
 * Application record list: avatar, primary/secondary text, status badge, meta and a row
 * action — without Table's sorting, multi-select, or tabular columns. Uses the Avatar +
 * Badge + Button + Divider primitives + Moderno tokens.
 */
export function List({ items = DEFAULT_ITEMS, onItemAction }: ListProps) {
  return (
    <div style={wrapperStyle}>
      {items.map((item, index) => (
        <Fragment key={item.id}>
          <div style={rowStyle}>
            <Avatar src={item.avatarSrc} initials={item.avatarInitials} alt={item.title} size="md" />
            <div style={textStyle}>
              <p style={titleStyle}>{item.title}</p>
              {item.subtitle ? <p style={subtitleStyle}>{item.subtitle}</p> : null}
            </div>
            {item.status ? (
              <Badge variant={item.statusVariant} dot>
                {item.status}
              </Badge>
            ) : null}
            {item.meta ? <span style={metaStyle}>{item.meta}</span> : null}
            <Button variant="secondary" size="sm" aria-label={`Acciones de ${item.title}`} onClick={() => onItemAction?.(item)}>
              ⋯
            </Button>
          </div>
          {index < items.length - 1 ? <Divider /> : null}
        </Fragment>
      ))}
    </div>
  )
}
