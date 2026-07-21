<script setup lang="ts">
// Moderno block — Header (Vue). Copy-paste; edit freely.
// Site header / marketing navigation: logo, nav links, and CTA button(s) in a top bar. Uses the Button primitive + Moderno tokens.
import { Button } from '@moderno/vue'

interface HeaderNavItem {
  label: string
  href: string
}

withDefaults(
  defineProps<{
    logoLabel?: string
    logoHref?: string
    navItems?: HeaderNavItem[]
    secondaryLabel?: string
    secondaryHref?: string
    ctaLabel?: string
    ctaHref?: string
  }>(),
  {
    logoLabel: 'Moderno',
    logoHref: '#',
    navItems: () => [
      { label: 'Producto', href: '#' },
      { label: 'Precios', href: '#' },
      { label: 'Documentación', href: '#' },
    ],
    secondaryLabel: 'Iniciar sesión',
    secondaryHref: '#',
    ctaLabel: 'Empezar ahora',
  },
)

const emit = defineEmits<{ cta: [] }>()
</script>

<template>
  <header class="md-header">
    <div class="md-header__row">
      <a :href="logoHref" class="md-header__logo">{{ logoLabel }}</a>
      <nav class="md-header__nav">
        <a v-for="item in navItems" :key="item.label" :href="item.href" class="md-header__nav-link">
          {{ item.label }}
        </a>
      </nav>
      <div class="md-header__actions">
        <a v-if="secondaryLabel" :href="secondaryHref" class="md-header__secondary-link">{{ secondaryLabel }}</a>
        <a v-if="ctaLabel && ctaHref" :href="ctaHref" class="md-header__cta-link">{{ ctaLabel }}</a>
        <Button v-else-if="ctaLabel" :label="ctaLabel" size="sm" @click="emit('cta')" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.md-header {
  background: var(--md-surface-base);
  border-bottom: 1px solid var(--md-border-default);
}
.md-header__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  max-width: 1040px;
  margin: 0 auto;
  padding: 16px 24px;
}
.md-header__logo {
  font-family: var(--md-font-serif);
  font-size: 20px;
  color: var(--md-text-primary);
  text-decoration: none;
}
.md-header__nav {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}
.md-header__nav-link {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
  text-decoration: none;
  white-space: nowrap;
}
.md-header__actions {
  display: flex;
  align-items: center;
  gap: 16px;
}
.md-header__secondary-link {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
  text-decoration: none;
  white-space: nowrap;
}
.md-header__cta-link {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-primary);
  font-weight: 600;
  text-decoration: underline;
  white-space: nowrap;
}
</style>
