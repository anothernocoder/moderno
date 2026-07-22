import { For } from 'solid-js'
import type { JSX } from 'solid-js'
import { Avatar, Badge } from '@moderno/solid'

export type FeedTagVariant = 'neutral' | 'solid' | 'success' | 'warning' | 'error' | 'info'

export interface FeedItem {
  id: string
  actor: string
  initials: string
  action: string
  timestamp: string
  tag?: string
  tagVariant?: FeedTagVariant
}

export interface FeedsProps {
  items?: FeedItem[]
}

const DEFAULT_ITEMS: FeedItem[] = [
  {
    id: '1',
    actor: 'Bruno Café',
    initials: 'BC',
    action: 'actualizó el estado del pedido PED-1104 a',
    tag: 'Despachado',
    tagVariant: 'success',
    timestamp: 'Hace 5 min',
  },
  {
    id: '2',
    actor: 'Verde Logística',
    initials: 'VL',
    action: 'agregó una nota al pedido PED-1103',
    timestamp: 'Hace 32 min',
  },
  {
    id: '3',
    actor: 'Kapital Foods',
    initials: 'KF',
    action: 'creó el pedido PED-1102',
    tag: 'Nuevo',
    tagVariant: 'info',
    timestamp: 'Hace 2 h',
  },
  {
    id: '4',
    actor: 'Sistema',
    initials: 'SI',
    action: 'canceló el pedido PED-1101 por falta de pago',
    tag: 'Cancelado',
    tagVariant: 'error',
    timestamp: 'Ayer',
  },
]

const wrapperStyle: JSX.CSSProperties = {
  background: 'var(--md-surface-base)',
  border: '1px solid var(--md-border-default)',
  padding: '24px',
}
const listStyle: JSX.CSSProperties = { 'list-style': 'none', margin: 0, padding: 0 }
const itemStyle: JSX.CSSProperties = { display: 'flex', gap: '12px' }
const railStyle: JSX.CSSProperties = {
  display: 'flex',
  'flex-direction': 'column',
  'align-items': 'center',
  width: '28px',
  'flex-shrink': 0,
}
const lineStyle: JSX.CSSProperties = {
  flex: 1,
  width: '2px',
  'min-height': '16px',
  background: 'var(--md-border-default)',
  margin: '4px 0',
}
const contentStyle: JSX.CSSProperties = { flex: 1, 'padding-bottom': '20px' }
const contentLastStyle: JSX.CSSProperties = { ...contentStyle, 'padding-bottom': 0 }
const textStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-primary)',
  margin: '0 0 6px',
  'line-height': 1.4,
}
const metaRowStyle: JSX.CSSProperties = { display: 'flex', 'align-items': 'center', gap: '8px' }
const timeStyle: JSX.CSSProperties = { 'font-size': 'var(--md-text-label-sm)', color: 'var(--md-text-secondary)' }

/**
 * Moderno block — Feeds (Solid). Copy-paste; edit freely.
 * Activity feed / timeline: avatar connected by a vertical rail, actor + action text,
 * an optional status tag, and a timestamp. Uses the Avatar + Badge primitives + Moderno tokens.
 */
export function Feeds(props: FeedsProps) {
  const items = () => props.items ?? DEFAULT_ITEMS

  return (
    <div style={wrapperStyle}>
      <ul style={listStyle}>
        <For each={items()}>
          {(item, index) => {
            const isLast = () => index() === items().length - 1
            return (
              <li style={itemStyle}>
                <div style={railStyle}>
                  <Avatar size="sm" initials={item.initials} />
                  {!isLast() ? <span style={lineStyle} aria-hidden="true" /> : null}
                </div>
                <div style={isLast() ? contentLastStyle : contentStyle}>
                  <p style={textStyle}>
                    <strong>{item.actor}</strong> {item.action}
                  </p>
                  <div style={metaRowStyle}>
                    {item.tag ? (
                      <Badge variant={item.tagVariant} dot>
                        {item.tag}
                      </Badge>
                    ) : null}
                    <span style={timeStyle}>{item.timestamp}</span>
                  </div>
                </div>
              </li>
            )
          }}
        </For>
      </ul>
    </div>
  )
}
