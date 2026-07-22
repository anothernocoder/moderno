import type { CSSProperties } from 'react'
import { Avatar, Badge, Card, Progress } from '@moderno/react'

export interface ReviewsBreakdownItem {
  stars: number
  count: number
}

export interface ReviewEntry {
  name: string
  avatarSrc?: string
  initials?: string
  rating: number
  date: string
  text: string
  verified?: boolean
}

export interface ReviewsProps {
  heading?: string
  averageRating?: number
  reviewCount?: number
  breakdown?: ReviewsBreakdownItem[]
  reviews?: ReviewEntry[]
}

const DEFAULT_BREAKDOWN: ReviewsBreakdownItem[] = [
  { stars: 5, count: 86 },
  { stars: 4, count: 28 },
  { stars: 3, count: 10 },
  { stars: 2, count: 5 },
  { stars: 1, count: 3 },
]

const DEFAULT_REVIEWS: ReviewEntry[] = [
  {
    name: 'Camila Restrepo',
    initials: 'CR',
    rating: 5,
    date: '3 de junio, 2026',
    text: 'La silla superó mis expectativas. El roble macizo se siente robusto y el acabado es precioso. Llegó bien empacada y el armado tomó menos de 10 minutos.',
    verified: true,
  },
  {
    name: 'Julián Torres',
    initials: 'JT',
    rating: 4,
    date: '22 de mayo, 2026',
    text: 'Muy buena relación calidad-precio. Le doy 4 estrellas porque el tono de la madera es un poco más claro que en las fotos, pero la calidad de construcción es excelente.',
    verified: true,
  },
  {
    name: 'Marcela Gómez',
    initials: 'MG',
    rating: 5,
    date: '8 de mayo, 2026',
    text: 'Segunda silla que compro de esta línea. Consistente en calidad, cómoda y el envío llegó antes de lo prometido.',
  },
]

const STAR_PATH = 'M12 2.5l2.9 6 6.6.7-4.9 4.5 1.3 6.5L12 17l-5.9 3.2 1.3-6.5-4.9-4.5 6.6-.7L12 2.5Z'

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
const wrapperStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: '40px',
  maxWidth: '1040px',
  margin: '0 auto',
  alignItems: 'start',
}
const summaryStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '24px' }
const averageBlockStyle: CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px' }
const averageNumberStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '40px',
  lineHeight: 1,
  color: 'var(--md-text-primary)',
}
const starRowStyle: CSSProperties = { display: 'inline-flex', gap: '2px', color: 'var(--md-warning)' }
const countTextStyle: CSSProperties = { fontSize: 'var(--md-text-body-sm)', color: 'var(--md-text-secondary)' }
const breakdownListStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '8px' }
const breakdownRowStyle: CSSProperties = { display: 'grid', gridTemplateColumns: '28px 1fr 28px', alignItems: 'center', gap: '10px' }
const breakdownLabelStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '2px',
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
}
const breakdownCountStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  textAlign: 'right',
}
const listStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '20px' }
const reviewHeaderStyle: CSSProperties = { display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '10px' }
const reviewerInfoStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '4px' }
const reviewerNameRowStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }
const reviewerNameStyle: CSSProperties = { fontSize: 'var(--md-text-body-md)', color: 'var(--md-text-primary)', fontWeight: 600 }
const reviewMetaStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px' }
const reviewDateStyle: CSSProperties = { fontSize: 'var(--md-text-body-sm)', color: 'var(--md-text-secondary)' }
const reviewTextStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  lineHeight: 'var(--md-text-body-sm-lh)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}

function Star({ filled, size = 16 }: { filled: boolean; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d={STAR_PATH} />
    </svg>
  )
}

function StarRow({ rating, size }: { rating: number; size?: number }) {
  const filled = Math.round(rating)
  return (
    <span style={starRowStyle} role="img" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} filled={index < filled} size={size} />
      ))}
    </span>
  )
}

/**
 * Moderno block — Reviews (React). Copy-paste; edit freely.
 * Customer reviews section: an aggregate rating summary (average, count, and a
 * per-star breakdown bar) alongside a list of individual review entries
 * (reviewer avatar/name, star rating, date, text). Composes the Avatar +
 * Badge + Card + Progress primitives + Moderno tokens. Star ratings render as
 * inline SVG stars, matching the Product Features inline-icon convention. No
 * new primitives, no bespoke interaction logic — purely presentational.
 */
export function Reviews({
  heading = 'Reseñas de clientes',
  averageRating = 4.6,
  reviewCount = 132,
  breakdown = DEFAULT_BREAKDOWN,
  reviews = DEFAULT_REVIEWS,
}: ReviewsProps) {
  return (
    <section style={sectionStyle} aria-label={heading}>
      {heading ? <h2 style={headingStyle}>{heading}</h2> : null}
      <div style={wrapperStyle}>
        <div style={summaryStyle}>
          <div style={averageBlockStyle}>
            <span style={averageNumberStyle}>{averageRating.toFixed(1)}</span>
            <StarRow rating={averageRating} size={20} />
            <span style={countTextStyle}>{reviewCount} reseñas</span>
          </div>
          <div style={breakdownListStyle}>
            {breakdown.map((item) => {
              const percentage = reviewCount > 0 ? Math.round((item.count / reviewCount) * 100) : 0
              return (
                <div key={item.stars} style={breakdownRowStyle}>
                  <span style={breakdownLabelStyle}>
                    {item.stars}
                    <Star filled size={12} />
                  </span>
                  <Progress value={percentage} max={100} showValue={false} />
                  <span style={breakdownCountStyle}>{item.count}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div style={listStyle}>
          {reviews.map((review, index) => (
            <Card key={review.name ?? index}>
              <div style={reviewHeaderStyle}>
                <Avatar src={review.avatarSrc} initials={review.initials} alt={review.name} />
                <div style={reviewerInfoStyle}>
                  <span style={reviewerNameRowStyle}>
                    <span style={reviewerNameStyle}>{review.name}</span>
                    {review.verified ? <Badge variant="success">Compra verificada</Badge> : null}
                  </span>
                  <span style={reviewMetaStyle}>
                    <StarRow rating={review.rating} size={14} />
                    <span style={reviewDateStyle}>{review.date}</span>
                  </span>
                </div>
              </div>
              <p style={reviewTextStyle}>{review.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
