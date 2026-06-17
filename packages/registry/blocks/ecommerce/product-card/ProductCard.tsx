import { Card, Badge, Button } from '@moderno/react'

export interface ProductCardProps {
  image?: string
  title?: string
  price?: string
  saleText?: string
  onAdd?: () => void
}

/**
 * Moderno block — ProductCard (React). Copy-paste; edit freely.
 * Product tile. Uses the Card + Badge + Button primitives + Moderno tokens.
 */
export function ProductCard({
  image,
  title = 'Silla Moderno',
  price = '$320',
  saleText,
  onAdd,
}: ProductCardProps) {
  return (
    <div style={{ maxWidth: '280px' }}>
      <Card
        footer={
          <Button label="Agregar al carrito" size="md" onClick={onAdd} style={{ width: '100%' }} />
        }
      >
        <div style={{ position: 'relative', margin: '0 0 12px' }}>
          {saleText ? (
            <span style={{ position: 'absolute', top: '8px', left: '8px', zIndex: 1 }}>
              <Badge variant="solid">{saleText}</Badge>
            </span>
          ) : null}
          <div
            style={{
              aspectRatio: '1 / 1',
              background: 'var(--md-surface-muted)',
              borderBottom: '1px solid var(--md-border-default)',
              backgroundImage: image ? `url(${image})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
        <p
          style={{
            fontSize: 'var(--md-text-body-md)',
            color: 'var(--md-text-primary)',
            margin: '0 0 4px',
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontFamily: 'var(--md-font-serif)',
            fontSize: '20px',
            color: 'var(--md-text-primary)',
            margin: 0,
          }}
        >
          {price}
        </p>
      </Card>
    </div>
  )
}
