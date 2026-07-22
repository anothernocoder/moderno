import { Card, Badge } from '@moderno/solid'
import { For } from 'solid-js'
import type { JSX } from 'solid-js'

export interface KpiCardItem {
  label: string
  value: string
  helpText?: string
  delta?: string
  trend?: 'up' | 'down'
}

export interface KpiCardsProps {
  items?: KpiCardItem[]
}

const DEFAULT_ITEMS: KpiCardItem[] = [
  {
    label: 'Ingresos recurrentes',
    value: '$128.4k',
    helpText: 'vs. mes anterior',
    delta: '+8.2%',
    trend: 'up',
  },
  {
    label: 'Usuarios activos',
    value: '24,891',
    helpText: 'vs. mes anterior',
    delta: '+4.6%',
    trend: 'up',
  },
  {
    label: 'Tasa de cancelación',
    value: '2.3%',
    helpText: 'vs. mes anterior',
    delta: '-0.4%',
    trend: 'down',
  },
]

/**
 * Moderno block — KpiCards (Solid). Copy-paste; edit freely.
 * Primary metric cards with a trend indicator. Single-metric counterpart to
 * the Stats row block. Uses the Card + Badge primitives + Moderno tokens.
 */
export function KpiCards(props: KpiCardsProps) {
  const sectionStyle: JSX.CSSProperties = {
    display: 'grid',
    'grid-template-columns': 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
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
                'font-size': '40px',
                'line-height': 1.1,
                'letter-spacing': '-0.02em',
                color: 'var(--md-text-primary)',
                margin: '0 0 12px',
              }}
            >
              {item.value}
            </p>
            {item.delta || item.helpText ? (
              <div style={{ display: 'flex', 'align-items': 'center', gap: '8px' }}>
                {item.delta ? (
                  <Badge variant={item.trend === 'down' ? 'error' : 'success'} dot>
                    {item.trend === 'down' ? '↓' : '↑'} {item.delta}
                  </Badge>
                ) : null}
                {item.helpText ? (
                  <span style={{ 'font-size': 'var(--md-text-label-md)', color: 'var(--md-text-secondary)' }}>
                    {item.helpText}
                  </span>
                ) : null}
              </div>
            ) : null}
          </Card>
        )}
      </For>
    </section>
  )
}
