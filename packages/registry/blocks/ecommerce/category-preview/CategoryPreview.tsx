import type { CSSProperties } from 'react'

export interface CategoryPreviewItem {
  id: string
  label: string
  image?: string
  href: string
}

export interface CategoryPreviewProps {
  heading?: string
  categories?: CategoryPreviewItem[]
  onCategoryClick?: (category: CategoryPreviewItem) => void
}

const DEFAULT_CATEGORIES: CategoryPreviewItem[] = [
  { id: 'sillas', label: 'Sillas', image: '', href: '#sillas' },
  { id: 'mesas', label: 'Mesas', image: '', href: '#mesas' },
  { id: 'iluminacion', label: 'Iluminación', image: '', href: '#iluminacion' },
  { id: 'textiles', label: 'Textiles', image: '', href: '#textiles' },
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
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '24px',
  maxWidth: '1040px',
  margin: '0 auto',
}
const tileStyle: CSSProperties = {
  display: 'block',
  color: 'inherit',
  textDecoration: 'none',
}
const tileImageStyle: CSSProperties = {
  aspectRatio: '1 / 1',
  background: 'var(--md-surface-muted)',
  border: '1px solid var(--md-border-default)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  marginBottom: '12px',
}
const tileLabelStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-md)',
  color: 'var(--md-text-primary)',
  fontWeight: 500,
  textAlign: 'center',
  margin: 0,
}

/**
 * Moderno block — CategoryPreview (React). Copy-paste; edit freely.
 * Grid of category tiles (image + label) linking into a storefront's category
 * pages. Plain layout + `--md-*` tokens, no primitives, no bespoke interaction logic.
 */
export function CategoryPreview({
  heading = 'Comprar por categoría',
  categories = DEFAULT_CATEGORIES,
  onCategoryClick,
}: CategoryPreviewProps) {
  return (
    <section style={sectionStyle} aria-label={heading}>
      {heading ? <h2 style={headingStyle}>{heading}</h2> : null}
      <div style={gridStyle}>
        {categories.map((category) => (
          <a
            key={category.id}
            href={category.href}
            style={tileStyle}
            onClick={() => onCategoryClick?.(category)}
          >
            <div
              style={{
                ...tileImageStyle,
                backgroundImage: category.image ? `url(${category.image})` : undefined,
              }}
            />
            <p style={tileLabelStyle}>{category.label}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
