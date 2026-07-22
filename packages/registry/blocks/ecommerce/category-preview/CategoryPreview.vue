<script setup lang="ts">
// Moderno block — CategoryPreview (Vue). Copy-paste; edit freely.
// Grid of category tiles (image + label) linking into a storefront's category
// pages. Plain layout + `--md-*` tokens, no primitives, no bespoke interaction logic.

interface CategoryPreviewItem {
  id: string
  label: string
  image?: string
  href: string
}

withDefaults(
  defineProps<{
    heading?: string
    categories?: CategoryPreviewItem[]
  }>(),
  {
    heading: 'Comprar por categoría',
    categories: () => [
      { id: 'sillas', label: 'Sillas', image: '', href: '#sillas' },
      { id: 'mesas', label: 'Mesas', image: '', href: '#mesas' },
      { id: 'iluminacion', label: 'Iluminación', image: '', href: '#iluminacion' },
      { id: 'textiles', label: 'Textiles', image: '', href: '#textiles' },
    ],
  },
)

const emit = defineEmits<{
  'category-click': [category: CategoryPreviewItem]
}>()
</script>

<template>
  <section class="md-category-preview" :aria-label="heading">
    <h2 v-if="heading" class="md-category-preview__heading">{{ heading }}</h2>
    <div class="md-category-preview__grid">
      <a
        v-for="category in categories"
        :key="category.id"
        :href="category.href"
        class="md-category-preview__tile"
        @click="emit('category-click', category)"
      >
        <div
          class="md-category-preview__image"
          :style="category.image ? { backgroundImage: `url(${category.image})` } : undefined"
        />
        <p class="md-category-preview__label">{{ category.label }}</p>
      </a>
    </div>
  </section>
</template>

<style scoped>
.md-category-preview {
  padding: 48px 24px;
  background: var(--md-surface-base);
}
.md-category-preview__heading {
  font-family: var(--md-font-serif);
  font-size: 28px;
  line-height: 1.15;
  color: var(--md-text-primary);
  text-align: center;
  margin: 0 0 24px;
}
.md-category-preview__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  max-width: 1040px;
  margin: 0 auto;
}
.md-category-preview__tile {
  display: block;
  color: inherit;
  text-decoration: none;
}
.md-category-preview__image {
  aspect-ratio: 1 / 1;
  background: var(--md-surface-muted);
  border: 1px solid var(--md-border-default);
  background-size: cover;
  background-position: center;
  margin-bottom: 12px;
}
.md-category-preview__label {
  font-size: var(--md-text-body-md);
  color: var(--md-text-primary);
  font-weight: 500;
  text-align: center;
  margin: 0;
}
</style>
