<script lang="ts">
  // Moderno block — BlogPostHeader (Svelte). Copy-paste; edit freely.
  // Single-article header: category badge, large title, subtitle and an author/date/read-time meta row.
  // Uses the Avatar + Badge primitives + Moderno tokens.
  import { Avatar, Badge } from '@moderno/svelte'

  let {
    category = 'Ingeniería',
    title = 'Cómo escalamos nuestro sistema de diseño a cuatro frameworks',
    subtitle = 'Una mirada al proceso detrás de construir Moderno: componentes headless, tokens compartidos y una sola fuente de verdad para React, Vue, Svelte y Solid.',
    author = 'Marta Gómez',
    date = '12 mar 2025',
    readTime = '6 min de lectura',
    avatarSrc,
    initials = 'MG',
  }: {
    category?: string
    title?: string
    subtitle?: string
    author?: string
    date?: string
    readTime?: string
    avatarSrc?: string
    initials?: string
  } = $props()
</script>

<header class="md-blog-post-header">
  <div class="md-blog-post-header__inner">
    {#if category}
      <div class="md-blog-post-header__badge">
        <Badge>{category}</Badge>
      </div>
    {/if}
    <h1 class="md-blog-post-header__title">{title}</h1>
    <p class="md-blog-post-header__subtitle">{subtitle}</p>
    <div class="md-blog-post-header__meta">
      {#if author}
        <Avatar src={avatarSrc} {initials} alt={author} size="sm" />
        <span class="md-blog-post-header__author">{author}</span>
      {/if}
      {#if author && (date || readTime)}<span class="md-blog-post-header__text">&middot;</span>{/if}
      {#if date}<span class="md-blog-post-header__text">{date}</span>{/if}
      {#if date && readTime}<span class="md-blog-post-header__text">&middot;</span>{/if}
      {#if readTime}<span class="md-blog-post-header__text">{readTime}</span>{/if}
    </div>
  </div>
</header>

<style>
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
