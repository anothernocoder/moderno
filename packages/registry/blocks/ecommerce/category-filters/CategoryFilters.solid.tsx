import { createSignal, For, Show, type JSX } from 'solid-js'
import { Button, Combobox, NumberInput, type ComboboxItem } from '@moderno/solid'

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

const asideStyle: JSX.CSSProperties = {
  display: 'flex',
  'flex-direction': 'column',
  gap: '24px',
  width: '280px',
  padding: '24px',
  background: 'var(--md-surface-base)',
  border: '1px solid var(--md-border-default)',
}
const headingStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '20px',
  'line-height': 1.2,
  color: 'var(--md-text-primary)',
  margin: 0,
}
const sectionStyle: JSX.CSSProperties = {
  display: 'flex',
  'flex-direction': 'column',
  gap: '12px',
  'padding-bottom': '20px',
  'border-bottom': '1px solid var(--md-border-default)',
}
const sectionLabelStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-label-sm)',
  color: 'var(--md-text-secondary)',
}
const sizeOptionsStyle: JSX.CSSProperties = { display: 'flex', gap: '8px', 'flex-wrap': 'wrap' }
const priceRowStyle: JSX.CSSProperties = { display: 'flex', gap: '12px' }
const actionsRowStyle: JSX.CSSProperties = { display: 'flex', gap: '12px' }

function sizeButtonStyle(active: boolean): JSX.CSSProperties {
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
 * Moderno block — CategoryFilters (Solid). Copy-paste; edit freely.
 * Faceted sidebar filters for a product listing page: a searchable category
 * Combobox, a size toggle group and a min/max price range. Composes the
 * Combobox + Button + NumberInput primitives + Moderno tokens, no bespoke
 * interaction logic beyond what Combobox already provides.
 */
export function CategoryFilters(props: CategoryFiltersProps) {
  const heading = () => props.heading ?? 'Filtros'
  const categoryLabel = () => props.categoryLabel ?? 'Categoría'
  const categoryPlaceholder = () => props.categoryPlaceholder ?? 'Buscar categoría'
  const categories = () => props.categories ?? DEFAULT_CATEGORIES
  const sizeLabel = () => props.sizeLabel ?? 'Talla'
  const sizes = () => props.sizes ?? DEFAULT_SIZES
  const priceLabel = () => props.priceLabel ?? 'Precio'
  const minPriceLabel = () => props.minPriceLabel ?? 'Mínimo'
  const maxPriceLabel = () => props.maxPriceLabel ?? 'Máximo'
  const applyLabel = () => props.applyLabel ?? 'Aplicar filtros'
  const resetLabel = () => props.resetLabel ?? 'Limpiar'

  const [category, setCategory] = createSignal<string[]>(props.defaultCategory ? [props.defaultCategory] : [])
  const [size, setSize] = createSignal<string | undefined>(props.defaultSize)
  const [minPrice, setMinPrice] = createSignal<number | undefined>(props.defaultMinPrice)
  const [maxPrice, setMaxPrice] = createSignal<number | undefined>(props.defaultMaxPrice)

  function handleApply() {
    props.onApply?.({ category: category()[0], size: size(), minPrice: minPrice(), maxPrice: maxPrice() })
  }

  function handleReset() {
    setCategory([])
    setSize(undefined)
    setMinPrice(undefined)
    setMaxPrice(undefined)
    props.onReset?.()
  }

  return (
    <aside style={asideStyle} aria-label={heading()}>
      <Show when={heading()}>
        <h2 style={headingStyle}>{heading()}</h2>
      </Show>
      <div style={sectionStyle}>
        <Combobox
          label={categoryLabel()}
          items={categories()}
          placeholder={categoryPlaceholder()}
          value={category()}
          onValueChange={setCategory}
        />
      </div>
      <div style={sectionStyle}>
        <span style={sectionLabelStyle}>{sizeLabel()}</span>
        <div style={sizeOptionsStyle} role="group" aria-label={sizeLabel()}>
          <For each={sizes()}>
            {(option) => (
              <button
                type="button"
                style={sizeButtonStyle(option === size())}
                aria-pressed={option === size()}
                onClick={() => setSize(option === size() ? undefined : option)}
              >
                {option}
              </button>
            )}
          </For>
        </div>
      </div>
      <div style={sectionStyle}>
        <span style={sectionLabelStyle}>{priceLabel()}</span>
        <div style={priceRowStyle}>
          <NumberInput
            label={minPriceLabel()}
            defaultValue={props.defaultMinPrice}
            min={0}
            onValueChange={(_, valueAsNumber) => setMinPrice(valueAsNumber)}
          />
          <NumberInput
            label={maxPriceLabel()}
            defaultValue={props.defaultMaxPrice}
            min={0}
            onValueChange={(_, valueAsNumber) => setMaxPrice(valueAsNumber)}
          />
        </div>
      </div>
      <div style={actionsRowStyle}>
        <Button variant="secondary" style={{ flex: 1 }} onClick={handleReset}>
          {resetLabel()}
        </Button>
        <Button variant="primary" style={{ flex: 1 }} onClick={handleApply}>
          {applyLabel()}
        </Button>
      </div>
    </aside>
  )
}
