import { Card, Badge } from '@moderno/solid'
import { For } from 'solid-js'
import type { JSX } from 'solid-js'

export interface StatItem {
  label: string
  value: string
  delta?: string
  trend?: 'up' | 'down'
}

export interface StatsProps {
  items?: StatItem[]
}

const DEFAULT_ITEMS: StatItem[] = [
  { label: 'Ingresos', value: '$48.2k', delta: '+12.4%', trend: 'up' },
  { label: 'Clientes activos', value: '1,294', delta: '+3.1%', trend: 'up' },
  { label: 'Cancelaciones', value: '38', delta: '-0.8%', trend: 'down' },
  { label: 'Ticket promedio', value: '$37', delta: '+1.9%', trend: 'up' },
]

/**
 * Moderno block — Stats (Solid). Copy-paste; edit freely.
 * KPI metric row. Uses the Card + Badge primitives + Moderno tokens.
 */
export function Stats(props: StatsProps) {
  const sectionStyle: JSX.CSSProperties = {
    display: 'grid',
    'grid-template-columns': 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    padding: '24px',
    background: 'var(--md-surface-base)',
  }
  return (
    <section style={sectionStyle}>
      <For each={props.items ?? DEFAULT_ITEMS}>
        {(item) => (
          <Card>
            <p
              style={{
                'font-size': 'var(--md-text-label-md)',
                'letter-spacing': '0.08em',
                'text-transform': 'uppercase',
                color: 'var(--md-text-secondary)',
                margin: '0 0 8px',
              }}
            >
              {item.label}
            </p>
            <p
              style={{
                'font-family': 'var(--md-font-serif)',
                'font-size': '32px',
                'line-height': 1.1,
                'letter-spacing': '-0.02em',
                color: 'var(--md-text-primary)',
                margin: '0 0 12px',
              }}
            >
              {item.value}
            </p>
            {item.delta ? (
              <Badge variant={item.trend === 'down' ? 'error' : 'success'} dot>
                {item.delta}
              </Badge>
            ) : null}
          </Card>
        )}
      </For>
    </section>
  )
}
