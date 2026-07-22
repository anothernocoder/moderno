<script setup lang="ts">
// Moderno block — StoreNav (Vue). Copy-paste; edit freely.
// E-commerce storefront header navigation: logo, category links, a search field,
// and a cart icon with an item-count badge. Uses the Badge + Input primitives +
// Moderno tokens.
import { ref } from 'vue'
import { Badge, Input } from '@moderno/vue'

interface StoreNavCategory {
  label: string
  href: string
}

const props = withDefaults(
  defineProps<{
    logoLabel?: string
    logoHref?: string
    categories?: StoreNavCategory[]
    searchPlaceholder?: string
    defaultSearchQuery?: string
    cartCount?: number
  }>(),
  {
    logoLabel: 'Moderno Store',
    logoHref: '#',
    categories: () => [
      { label: 'Nuevo', href: '#' },
      { label: 'Mujer', href: '#' },
      { label: 'Hombre', href: '#' },
      { label: 'Ofertas', href: '#' },
    ],
    searchPlaceholder: 'Buscar productos...',
    defaultSearchQuery: '',
    cartCount: 3,
  },
)

const emit = defineEmits<{ search: [query: string]; cartClick: [] }>()

const query = ref(props.defaultSearchQuery)

function handleSubmit() {
  emit('search', query.value)
}
</script>

<template>
  <header class="md-store-nav">
    <div class="md-store-nav__row">
      <a :href="logoHref" class="md-store-nav__logo">{{ logoLabel }}</a>
      <nav class="md-store-nav__nav" aria-label="Categorías">
        <a v-for="category in categories" :key="category.label" :href="category.href" class="md-store-nav__nav-link">
          {{ category.label }}
        </a>
      </nav>
      <div class="md-store-nav__actions">
        <form class="md-store-nav__search" role="search" @submit.prevent="handleSubmit">
          <Input type="search" aria-label="Buscar productos" :placeholder="searchPlaceholder" v-model="query" />
        </form>
        <button
          type="button"
          class="md-store-nav__cart"
          :aria-label="`Carrito, ${cartCount} artículos`"
          @click="emit('cartClick')"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h3l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span v-if="cartCount > 0" class="md-store-nav__cart-badge">
            <Badge variant="solid">{{ cartCount }}</Badge>
          </span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.md-store-nav {
  background: var(--md-surface-base);
  border-bottom: 1px solid var(--md-border-default);
}
.md-store-nav__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  max-width: 1040px;
  margin: 0 auto;
  padding: 16px 24px;
}
.md-store-nav__logo {
  font-family: var(--md-font-serif);
  font-size: 20px;
  color: var(--md-text-primary);
  text-decoration: none;
}
.md-store-nav__nav {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}
.md-store-nav__nav-link {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
  text-decoration: none;
  white-space: nowrap;
}
.md-store-nav__actions {
  display: flex;
  align-items: center;
  gap: 16px;
}
.md-store-nav__search {
  min-width: 160px;
}
.md-store-nav__cart {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  background: none;
  border: none;
  color: var(--md-text-primary);
  cursor: pointer;
}
.md-store-nav__cart-badge {
  position: absolute;
  top: -6px;
  right: -6px;
}
</style>
