<script setup lang="ts">
// Moderno block — CategoryFilters (Vue). Copy-paste; edit freely.
// Faceted sidebar filters for a product listing page: a searchable category
// Combobox, a size toggle group and a min/max price range. Composes the
// Combobox + Button + NumberInput primitives + Moderno tokens, no bespoke
// interaction logic beyond what Combobox already provides.
import { ref } from 'vue'
import { Button, Combobox, NumberInput, type ComboboxItem } from '@moderno/vue'

export interface CategoryFiltersState {
  category?: string
  size?: string
  minPrice?: number
  maxPrice?: number
}

const props = withDefaults(
  defineProps<{
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
  }>(),
  {
    heading: 'Filtros',
    categoryLabel: 'Categoría',
    categoryPlaceholder: 'Buscar categoría',
    categories: () => [
      { label: 'Sillas', value: 'sillas' },
      { label: 'Mesas', value: 'mesas' },
      { label: 'Iluminación', value: 'iluminacion' },
      { label: 'Textiles', value: 'textiles' },
      { label: 'Almacenamiento', value: 'almacenamiento' },
    ],
    sizeLabel: 'Talla',
    sizes: () => ['S', 'M', 'L', 'XL'],
    priceLabel: 'Precio',
    minPriceLabel: 'Mínimo',
    maxPriceLabel: 'Máximo',
    applyLabel: 'Aplicar filtros',
    resetLabel: 'Limpiar',
  },
)

const emit = defineEmits<{ apply: [filters: CategoryFiltersState]; reset: [] }>()

const category = ref<string[]>(props.defaultCategory ? [props.defaultCategory] : [])
const size = ref<string | undefined>(props.defaultSize)
const minPrice = ref<number | undefined>(props.defaultMinPrice)
const maxPrice = ref<number | undefined>(props.defaultMaxPrice)

function selectSize(option: string) {
  size.value = option === size.value ? undefined : option
}

function onMinPriceChange(_value: string, valueAsNumber: number) {
  minPrice.value = valueAsNumber
}

function onMaxPriceChange(_value: string, valueAsNumber: number) {
  maxPrice.value = valueAsNumber
}

function handleApply() {
  emit('apply', { category: category.value[0], size: size.value, minPrice: minPrice.value, maxPrice: maxPrice.value })
}

function handleReset() {
  category.value = []
  size.value = undefined
  minPrice.value = undefined
  maxPrice.value = undefined
  emit('reset')
}
</script>

<template>
  <aside class="md-category-filters" :aria-label="heading">
    <h2 v-if="heading" class="md-category-filters__heading">{{ heading }}</h2>
    <div class="md-category-filters__section">
      <Combobox
        :label="categoryLabel"
        :items="categories"
        :placeholder="categoryPlaceholder"
        v-model="category"
      />
    </div>
    <div class="md-category-filters__section">
      <span class="md-category-filters__section-label">{{ sizeLabel }}</span>
      <div class="md-category-filters__sizes" role="group" :aria-label="sizeLabel">
        <button
          v-for="option in sizes"
          :key="option"
          type="button"
          class="md-category-filters__size"
          :class="{ 'md-category-filters__size--active': option === size }"
          :aria-pressed="option === size"
          @click="selectSize(option)"
        >
          {{ option }}
        </button>
      </div>
    </div>
    <div class="md-category-filters__section">
      <span class="md-category-filters__section-label">{{ priceLabel }}</span>
      <div class="md-category-filters__price-row">
        <NumberInput
          :label="minPriceLabel"
          :default-value="defaultMinPrice"
          :min="0"
          @update:model-value="onMinPriceChange"
        />
        <NumberInput
          :label="maxPriceLabel"
          :default-value="defaultMaxPrice"
          :min="0"
          @update:model-value="onMaxPriceChange"
        />
      </div>
    </div>
    <div class="md-category-filters__actions">
      <Button variant="secondary" style="flex: 1" @click="handleReset">{{ resetLabel }}</Button>
      <Button variant="primary" style="flex: 1" @click="handleApply">{{ applyLabel }}</Button>
    </div>
  </aside>
</template>

<style scoped>
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
