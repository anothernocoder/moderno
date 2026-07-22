import { For, Show, type JSX } from 'solid-js'

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
  'grid-template-columns': 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '24px',
  'max-width': '1040px',
  margin: '0 auto',
}
const tileStyle: JSX.CSSProperties = {
  display: 'block',
  color: 'inherit',
  'text-decoration': 'none',
}
const tileImageStyle: JSX.CSSProperties = {
  'aspect-ratio': '1 / 1',
  background: 'var(--md-surface-muted)',
  border: '1px solid var(--md-border-default)',
  'background-size': 'cover',
  'background-position': 'center',
  'margin-bottom': '12px',
}
const tileLabelStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-md)',
  color: 'var(--md-text-primary)',
  'font-weight': 500,
  'text-align': 'center',
  margin: 0,
}

/**
 * Moderno block — CategoryPreview (Solid). Copy-paste; edit freely.
 * Grid of category tiles (image + label) linking into a storefront's category
 * pages. Plain layout + `--md-*` tokens, no primitives, no bespoke interaction logic.
 */
export function CategoryPreview(props: CategoryPreviewProps) {
  const heading = () => props.heading ?? 'Comprar por categoría'
  const categories = () => props.categories ?? DEFAULT_CATEGORIES

  return (
    <section style={sectionStyle} aria-label={heading()}>
      <Show when={heading()}>
        <h2 style={headingStyle}>{heading()}</h2>
      </Show>
      <div style={gridStyle}>
        <For each={categories()}>
          {(category) => (
            <a href={category.href} style={tileStyle} onClick={() => props.onCategoryClick?.(category)}>
              <div
                style={{
                  ...tileImageStyle,
                  'background-image': category.image ? `url(${category.image})` : undefined,
                }}
              />
              <p style={tileLabelStyle}>{category.label}</p>
            </a>
          )}
        </For>
      </div>
    </section>
  )
}
