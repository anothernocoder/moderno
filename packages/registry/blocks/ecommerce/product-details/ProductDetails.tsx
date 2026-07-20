import { useState, type CSSProperties } from 'react'
import { Badge, Button, NumberInput } from '@moderno/react'

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

const wrapperStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '48px',
  maxWidth: '1040px',
  margin: '0 auto',
  padding: '48px 24px',
  background: 'var(--md-surface-base)',
}
const heroStyle: CSSProperties = {
  aspectRatio: '1 / 1',
  background: 'var(--md-surface-muted)',
  border: '1px solid var(--md-border-default)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}
const thumbRailStyle: CSSProperties = { display: 'flex', gap: '8px', marginTop: '12px' }
const thumbImageStyle: CSSProperties = {
  display: 'block',
  width: '64px',
  height: '64px',
  background: 'var(--md-surface-muted)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}
const infoStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '16px' }
const titleStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '32px',
  lineHeight: 1.15,
  color: 'var(--md-text-primary)',
  margin: 0,
}
const ratingRowStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px' }
const starsStyle: CSSProperties = { color: 'var(--md-warning)', letterSpacing: '1px' }
const ratingTextStyle: CSSProperties = { fontSize: 'var(--md-text-body-sm)', color: 'var(--md-text-secondary)' }
const priceRowStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }
const priceStyle: CSSProperties = { fontFamily: 'var(--md-font-serif)', fontSize: '28px', color: 'var(--md-text-primary)' }
const compareStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-md)',
  color: 'var(--md-text-secondary)',
  textDecoration: 'line-through',
}
const descriptionStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-md)',
  lineHeight: 'var(--md-text-body-md-lh)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const variantGroupStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '8px' }
const variantLabelStyle: CSSProperties = {
  fontSize: 'var(--md-text-label-sm)',
  color: 'var(--md-text-secondary)',
}
const variantOptionsStyle: CSSProperties = { display: 'flex', gap: '8px', flexWrap: 'wrap' }
const ctaRowStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }

function thumbButtonStyle(active: boolean): CSSProperties {
  return {
    padding: 0,
    background: 'none',
    border: active ? '2px solid var(--md-primary)' : '1px solid var(--md-border-default)',
    cursor: 'pointer',
  }
}

function variantButtonStyle(active: boolean): CSSProperties {
  return {
    padding: '8px 14px',
    fontSize: 'var(--md-text-body-sm)',
    color: active ? 'var(--md-on-primary)' : 'var(--md-text-primary)',
    background: active ? 'var(--md-primary)' : 'var(--md-surface-base)',
    border: active ? '1px solid var(--md-primary)' : '1px solid var(--md-border-default)',
    cursor: 'pointer',
  }
}

/**
 * Moderno block — ProductDetails (React). Copy-paste; edit freely.
 * E-commerce product detail page: image gallery, rating, price with compare-at,
 * stock badge, variant selector, quantity stepper and add-to-cart. Uses the
 * Badge + Button + NumberInput primitives + Moderno tokens.
 */
export function ProductDetails({
  images = DEFAULT_IMAGES,
  title = 'Silla Roble Nórdica',
  rating = 4.8,
  reviewCount = 132,
  price = '$389.000',
  compareAtPrice = '$460.000',
  saleText = '-15%',
  stockLabel = 'En stock',
  stockVariant = 'success',
  description = 'Silla de comedor en madera de roble macizo con asiento tapizado en lino. Estructura robusta, acabado mate y patas torneadas a mano.',
  variantLabel = 'Acabado',
  variants = DEFAULT_VARIANTS,
  defaultVariant,
  defaultQuantity = 1,
  onAddToCart,
}: ProductDetailsProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(defaultVariant ?? variants[0])
  const [quantity, setQuantity] = useState(defaultQuantity)

  return (
    <div style={wrapperStyle}>
      <div>
        <div style={{ ...heroStyle, backgroundImage: images[activeImage] ? `url(${images[activeImage]})` : undefined }} />
        <div style={thumbRailStyle}>
          {images.map((src, index) => (
            <button
              key={index}
              type="button"
              style={thumbButtonStyle(index === activeImage)}
              aria-label={`Ver imagen ${index + 1}`}
              aria-pressed={index === activeImage}
              onClick={() => setActiveImage(index)}
            >
              <span style={{ ...thumbImageStyle, backgroundImage: src ? `url(${src})` : undefined }} />
            </button>
          ))}
        </div>
      </div>
      <div style={infoStyle}>
        {saleText ? (
          <span style={{ alignSelf: 'flex-start' }}>
            <Badge variant="solid">{saleText}</Badge>
          </span>
        ) : null}
        <h1 style={titleStyle}>{title}</h1>
        <div style={ratingRowStyle}>
          <span style={starsStyle} aria-hidden="true">
            {renderStars(rating)}
          </span>
          <span style={ratingTextStyle}>
            {rating.toFixed(1)} · {reviewCount} reseñas
          </span>
        </div>
        <div style={priceRowStyle}>
          <span style={priceStyle}>{price}</span>
          {compareAtPrice ? <span style={compareStyle}>{compareAtPrice}</span> : null}
          <Badge variant={stockVariant} dot>
            {stockLabel}
          </Badge>
        </div>
        <p style={descriptionStyle}>{description}</p>
        <div style={variantGroupStyle}>
          <span style={variantLabelStyle}>{variantLabel}</span>
          <div style={variantOptionsStyle} role="group" aria-label={variantLabel}>
            {variants.map((variant) => (
              <button
                key={variant}
                type="button"
                style={variantButtonStyle(variant === selectedVariant)}
                aria-pressed={variant === selectedVariant}
                onClick={() => setSelectedVariant(variant)}
              >
                {variant}
              </button>
            ))}
          </div>
        </div>
        <div style={ctaRowStyle}>
          <NumberInput
            label="Cantidad"
            defaultValue={defaultQuantity}
            min={1}
            max={10}
            onValueChange={(_, valueAsNumber) => setQuantity(valueAsNumber)}
          />
          <Button
            variant="primary"
            size="lg"
            style={{ width: '100%' }}
            onClick={() => onAddToCart?.({ variant: selectedVariant, quantity })}
          >
            Agregar al carrito
          </Button>
        </div>
      </div>
    </div>
  )
}
