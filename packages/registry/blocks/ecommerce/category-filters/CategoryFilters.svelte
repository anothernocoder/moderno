<script lang="ts">
  // Moderno block — CategoryFilters (Svelte). Copy-paste; edit freely.
  // Faceted sidebar filters for a product listing page: a searchable category
  // Combobox, a size toggle group and a min/max price range. Composes the
  // Combobox + Button + NumberInput primitives + Moderno tokens, no bespoke
  // interaction logic beyond what Combobox already provides.
  import { Button, Combobox, NumberInput, type ComboboxItem } from '@moderno/svelte'

  export interface CategoryFiltersState {
    category?: string
    size?: string
    minPrice?: number
    maxPrice?: number
  }

  const DEFAULT_CATEGORIES: ComboboxItem[] = [
    { label: 'Sillas', value: 'sillas' },
    { label: 'Mesas', value: 'mesas' },
    { label: 'Iluminación', value: 'iluminacion' },
    { label: 'Textiles', value: 'textiles' },
    { label: 'Almacenamiento', value: 'almacenamiento' },
  ]
  const DEFAULT_SIZES = ['S', 'M', 'L', 'XL']

  let {
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
  }: {
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
  } = $props()

  let category = $state<string[]>(defaultCategory ? [defaultCategory] : [])
  let size = $state<string | undefined>(defaultSize)
  let minPrice = $state<number | undefined>(defaultMinPrice)
  let maxPrice = $state<number | undefined>(defaultMaxPrice)

  function selectSize(option: string) {
    size = option === size ? undefined : option
  }

  function onMinPriceChange(_value: string, valueAsNumber: number) {
    minPrice = valueAsNumber
  }

  function onMaxPriceChange(_value: string, valueAsNumber: number) {
    maxPrice = valueAsNumber
  }

  function handleApply() {
    onApply?.({ category: category[0], size, minPrice, maxPrice })
  }

  function handleReset() {
    category = []
    size = undefined
    minPrice = undefined
    maxPrice = undefined
    onReset?.()
  }
</script>

<aside class="md-category-filters" aria-label={heading}>
  {#if heading}
    <h2 class="md-category-filters__heading">{heading}</h2>
  {/if}
  <div class="md-category-filters__section">
    <Combobox label={categoryLabel} items={categories} placeholder={categoryPlaceholder} bind:value={category} />
  </div>
  <div class="md-category-filters__section">
    <span class="md-category-filters__section-label">{sizeLabel}</span>
    <div class="md-category-filters__sizes" role="group" aria-label={sizeLabel}>
      {#each sizes as option (option)}
        <button
          type="button"
          class="md-category-filters__size"
          class:md-category-filters__size--active={option === size}
          aria-pressed={option === size}
          onclick={() => selectSize(option)}
        >
          {option}
        </button>
      {/each}
    </div>
  </div>
  <div class="md-category-filters__section">
    <span class="md-category-filters__section-label">{priceLabel}</span>
    <div class="md-category-filters__price-row">
      <NumberInput label={minPriceLabel} defaultValue={defaultMinPrice} min={0} onValueChange={onMinPriceChange} />
      <NumberInput label={maxPriceLabel} defaultValue={defaultMaxPrice} min={0} onValueChange={onMaxPriceChange} />
    </div>
  </div>
  <div class="md-category-filters__actions">
    <Button variant="secondary" style="flex: 1" onclick={handleReset}>{resetLabel}</Button>
    <Button variant="primary" style="flex: 1" onclick={handleApply}>{applyLabel}</Button>
  </div>
</aside>

<style>
  .md-category-filters {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 280px;
    padding: 24px;
    background: var(--md-surface-base);
    border: 1px solid var(--md-border-default);
  }
  .md-category-filters__heading {
    font-family: var(--md-font-serif);
    font-size: 20px;
    line-height: 1.2;
    color: var(--md-text-primary);
    margin: 0;
  }
  .md-category-filters__section {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--md-border-default);
  }
  .md-category-filters__section-label {
    font-size: var(--md-text-label-sm);
    color: var(--md-text-secondary);
  }
  .md-category-filters__sizes {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .md-category-filters__size {
    padding: 8px 14px;
    font-size: var(--md-text-body-sm);
    color: var(--md-text-primary);
    background: var(--md-surface-base);
    border: 1px solid var(--md-border-default);
    cursor: pointer;
  }
  .md-category-filters__size--active {
    color: var(--md-on-primary);
    background: var(--md-primary);
    border: 1px solid var(--md-primary);
  }
  .md-category-filters__price-row {
    display: flex;
    gap: 12px;
  }
  .md-category-filters__actions {
    display: flex;
    gap: 12px;
  }
</style>
