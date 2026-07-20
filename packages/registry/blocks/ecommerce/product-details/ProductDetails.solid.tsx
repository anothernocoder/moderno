import { createSignal, For, Show, type JSX } from 'solid-js'
import { Badge, Button, NumberInput } from '@moderno/solid'

export type ProductDetailsStockVariant = 'neutral' | 'solid' | 'success' | 'warning' | 'error' | 'info'

export interface ProductDetailsAddPayload {
  variant?: string
  quantity: number
}

export interface ProductDetailsProps {
  images?: string[]
  title?: string
  rating?: number
  reviewCount?: number
  price?: string
  compareAtPrice?: string
  saleText?: string
  stockLabel?: string
  stockVariant?: ProductDetailsStockVariant
  description?: string
  variantLabel?: string
  variants?: string[]
  defaultVariant?: string
  defaultQuantity?: number
  onAddToCart?: (payload: ProductDetailsAddPayload) => void
}

const DEFAULT_IMAGES = ['', '', '']
const DEFAULT_VARIANTS = ['Roble claro', 'Roble oscuro', 'Nogal']

function renderStars(rating: number) {
  const filled = Math.round(rating)
  return '★'.repeat(filled) + '☆'.repeat(5 - filled)
}

const wrapperStyle: JSX.CSSProperties = {
  display: 'grid',
  'grid-template-columns': 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '48px',
  'max-width': '1040px',
  margin: '0 auto',
  padding: '48px 24px',
  background: 'var(--md-surface-base)',
}
const heroStyle: JSX.CSSProperties = {
  'aspect-ratio': '1 / 1',
  background: 'var(--md-surface-muted)',
  border: '1px solid var(--md-border-default)',
  'background-size': 'cover',
  'background-position': 'center',
}
const thumbRailStyle: JSX.CSSProperties = { display: 'flex', gap: '8px', 'margin-top': '12px' }
const thumbImageStyle: JSX.CSSProperties = {
  display: 'block',
  width: '64px',
  height: '64px',
  background: 'var(--md-surface-muted)',
  'background-size': 'cover',
  'background-position': 'center',
}
const infoStyle: JSX.CSSProperties = { display: 'flex', 'flex-direction': 'column', gap: '16px' }
const titleStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '32px',
  'line-height': 1.15,
  color: 'var(--md-text-primary)',
  margin: 0,
}
const ratingRowStyle: JSX.CSSProperties = { display: 'flex', 'align-items': 'center', gap: '8px' }
const starsStyle: JSX.CSSProperties = { color: 'var(--md-warning)', 'letter-spacing': '1px' }
const ratingTextStyle: JSX.CSSProperties = { 'font-size': 'var(--md-text-body-sm)', color: 'var(--md-text-secondary)' }
const priceRowStyle: JSX.CSSProperties = { display: 'flex', 'align-items': 'center', gap: '12px', 'flex-wrap': 'wrap' }
const priceStyle: JSX.CSSProperties = { 'font-family': 'var(--md-font-serif)', 'font-size': '28px', color: 'var(--md-text-primary)' }
const compareStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-md)',
  color: 'var(--md-text-secondary)',
  'text-decoration': 'line-through',
}
const descriptionStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-md)',
  'line-height': 'var(--md-text-body-md-lh)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const variantGroupStyle: JSX.CSSProperties = { display: 'flex', 'flex-direction': 'column', gap: '8px' }
const variantLabelStyle: JSX.CSSProperties = { 'font-size': 'var(--md-text-label-sm)', color: 'var(--md-text-secondary)' }
const variantOptionsStyle: JSX.CSSProperties = { display: 'flex', gap: '8px', 'flex-wrap': 'wrap' }
const ctaRowStyle: JSX.CSSProperties = { display: 'flex', 'flex-direction': 'column', gap: '16px', 'margin-top': '8px' }

function thumbButtonStyle(active: boolean): JSX.CSSProperties {
  return {
    padding: 0,
    background: 'none',
    border: active ? '2px solid var(--md-primary)' : '1px solid var(--md-border-default)',
    cursor: 'pointer',
  }
}

function variantButtonStyle(active: boolean): JSX.CSSProperties {
  return {
    padding: '8px 14px',
    'font-size': 'var(--md-text-body-sm)',
    color: active ? 'var(--md-on-primary)' : 'var(--md-text-primary)',
    background: active ? 'var(--md-primary)' : 'var(--md-surface-base)',
    border: active ? '1px solid var(--md-primary)' : '1px solid var(--md-border-default)',
    cursor: 'pointer',
  }
}

/**
 * Moderno block — ProductDetails (Solid). Copy-paste; edit freely.
 * E-commerce product detail page: image gallery, rating, price with compare-at,
 * stock badge, variant selector, quantity stepper and add-to-cart. Uses the
 * Badge + Button + NumberInput primitives + Moderno tokens.
 */
export function ProductDetails(props: ProductDetailsProps) {
  const images = () => props.images ?? DEFAULT_IMAGES
  const title = () => props.title ?? 'Silla Roble Nórdica'
  const rating = () => props.rating ?? 4.8
  const reviewCount = () => props.reviewCount ?? 132
  const price = () => props.price ?? '$389.000'
  const compareAtPrice = () => props.compareAtPrice ?? '$460.000'
  const saleText = () => props.saleText ?? '-15%'
  const stockLabel = () => props.stockLabel ?? 'En stock'
  const stockVariant = () => props.stockVariant ?? 'success'
  const description = () =>
    props.description ??
    'Silla de comedor en madera de roble macizo con asiento tapizado en lino. Estructura robusta, acabado mate y patas torneadas a mano.'
  const variantLabel = () => props.variantLabel ?? 'Acabado'
  const variants = () => props.variants ?? DEFAULT_VARIANTS
  const defaultQuantity = () => props.defaultQuantity ?? 1

  const [activeImage, setActiveImage] = createSignal(0)
  const [selectedVariant, setSelectedVariant] = createSignal(props.defaultVariant ?? variants()[0])
  const [quantity, setQuantity] = createSignal(defaultQuantity())

  return (
    <div style={wrapperStyle}>
      <div>
        <div
          style={{
            ...heroStyle,
            'background-image': images()[activeImage()] ? `url(${images()[activeImage()]})` : undefined,
          }}
        />
        <div style={thumbRailStyle}>
          <For each={images()}>
            {(src, index) => (
              <button
                type="button"
                style={thumbButtonStyle(index() === activeImage())}
                aria-label={`Ver imagen ${index() + 1}`}
                aria-pressed={index() === activeImage()}
                onClick={() => setActiveImage(index())}
              >
                <span style={{ ...thumbImageStyle, 'background-image': src ? `url(${src})` : undefined }} />
              </button>
            )}
          </For>
        </div>
      </div>
      <div style={infoStyle}>
        <Show when={saleText()}>
          <span style={{ 'align-self': 'flex-start' }}>
            <Badge variant="solid">{saleText()}</Badge>
          </span>
        </Show>
        <h1 style={titleStyle}>{title()}</h1>
        <div style={ratingRowStyle}>
          <span style={starsStyle} aria-hidden="true">
            {renderStars(rating())}
          </span>
          <span style={ratingTextStyle}>
            {rating().toFixed(1)} · {reviewCount()} reseñas
          </span>
        </div>
        <div style={priceRowStyle}>
          <span style={priceStyle}>{price()}</span>
          <Show when={compareAtPrice()}>
            <span style={compareStyle}>{compareAtPrice()}</span>
          </Show>
          <Badge variant={stockVariant()} dot>
            {stockLabel()}
          </Badge>
        </div>
        <p style={descriptionStyle}>{description()}</p>
        <div style={variantGroupStyle}>
          <span style={variantLabelStyle}>{variantLabel()}</span>
          <div style={variantOptionsStyle} role="group" aria-label={variantLabel()}>
            <For each={variants()}>
              {(variant) => (
                <button
                  type="button"
                  style={variantButtonStyle(variant === selectedVariant())}
                  aria-pressed={variant === selectedVariant()}
                  onClick={() => setSelectedVariant(variant)}
                >
                  {variant}
                </button>
              )}
            </For>
          </div>
        </div>
        <div style={ctaRowStyle}>
          <NumberInput
            label="Cantidad"
            defaultValue={defaultQuantity()}
            min={1}
            max={10}
            onValueChange={(_, valueAsNumber) => setQuantity(valueAsNumber)}
          />
          <Button
            variant="primary"
            size="lg"
            style={{ width: '100%' }}
            onClick={() => props.onAddToCart?.({ variant: selectedVariant(), quantity: quantity() })}
          >
            Agregar al carrito
          </Button>
        </div>
      </div>
    </div>
  )
}
