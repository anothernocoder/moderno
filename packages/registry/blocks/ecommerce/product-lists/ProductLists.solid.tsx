import { createMemo, createSignal, For, Show, type JSX } from 'solid-js'
import { Card, Badge, Button } from '@moderno/solid'

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

const sectionStyle: JSX.CSSProperties = {
  padding: '48px 24px',
  background: 'var(--md-surface-base)',
}
const headingStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '28px',
  'line-height': 1.15,
  color: 'var(--md-text-primary)',
  'text-align': 'center',
  margin: '0 0 24px',
}
const gridStyle: JSX.CSSProperties = {
  display: 'grid',
  'grid-template-columns': 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '24px',
  'max-width': '1040px',
  margin: '0 auto',
}
const cardMediaStyle: JSX.CSSProperties = { position: 'relative', margin: '0 0 12px' }
const cardTitleStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-md)',
  color: 'var(--md-text-primary)',
  margin: '0 0 4px',
}
const cardPriceStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '20px',
  color: 'var(--md-text-primary)',
  margin: 0,
}
const paginationStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'center',
  gap: '16px',
  'margin-top': '32px',
}
const pageIndicatorStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
}

function cardImageStyle(product: ProductListItem): JSX.CSSProperties {
  return {
    'aspect-ratio': '1 / 1',
    background: 'var(--md-surface-muted)',
    'border-bottom': '1px solid var(--md-border-default)',
    'background-image': product.image ? `url(${product.image})` : undefined,
    'background-size': 'cover',
    'background-position': 'center',
  }
}

/**
 * Moderno block — ProductLists (Solid). Copy-paste; edit freely.
 * Grid of product tiles with a section heading and simple prev/next
 * pagination. Composes the Card + Badge + Button primitives + Moderno
 * tokens — same tile markup as the ProductCard block, duplicated here so
 * this block stays self-contained. No new primitives, no bespoke
 * interaction logic beyond local page state.
 */
export function ProductLists(props: ProductListsProps) {
  const heading = () => props.heading ?? 'Productos destacados'
  const products = () => props.products ?? DEFAULT_PRODUCTS
  const pageSize = () => props.pageSize ?? 6
  const prevLabel = () => props.prevLabel ?? 'Anterior'
  const nextLabel = () => props.nextLabel ?? 'Siguiente'

  const [page, setPage] = createSignal(0)

  const totalPages = createMemo(() => Math.max(1, Math.ceil(products().length / pageSize())))
  const currentPage = createMemo(() => Math.min(page(), totalPages() - 1))
  const start = createMemo(() => currentPage() * pageSize())
  const visible = createMemo(() => products().slice(start(), start() + pageSize()))

  return (
    <section style={sectionStyle} aria-label={heading()}>
      <Show when={heading()}>
        <h2 style={headingStyle}>{heading()}</h2>
      </Show>
      <div style={gridStyle}>
        <For each={visible()}>
          {(product, index) => (
            <Card
              footer={
                <Button
                  label="Agregar al carrito"
                  size="md"
                  onClick={() => props.onAdd?.(product, start() + index())}
                  style={{ width: '100%' }}
                />
              }
            >
              <div style={cardMediaStyle}>
                <Show when={product.saleText}>
                  <span style={{ position: 'absolute', top: '8px', left: '8px', 'z-index': 1 }}>
                    <Badge variant="solid">{product.saleText}</Badge>
                  </span>
                </Show>
                <div style={cardImageStyle(product)} />
              </div>
              <p style={cardTitleStyle}>{product.title}</p>
              <p style={cardPriceStyle}>{product.price}</p>
            </Card>
          )}
        </For>
      </div>
      <Show when={totalPages() > 1}>
        <div style={paginationStyle}>
          <Button
            variant="secondary"
            size="md"
            disabled={currentPage() === 0}
            onClick={() => setPage(currentPage() - 1)}
          >
            {prevLabel()}
          </Button>
          <span style={pageIndicatorStyle} aria-live="polite">
            {currentPage() + 1} / {totalPages()}
          </span>
          <Button
            variant="secondary"
            size="md"
            disabled={currentPage() === totalPages() - 1}
            onClick={() => setPage(currentPage() + 1)}
          >
            {nextLabel()}
          </Button>
        </div>
      </Show>
    </section>
  )
}
