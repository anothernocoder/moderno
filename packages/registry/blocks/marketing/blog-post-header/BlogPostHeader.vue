<script setup lang="ts">
// Moderno block — BlogPostHeader (Vue). Copy-paste; edit freely.
// Single-article header: category badge, large title, subtitle and an author/date/read-time meta row.
// Uses the Avatar + Badge primitives + Moderno tokens.
import { Avatar, Badge } from '@moderno/vue'

withDefaults(
  defineProps<{
    category?: string
    title?: string
    subtitle?: string
    author?: string
    date?: string
    readTime?: string
    avatarSrc?: string
    initials?: string
  }>(),
  {
    category: 'Ingeniería',
    title: 'Cómo escalamos nuestro sistema de diseño a cuatro frameworks',
    subtitle:
      'Una mirada al proceso detrás de construir Moderno: componentes headless, tokens compartidos y una sola fuente de verdad para React, Vue, Svelte y Solid.',
    author: 'Marta Gómez',
    date: '12 mar 2025',
    readTime: '6 min de lectura',
    initials: 'MG',
  },
)
</script>

<template>
  <header class="md-blog-post-header">
    <div class="md-blog-post-header__inner">
      <div v-if="category" class="md-blog-post-header__badge">
        <Badge>{{ category }}</Badge>
      </div>
      <h1 class="md-blog-post-header__title">{{ title }}</h1>
      <p class="md-blog-post-header__subtitle">{{ subtitle }}</p>
      <div class="md-blog-post-header__meta">
        <template v-if="author">
          <Avatar :src="avatarSrc" :initials="initials" :alt="author" size="sm" />
          <span class="md-blog-post-header__author">{{ author }}</span>
        </template>
        <span v-if="author && (date || readTime)" class="md-blog-post-header__text">&middot;</span>
        <span v-if="date" class="md-blog-post-header__text">{{ date }}</span>
        <span v-if="date && readTime" class="md-blog-post-header__text">&middot;</span>
        <span v-if="readTime" class="md-blog-post-header__text">{{ readTime }}</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.md-blog-post-header {
  padding: 96px 24px;
  text-align: center;
  background: var(--md-surface-base);
}
.md-blog-post-header__inner {
  margin: 0 auto;
  max-width: 720px;
}
.md-blog-post-header__badge {
  margin: 0 0 16px;
}
.md-blog-post-header__title {
  font-family: var(--md-font-serif);
  font-size: 40px;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--md-text-primary);
  margin: 0 0 16px;
}
.md-blog-post-header__subtitle {
  font-size: var(--md-text-body-lg);
  line-height: var(--md-text-body-lg-lh);
  color: var(--md-text-secondary);
  margin: 0 0 32px;
}
.md-blog-post-header__meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.md-blog-post-header__author {
  font-size: var(--md-text-label-md);
  font-weight: 600;
  color: var(--md-text-primary);
}
.md-blog-post-header__text {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
}
</style>
