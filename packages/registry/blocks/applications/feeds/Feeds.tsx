import type { CSSProperties } from 'react'
import { Avatar, Badge } from '@moderno/react'

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

const wrapperStyle: CSSProperties = {
  background: 'var(--md-surface-base)',
  border: '1px solid var(--md-border-default)',
  padding: '24px',
}
const listStyle: CSSProperties = { listStyle: 'none', margin: 0, padding: 0 }
const itemStyle: CSSProperties = { display: 'flex', gap: '12px' }
const railStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '28px',
  flexShrink: 0,
}
const lineStyle: CSSProperties = {
  flex: 1,
  width: '2px',
  minHeight: '16px',
  background: 'var(--md-border-default)',
  margin: '4px 0',
}
const contentStyle: CSSProperties = { flex: 1, paddingBottom: '20px' }
const textStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-primary)',
  margin: '0 0 6px',
  lineHeight: 1.4,
}
const metaRowStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px' }
const timeStyle: CSSProperties = { fontSize: 'var(--md-text-label-sm)', color: 'var(--md-text-secondary)' }

/**
 * Moderno block — Feeds (React). Copy-paste; edit freely.
 * Activity feed / timeline: avatar connected by a vertical rail, actor + action text,
 * an optional status tag, and a timestamp. Uses the Avatar + Badge primitives + Moderno tokens.
 */
export function Feeds({ items = DEFAULT_ITEMS }: FeedsProps) {
  return (
    <div style={wrapperStyle}>
      <ul style={listStyle}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.id} style={itemStyle}>
              <div style={railStyle}>
                <Avatar size="sm" initials={item.initials} />
                {!isLast ? <span style={lineStyle} aria-hidden="true" /> : null}
              </div>
              <div style={isLast ? { ...contentStyle, paddingBottom: 0 } : contentStyle}>
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
        })}
      </ul>
    </div>
  )
}
