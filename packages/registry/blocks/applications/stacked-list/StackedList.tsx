import type { CSSProperties } from 'react'
import { Avatar, Badge, Button, Card } from '@moderno/react'

export type StackedListStatusVariant = 'neutral' | 'solid' | 'success' | 'warning' | 'error' | 'info'

export interface StackedListItem {
  id: string
  title: string
  subtitle?: string
  avatarInitials?: string
  avatarSrc?: string
  status?: string
  statusVariant?: StackedListStatusVariant
  meta?: string
}

export interface StackedListProps {
  items?: StackedListItem[]
  onItemAction?: (item: StackedListItem) => void
}

const DEFAULT_ITEMS: StackedListItem[] = [
  {
    id: 'TCK-482',
    title: 'No se puede exportar el reporte mensual',
    subtitle: 'Marina Ortiz · Soporte técnico',
    avatarInitials: 'MO',
    status: 'Abierto',
    statusVariant: 'warning',
    meta: 'Hace 12 min',
  },
  {
    id: 'TCK-481',
    title: 'Solicita cambio de plan a Enterprise',
    subtitle: 'Diego Salazar · Facturación',
    avatarInitials: 'DS',
    status: 'Resuelto',
    statusVariant: 'success',
    meta: 'Hace 1 h',
  },
  {
    id: 'TCK-480',
    title: 'Error al iniciar sesión con SSO',
    subtitle: 'Priya Nair · Seguridad',
    avatarInitials: 'PN',
    status: 'Escalado',
    statusVariant: 'error',
    meta: 'Hace 3 h',
  },
]

const listStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '24px',
  background: 'var(--md-surface-base)',
}
const rowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
}
const bodyStyle: CSSProperties = {
  flex: '1 1 auto',
  minWidth: 0,
}
const titleStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-md)',
  fontWeight: 500,
  color: 'var(--md-text-primary)',
  margin: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}
const subtitleStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: '2px 0 0',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}
const trailingStyle: CSSProperties = {
  flex: '0 0 auto',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
}
const metaStyle: CSSProperties = {
  fontSize: 'var(--md-text-label-sm)',
  color: 'var(--md-text-secondary)',
  whiteSpace: 'nowrap',
}

/**
 * Moderno block — StackedList (React). Copy-paste; edit freely.
 * Vertically stacked list of records, each rendered as its own card with an
 * avatar, primary/secondary text, a status badge, meta, and a row action.
 * Uses the Card + Avatar + Badge + Button primitives + Moderno tokens.
 */
export function StackedList({ items = DEFAULT_ITEMS, onItemAction }: StackedListProps) {
  return (
    <div style={listStyle}>
      {items.map((item) => (
        <Card key={item.id}>
          <div style={rowStyle}>
            <Avatar initials={item.avatarInitials} src={item.avatarSrc} alt={item.title} />
            <div style={bodyStyle}>
              <p style={titleStyle}>{item.title}</p>
              {item.subtitle ? <p style={subtitleStyle}>{item.subtitle}</p> : null}
            </div>
            <div style={trailingStyle}>
              {item.status ? (
                <Badge variant={item.statusVariant} dot>
                  {item.status}
                </Badge>
              ) : null}
              {item.meta ? <span style={metaStyle}>{item.meta}</span> : null}
              <Button
                variant="secondary"
                size="sm"
                aria-label={`Acciones de ${item.title}`}
                onClick={() => onItemAction?.(item)}
              >
                ⋯
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
