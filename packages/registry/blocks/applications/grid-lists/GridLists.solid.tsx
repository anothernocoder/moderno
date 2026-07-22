import { Card, Avatar, Badge, Button } from '@moderno/solid'
import { For } from 'solid-js'
import type { JSX } from 'solid-js'

export type GridListStatusVariant = 'neutral' | 'solid' | 'success' | 'warning' | 'error' | 'info'

export interface GridListItem {
  id: string
  title: string
  subtitle?: string
  image?: string
  initials?: string
  status?: string
  statusVariant?: GridListStatusVariant
}

export interface GridListsProps {
  items?: GridListItem[]
  onItemAction?: (item: GridListItem) => void
}

const DEFAULT_ITEMS: GridListItem[] = [
  { id: '1', title: 'Rediseño de checkout', subtitle: 'Equipo de Producto', initials: 'RC', status: 'En curso', statusVariant: 'info' },
  { id: '2', title: 'Migración a Vue 3', subtitle: 'Equipo de Plataforma', initials: 'MV', status: 'Completado', statusVariant: 'success' },
  { id: '3', title: 'Campaña de verano', subtitle: 'Equipo de Marketing', initials: 'CV', status: 'Pausado', statusVariant: 'warning' },
  { id: '4', title: 'API de pagos v2', subtitle: 'Equipo de Backend', initials: 'AP', status: 'En curso', statusVariant: 'info' },
  { id: '5', title: 'Rebranding', subtitle: 'Equipo de Diseño', initials: 'RB', status: 'Bloqueado', statusVariant: 'error' },
  { id: '6', title: 'Onboarding móvil', subtitle: 'Equipo de Producto', initials: 'OM', status: 'Completado', statusVariant: 'success' },
]

/**
 * Moderno block — GridLists (Solid). Copy-paste; edit freely.
 * Responsive grid of item cards: thumbnail/icon, title, subtitle, and status badge with an
 * action. Uses the Card + Avatar + Badge + Button primitives + Moderno tokens.
 */
export function GridLists(props: GridListsProps) {
  const sectionStyle: JSX.CSSProperties = {
    display: 'grid',
    'grid-template-columns': 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '16px',
    padding: '24px',
    background: 'var(--md-surface-base)',
  }
  return (
    <section style={sectionStyle}>
      <For each={props.items ?? DEFAULT_ITEMS}>
        {(item) => (
          <Card
            footer={
              <Button
                variant="secondary"
                size="sm"
                onClick={() => props.onItemAction?.(item)}
                style={{ width: '100%' }}
              >
                Ver detalle
              </Button>
            }
          >
            <div style={{ display: 'flex', 'align-items': 'center', gap: '12px', 'margin-bottom': '12px' }}>
              <Avatar src={item.image} initials={item.initials} shape="square" size="lg" />
              <div>
                <p
                  style={{
                    'font-size': 'var(--md-text-body-md)',
                    color: 'var(--md-text-primary)',
                    'font-weight': 500,
                    margin: 0,
                  }}
                >
                  {item.title}
                </p>
                {item.subtitle ? (
                  <p
                    style={{
                      'font-size': 'var(--md-text-body-sm)',
                      color: 'var(--md-text-secondary)',
                      margin: '4px 0 0',
                    }}
                  >
                    {item.subtitle}
                  </p>
                ) : null}
              </div>
            </div>
            {item.status ? (
              <Badge variant={item.statusVariant} dot>
                {item.status}
              </Badge>
            ) : null}
          </Card>
        )}
      </For>
    </section>
  )
}
