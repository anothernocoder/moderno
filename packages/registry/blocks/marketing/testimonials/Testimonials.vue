<script setup lang="ts">
// Moderno block — Testimonials (Vue). Copy-paste; edit freely.
// Social proof section: centered header above a grid of customer quotes with author and avatar.
// Uses the Card + Avatar primitives + Moderno tokens.
import { Avatar, Card } from '@moderno/vue'

export interface TestimonialItem {
  quote: string
  name: string
  role?: string
  avatarSrc?: string
  initials?: string
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      'Moderno nos permitió lanzar el rediseño completo en dos semanas, sin reescribir la lógica de interacción por framework.',
    name: 'Marta Gómez',
    role: 'Head of Design, Nimbus',
    initials: 'MG',
  },
  {
    quote:
      'La misma API en React, Vue, Svelte y Solid nos dejó compartir un solo design system entre equipos con stacks distintos.',
    name: 'Carlos Peña',
    role: 'Frontend Lead, Kairos',
    initials: 'CP',
  },
  {
    quote: 'Los tokens --md-* hicieron trivial tematizar toda la app sin tocar un solo componente.',
    name: 'Sofía Iglesias',
    role: 'Product Engineer, Vela',
    initials: 'SI',
  },
]

const props = withDefaults(
  defineProps<{
    kicker?: string
    title?: string
    subtitle?: string
    items?: TestimonialItem[]
  }>(),
  {
    kicker: 'Testimonios',
    title: 'Lo que dicen nuestros clientes',
    subtitle: 'Equipos de todos los tamaños construyen con Moderno.',
  },
)

const items = props.items ?? DEFAULT_TESTIMONIALS
</script>

<template>
  <section class="md-testimonials">
    <div class="md-testimonials__header">
      <p class="md-testimonials__kicker">{{ kicker }}</p>
      <h2 class="md-testimonials__title">{{ title }}</h2>
      <p class="md-testimonials__subtitle">{{ subtitle }}</p>
    </div>
    <div class="md-testimonials__grid">
      <Card v-for="item in items" :key="item.name">
        <p class="md-testimonials__quote">&ldquo;{{ item.quote }}&rdquo;</p>
        <template #footer>
          <div class="md-testimonials__author">
            <Avatar :src="item.avatarSrc" :initials="item.initials" :alt="item.name" size="sm" />
            <div>
              <p class="md-testimonials__author-name">{{ item.name }}</p>
              <p v-if="item.role" class="md-testimonials__author-role">{{ item.role }}</p>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </section>
</template>

<style scoped>
.md-testimonials {
  padding: 96px 24px;
  background: var(--md-surface-base);
}
.md-testimonials__header {
  text-align: center;
  margin: 0 auto 56px;
  max-width: 640px;
}
.md-testimonials__kicker {
  font-size: var(--md-text-label-sm);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--md-text-secondary);
  margin: 0 0 16px;
}
.md-testimonials__title {
  font-family: var(--md-font-serif);
  font-size: 36px;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--md-text-primary);
  margin: 0 0 16px;
}
.md-testimonials__subtitle {
  font-size: var(--md-text-body-lg);
  line-height: var(--md-text-body-lg-lh);
  color: var(--md-text-secondary);
  margin: 0;
}
.md-testimonials__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  max-width: 1040px;
  margin: 0 auto;
}
.md-testimonials__quote {
  font-size: var(--md-text-body-md);
  line-height: var(--md-text-body-md-lh);
  color: var(--md-text-primary);
  margin: 0;
}
.md-testimonials__author {
  display: flex;
  align-items: center;
  gap: 12px;
}
.md-testimonials__author-name {
  font-size: var(--md-text-label-md);
  font-weight: 600;
  color: var(--md-text-primary);
  margin: 0;
}
.md-testimonials__author-role {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
  margin: 0;
}
</style>
