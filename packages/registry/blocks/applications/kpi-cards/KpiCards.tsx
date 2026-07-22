import { Card, Badge } from '@moderno/react'

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
 * Moderno block — KpiCards (React). Copy-paste; edit freely.
 * Primary metric cards with a trend indicator. Single-metric counterpart to
 * the Stats row block. Uses the Card + Badge primitives + Moderno tokens.
 */
export function KpiCards({ items = DEFAULT_ITEMS }: KpiCardsProps) {
  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        padding: '24px',
        background: 'var(--md-surface-base)',
      }}
    >
      {items.map((item) => (
        <Card key={item.label}>
          <p
            style={{
              fontSize: 'var(--md-text-label-md)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--md-text-secondary)',
              margin: '0 0 8px',
            }}
          >
            {item.label}
          </p>
          <p
            style={{
              fontFamily: 'var(--md-font-serif)',
              fontSize: '40px',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--md-text-primary)',
              margin: '0 0 12px',
            }}
          >
            {item.value}
          </p>
          {item.delta || item.helpText ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {item.delta ? (
                <Badge variant={item.trend === 'down' ? 'error' : 'success'} dot>
                  {item.trend === 'down' ? '↓' : '↑'} {item.delta}
                </Badge>
              ) : null}
              {item.helpText ? (
                <span style={{ fontSize: 'var(--md-text-label-md)', color: 'var(--md-text-secondary)' }}>
                  {item.helpText}
                </span>
              ) : null}
            </div>
          ) : null}
        </Card>
      ))}
    </section>
  )
}
