import type { CSSProperties } from 'react'
import { Card } from '@moderno/react'

export type ProductFeatureIcon = 'material' | 'warranty' | 'shipping' | 'care'

export interface ProductFeatureItem {
  icon?: ProductFeatureIcon
  label: string
  description: string
}

export interface ProductFeaturesProps {
  heading?: string
  features?: ProductFeatureItem[]
}

const DEFAULT_FEATURES: ProductFeatureItem[] = [
  {
    icon: 'material',
    label: 'Roble macizo',
    description: 'Estructura en madera de roble macizo con acabado mate, resistente al uso diario.',
  },
  {
    icon: 'warranty',
    label: 'Garantía 2 años',
    description: 'Cobertura completa por defectos de fabricación durante 24 meses.',
  },
  {
    icon: 'shipping',
    label: 'Envío gratis',
    description: 'Envío sin costo en compras desde $250.000 a todo el país.',
  },
  {
    icon: 'care',
    label: 'Fácil mantenimiento',
    description: 'Se limpia con un paño húmedo, sin productos especiales.',
  },
]

const ICONS: Record<
  ProductFeatureIcon,
  { viewBox: string; paths: string[]; circles?: { cx: number; cy: number; r: number }[] }
> = {
  material: {
    viewBox: '0 0 24 24',
    paths: ['M12 3 3 7.5 12 12 21 7.5 12 3Z', 'M3 7.5V16.5L12 21 21 16.5V7.5', 'M12 12V21'],
  },
  warranty: {
    viewBox: '0 0 24 24',
    paths: ['M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z', 'M8.5 12.5l2.5 2.5 4.5-5'],
  },
  shipping: {
    viewBox: '0 0 24 24',
    paths: ['M2 7h13v9H2z', 'M15 10h4l3 3v3h-7z'],
    circles: [
      { cx: 7, cy: 18, r: 1.6 },
      { cx: 17, cy: 18, r: 1.6 },
    ],
  },
  care: {
    viewBox: '0 0 24 24',
    paths: ['M12 3c0 0 6 7.2 6 11.2A6 6 0 0 1 6 14.2C6 10.2 12 3 12 3Z'],
  },
}

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
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '24px',
  maxWidth: '1040px',
  margin: '0 auto',
}
const titleRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}
const iconStyle: CSSProperties = { color: 'var(--md-primary)', flexShrink: 0 }
const descriptionStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  lineHeight: 'var(--md-text-body-sm-lh)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}

function FeatureIcon({ icon }: { icon?: ProductFeatureIcon }) {
  const spec = ICONS[icon ?? 'material']
  return (
    <svg
      viewBox={spec.viewBox}
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      style={iconStyle}
      aria-hidden="true"
    >
      {spec.circles?.map((c, index) => <circle key={index} cx={c.cx} cy={c.cy} r={c.r} />)}
      {spec.paths.map((d, index) => (
        <path key={index} d={d} />
      ))}
    </svg>
  )
}

/**
 * Moderno block — ProductFeatures (React). Copy-paste; edit freely.
 * Feature-highlight grid for a single product: icon + label + short
 * description per feature (material, warranty, shipping, care). Composes
 * the Card primitive + Moderno tokens. No new primitives, no bespoke
 * interaction logic — purely presentational.
 */
export function ProductFeatures({ heading = 'Características', features = DEFAULT_FEATURES }: ProductFeaturesProps) {
  return (
    <section style={sectionStyle} aria-label={heading}>
      {heading ? <h2 style={headingStyle}>{heading}</h2> : null}
      <div style={gridStyle}>
        {features.map((feature, index) => (
          <Card
            key={feature.label ?? index}
            title={
              <span style={titleRowStyle}>
                <FeatureIcon icon={feature.icon} />
                <span>{feature.label}</span>
              </span>
            }
          >
            <p style={descriptionStyle}>{feature.description}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
