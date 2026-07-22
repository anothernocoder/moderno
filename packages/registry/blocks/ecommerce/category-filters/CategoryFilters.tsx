import { useState, type CSSProperties } from 'react'
import { Button, Combobox, NumberInput, type ComboboxItem } from '@moderno/react'

export interface CategoryFiltersState {
  category?: string
  size?: string
  minPrice?: number
  maxPrice?: number
}

export interface CategoryFiltersProps {
  heading?: string
  categoryLabel?: string
  categoryPlaceholder?: string
  categories?: ComboboxItem[]
  defaultCategory?: string
  sizeLabel?: string
  sizes?: string[]
  defaultSize?: string
  priceLabel?: string
  minPriceLabel?: string
  maxPriceLabel?: string
  defaultMinPrice?: number
  defaultMaxPrice?: number
  applyLabel?: string
  resetLabel?: string
  onApply?: (filters: CategoryFiltersState) => void
  onReset?: () => void
}

const DEFAULT_CATEGORIES: ComboboxItem[] = [
  { label: 'Sillas', value: 'sillas' },
  { label: 'Mesas', value: 'mesas' },
  { label: 'Iluminación', value: 'iluminacion' },
  { label: 'Textiles', value: 'textiles' },
  { label: 'Almacenamiento', value: 'almacenamiento' },
]
const DEFAULT_SIZES = ['S', 'M', 'L', 'XL']

const asideStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  width: '280px',
  padding: '24px',
  background: 'var(--md-surface-base)',
  border: '1px solid var(--md-border-default)',
}
const headingStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '20px',
  lineHeight: 1.2,
  color: 'var(--md-text-primary)',
  margin: 0,
}
const sectionStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  paddingBottom: '20px',
  borderBottom: '1px solid var(--md-border-default)',
}
const sectionLabelStyle: CSSProperties = {
  fontSize: 'var(--md-text-label-sm)',
  color: 'var(--md-text-secondary)',
}
const sizeOptionsStyle: CSSProperties = { display: 'flex', gap: '8px', flexWrap: 'wrap' }
const priceRowStyle: CSSProperties = { display: 'flex', gap: '12px' }
const actionsRowStyle: CSSProperties = { display: 'flex', gap: '12px' }

function sizeButtonStyle(active: boolean): CSSProperties {
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
 * Moderno block — CategoryFilters (React). Copy-paste; edit freely.
 * Faceted sidebar filters for a product listing page: a searchable category
 * Combobox, a size toggle group and a min/max price range. Composes the
 * Combobox + Button + NumberInput primitives + Moderno tokens, no bespoke
 * interaction logic beyond what Combobox already provides.
 */
export function CategoryFilters({
  heading = 'Filtros',
  categoryLabel = 'Categoría',
  categoryPlaceholder = 'Buscar categoría',
  categories = DEFAULT_CATEGORIES,
  defaultCategory,
  sizeLabel = 'Talla',
  sizes = DEFAULT_SIZES,
  defaultSize,
  priceLabel = 'Precio',
  minPriceLabel = 'Mínimo',
  maxPriceLabel = 'Máximo',
  defaultMinPrice,
  defaultMaxPrice,
  applyLabel = 'Aplicar filtros',
  resetLabel = 'Limpiar',
  onApply,
  onReset,
}: CategoryFiltersProps) {
  const [category, setCategory] = useState<string[]>(defaultCategory ? [defaultCategory] : [])
  const [size, setSize] = useState<string | undefined>(defaultSize)
  const [minPrice, setMinPrice] = useState<number | undefined>(defaultMinPrice)
  const [maxPrice, setMaxPrice] = useState<number | undefined>(defaultMaxPrice)

  function handleApply() {
    onApply?.({ category: category[0], size, minPrice, maxPrice })
  }

  function handleReset() {
    setCategory([])
    setSize(undefined)
    setMinPrice(undefined)
    setMaxPrice(undefined)
    onReset?.()
  }

  return (
    <aside style={asideStyle} aria-label={heading}>
      {heading ? <h2 style={headingStyle}>{heading}</h2> : null}
      <div style={sectionStyle}>
        <Combobox
          label={categoryLabel}
          items={categories}
          placeholder={categoryPlaceholder}
          value={category}
          onValueChange={setCategory}
        />
      </div>
      <div style={sectionStyle}>
        <span style={sectionLabelStyle}>{sizeLabel}</span>
        <div style={sizeOptionsStyle} role="group" aria-label={sizeLabel}>
          {sizes.map((option) => (
            <button
              key={option}
              type="button"
              style={sizeButtonStyle(option === size)}
              aria-pressed={option === size}
              onClick={() => setSize(option === size ? undefined : option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div style={sectionStyle}>
        <span style={sectionLabelStyle}>{priceLabel}</span>
        <div style={priceRowStyle}>
          <NumberInput
            label={minPriceLabel}
            defaultValue={defaultMinPrice}
            min={0}
            onValueChange={(_, valueAsNumber) => setMinPrice(valueAsNumber)}
          />
          <NumberInput
            label={maxPriceLabel}
            defaultValue={defaultMaxPrice}
            min={0}
            onValueChange={(_, valueAsNumber) => setMaxPrice(valueAsNumber)}
          />
        </div>
      </div>
      <div style={actionsRowStyle}>
        <Button variant="secondary" style={{ flex: 1 }} onClick={handleReset}>
          {resetLabel}
        </Button>
        <Button variant="primary" style={{ flex: 1 }} onClick={handleApply}>
          {applyLabel}
        </Button>
      </div>
    </aside>
  )
}
