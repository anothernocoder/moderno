<script setup lang="ts">
// Moderno block — Footer (Vue). Copy-paste; edit freely.
// Site footer: logo/tagline, navigation link columns, legal links, social links, and copyright.
// Uses the Divider primitive + Moderno tokens.
import { computed } from 'vue'
import { Divider } from '@moderno/vue'

export interface FooterLink {
  label: string
  href: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: 'Producto',
    links: [
      { label: 'Características', href: '#' },
      { label: 'Precios', href: '#' },
      { label: 'Documentación', href: '#' },
    ],
  },
  {
    title: 'Compañía',
    links: [
      { label: 'Sobre nosotros', href: '#' },
      { label: 'Carreras', href: '#' },
      { label: 'Blog', href: '#' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Guías', href: '#' },
      { label: 'Soporte', href: '#' },
      { label: 'Comunidad', href: '#' },
    ],
  },
]

const DEFAULT_SOCIAL_LINKS: FooterLink[] = [
  { label: 'Twitter', href: '#' },
  { label: 'GitHub', href: '#' },
  { label: 'LinkedIn', href: '#' },
]

const DEFAULT_LEGAL_LINKS: FooterLink[] = [
  { label: 'Privacidad', href: '#' },
  { label: 'Términos', href: '#' },
]

const props = withDefaults(
  defineProps<{
    logoLabel?: string
    logoHref?: string
    tagline?: string
    columns?: FooterColumn[]
    socialLinks?: FooterLink[]
    legalLinks?: FooterLink[]
    copyright?: string
  }>(),
  {
    logoLabel: 'Moderno',
    logoHref: '#',
    tagline: 'Componentes y blocks para construir producto rápido.',
    copyright: '© 2026 Moderno. Todos los derechos reservados.',
  },
)

const columns = computed(() => props.columns ?? DEFAULT_COLUMNS)
const socialLinks = computed(() => props.socialLinks ?? DEFAULT_SOCIAL_LINKS)
const legalLinks = computed(() => props.legalLinks ?? DEFAULT_LEGAL_LINKS)
</script>

<template>
  <footer class="md-footer">
    <div class="md-footer__top">
      <div class="md-footer__brand">
        <a :href="logoHref" class="md-footer__logo">{{ logoLabel }}</a>
        <p v-if="tagline" class="md-footer__tagline">{{ tagline }}</p>
      </div>
      <div class="md-footer__columns">
        <div v-for="column in columns" :key="column.title" class="md-footer__column">
          <h3 class="md-footer__column-title">{{ column.title }}</h3>
          <ul class="md-footer__link-list">
            <li v-for="link in column.links" :key="link.label">
              <a :href="link.href" class="md-footer__link">{{ link.label }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Divider />
    <div class="md-footer__bottom">
      <p class="md-footer__copyright">{{ copyright }}</p>
      <div class="md-footer__legal">
        <a v-for="link in legalLinks" :key="link.label" :href="link.href" class="md-footer__legal-link">
          {{ link.label }}
        </a>
      </div>
      <div class="md-footer__social">
        <a v-for="link in socialLinks" :key="link.label" :href="link.href" class="md-footer__social-link">
          {{ link.label }}
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.md-footer {
  padding: 64px 24px 32px;
  background: var(--md-surface-base);
  border-top: 1px solid var(--md-border-default);
}
.md-footer__top {
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
  max-width: 1040px;
  margin: 0 auto;
  padding-bottom: 48px;
}
.md-footer__brand {
  flex: 1 1 240px;
  max-width: 320px;
}
.md-footer__logo {
  font-family: var(--md-font-serif);
  font-size: 20px;
  color: var(--md-text-primary);
  text-decoration: none;
}
.md-footer__tagline {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
  margin: 12px 0 0;
}
.md-footer__columns {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  flex: 2 1 480px;
}
.md-footer__column {
  min-width: 140px;
}
.md-footer__column-title {
  font-size: var(--md-text-label-sm);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--md-text-primary);
  margin: 0 0 16px;
}
.md-footer__link-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
  padding: 0;
}
.md-footer__link {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
  text-decoration: none;
}
.md-footer__bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  max-width: 1040px;
  margin: 0 auto;
  padding-top: 24px;
}
.md-footer__copyright {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
  margin: 0;
}
.md-footer__legal {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.md-footer__legal-link {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
  text-decoration: none;
}
.md-footer__social {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.md-footer__social-link {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-primary);
  text-decoration: none;
}
</style>
