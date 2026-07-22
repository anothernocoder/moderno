import { useState, type CSSProperties } from 'react'
import { Card, Badge, Button } from '@moderno/react'

export interface ProductListItem {
  id?: string | number
  image?: string
  title?: string
  price?: string
  saleText?: string
}

export interface ProductListsProps {
  heading?: string
  products?: ProductListItem[]
  pageSize?: number
  prevLabel?: string
  nextLabel?: string
  onAdd?: (product: ProductListItem, index: number) => void
}

const DEFAULT_PRODUCTS: ProductListItem[] = [
  { id: 'silla-nordica', title: 'Silla Nórdica', price: '$320' },
  { id: 'mesa-roble', title: 'Mesa Roble', price: '$540' },
  { id: 'lampara-arco', title: 'Lámpara de Arco', price: '$128', saleText: '-10%' },
  { id: 'cojin-lino', title: 'Cojín de Lino', price: '$45' },
  { id: 'estante-modular', title: 'Estante Modular', price: '$310' },
  { id: 'silla-escandinava', title: 'Silla Escandinava', price: '$275' },
  { id: 'mesa-auxiliar', title: 'Mesa Auxiliar', price: '$190' },
  { id: 'lampara-piso', title: 'Lámpara de Piso', price: '$210' },
  { id: 'alfombra-tejida', title: 'Alfombra Tejida', price: '$260', saleText: '-20%' },
]

const sectionStyle: CSSProperties = {
  padding: '48px 24px',
  background: 'var(--md-surface-base)',
}
const headingStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '28px',
  lineHeight: 1.15,
  color: 'var(--md-text-primary)',
  textAlign: 'center',
  margin: '0 0 24px',
}
const gridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '24px',
  maxWidth: '1040px',
  margin: '0 auto',
}
const cardMediaStyle: CSSProperties = { position: 'relative', margin: '0 0 12px' }
const cardImageStyle: CSSProperties = {
  aspectRatio: '1 / 1',
  background: 'var(--md-surface-muted)',
  borderBottom: '1px solid var(--md-border-default)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}
const cardTitleStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-md)',
  color: 'var(--md-text-primary)',
  margin: '0 0 4px',
}
const cardPriceStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '20px',
  color: 'var(--md-text-primary)',
  margin: 0,
}
const paginationStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  marginTop: '32px',
}
const pageIndicatorStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
}

/**
 * Moderno block — ProductLists (React). Copy-paste; edit freely.
 * Grid of product tiles with a section heading and simple prev/next
 * pagination. Composes the Card + Badge + Button primitives + Moderno
 * tokens — same tile markup as the ProductCard block, duplicated here so
 * this block stays self-contained. No new primitives, no bespoke
 * interaction logic beyond local page state.
 */
export function ProductLists({
  heading = 'Productos destacados',
  products = DEFAULT_PRODUCTS,
  pageSize = 6,
  prevLabel = 'Anterior',
  nextLabel = 'Siguiente',
  onAdd,
}: ProductListsProps) {
  const [page, setPage] = useState(0)
  const totalPages = Math.max(1, Math.ceil(products.length / pageSize))
  const currentPage = Math.min(page, totalPages - 1)
  const start = currentPage * pageSize
  const visible = products.slice(start, start + pageSize)

  return (
    <section style={sectionStyle} aria-label={heading}>
      {heading ? <h2 style={headingStyle}>{heading}</h2> : null}
      <div style={gridStyle}>
        {visible.map((product, index) => (
          <Card
            key={product.id ?? start + index}
            footer={
              <Button
                label="Agregar al carrito"
                size="md"
                onClick={() => onAdd?.(product, start + index)}
                style={{ width: '100%' }}
              />
            }
          >
            <div style={cardMediaStyle}>
              {product.saleText ? (
                <span style={{ position: 'absolute', top: '8px', left: '8px', zIndex: 1 }}>
                  <Badge variant="solid">{product.saleText}</Badge>
                </span>
              ) : null}
              <div
                style={{
                  ...cardImageStyle,
                  backgroundImage: product.image ? `url(${product.image})` : undefined,
                }}
              />
            </div>
            <p style={cardTitleStyle}>{product.title}</p>
            <p style={cardPriceStyle}>{product.price}</p>
          </Card>
        ))}
      </div>
      {totalPages > 1 ? (
        <div style={paginationStyle}>
          <Button
            variant="secondary"
            size="md"
            disabled={currentPage === 0}
            onClick={() => setPage(currentPage - 1)}
          >
            {prevLabel}
          </Button>
          <span style={pageIndicatorStyle} aria-live="polite">
            {currentPage + 1} / {totalPages}
          </span>
          <Button
            variant="secondary"
            size="md"
            disabled={currentPage === totalPages - 1}
            onClick={() => setPage(currentPage + 1)}
          >
            {nextLabel}
          </Button>
        </div>
      ) : null}
    </section>
  )
}
