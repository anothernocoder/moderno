import { Card, Badge, Button } from '@moderno/solid'
import { Show } from 'solid-js'
import type { JSX } from 'solid-js'

export interface ProductCardProps {
  image?: string
  title?: string
  price?: string
  saleText?: string
  onAdd?: () => void
}

/**
 * Moderno block — ProductCard (Solid). Copy-paste; edit freely.
 * Product tile. Uses the Card + Badge + Button primitives + Moderno tokens.
 */
export function ProductCard(props: ProductCardProps) {
  const imageStyle = (): JSX.CSSProperties => ({
    'aspect-ratio': '1 / 1',
    background: 'var(--md-surface-muted)',
    'border-bottom': '1px solid var(--md-border-default)',
    'background-image': props.image ? `url(${props.image})` : undefined,
    'background-size': 'cover',
    'background-position': 'center',
  })
  return (
    <div style={{ 'max-width': '280px' }}>
      <Card
        footer={
          <Button
            label="Agregar al carrito"
            size="md"
            onClick={() => props.onAdd?.()}
            style={{ width: '100%' }}
          />
        }
      >
        <div style={{ position: 'relative', margin: '0 0 12px' }}>
          <Show when={props.saleText}>
            <span style={{ position: 'absolute', top: '8px', left: '8px', 'z-index': 1 }}>
              <Badge variant="solid">{props.saleText}</Badge>
            </span>
          </Show>
          <div style={imageStyle()} />
        </div>
        <p
          style={{
            'font-size': 'var(--md-text-body-md)',
            color: 'var(--md-text-primary)',
            margin: '0 0 4px',
          }}
        >
          {props.title ?? 'Silla Moderno'}
        </p>
        <p
          style={{
            'font-family': 'var(--md-font-serif)',
            'font-size': '20px',
            color: 'var(--md-text-primary)',
            margin: 0,
          }}
        >
          {props.price ?? '$320'}
        </p>
      </Card>
    </div>
  )
}
