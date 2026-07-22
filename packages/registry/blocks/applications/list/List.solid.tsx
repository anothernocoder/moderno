import { For, Show, type JSX } from 'solid-js'
import { Avatar, Badge, Button, Divider } from '@moderno/solid'

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

const wrapperStyle: JSX.CSSProperties = {
  background: 'var(--md-surface-base)',
  border: '1px solid var(--md-border-default)',
}
const rowStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  gap: '12px',
  padding: '12px 16px',
}
const textStyle: JSX.CSSProperties = {
  flex: 1,
  'min-width': 0,
}
const titleStyle: JSX.CSSProperties = {
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

/**
 * Moderno block — List (Solid). Copy-paste; edit freely.
 * Application record list: avatar, primary/secondary text, status badge, meta and a row
 * action — without Table's sorting, multi-select, or tabular columns. Uses the Avatar +
 * Badge + Button + Divider primitives + Moderno tokens.
 */
export function List(props: ListProps) {
  const items = () => props.items ?? DEFAULT_ITEMS

  return (
    <div style={wrapperStyle}>
      <For each={items()}>
        {(item, index) => (
          <>
            <div style={rowStyle}>
              <Avatar src={item.avatarSrc} initials={item.avatarInitials} alt={item.title} size="md" />
              <div style={textStyle}>
                <p style={titleStyle}>{item.title}</p>
                <Show when={item.subtitle}>
                  <p style={subtitleStyle}>{item.subtitle}</p>
                </Show>
              </div>
              <Show when={item.status}>
                <Badge variant={item.statusVariant} dot>
                  {item.status}
                </Badge>
              </Show>
              <Show when={item.meta}>
                <span style={metaStyle}>{item.meta}</span>
              </Show>
              <Button variant="secondary" size="sm" aria-label={`Acciones de ${item.title}`} onClick={() => props.onItemAction?.(item)}>
                ⋯
              </Button>
            </div>
            <Show when={index() < items().length - 1}>
              <Divider />
            </Show>
          </>
        )}
      </For>
    </div>
  )
}
