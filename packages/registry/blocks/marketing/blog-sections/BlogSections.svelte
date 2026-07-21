<script lang="ts">
  // Moderno block — BlogSections (Svelte). Copy-paste; edit freely.
  // Post listing / preview grid: centered header above a responsive grid of post cards.
  // Uses the Card + Avatar + Badge primitives + Moderno tokens.
  import { Avatar, Badge, Card } from '@moderno/svelte'

  export interface BlogPostPreview {
    title: string
    excerpt: string
    author: string
    date: string
    avatarSrc?: string
    initials?: string
    category?: string
  }

  const DEFAULT_POSTS: BlogPostPreview[] = [
    {
      title: 'Cómo escalamos nuestro sistema de diseño a cuatro frameworks',
      excerpt:
        'Componentes headless, una sola API y estilos compartidos: así mantenemos React, Vue, Svelte y Solid en sincronía.',
      author: 'Marta Gómez',
      date: '12 mar 2025',
      initials: 'MG',
      category: 'Ingeniería',
    },
    {
      title: 'Tokens de diseño: la base de una marca coherente',
      excerpt:
        'Por qué apostamos por variables --md-* en lugar de valores fijos, y cómo eso simplifica tematizar toda la app.',
      author: 'Carlos Peña',
      date: '28 feb 2025',
      initials: 'CP',
      category: 'Diseño',
    },
    {
      title: 'De Figma a producción sin perder fidelidad',
      excerpt: 'El flujo que usamos para llevar cada componente del diseño al código sin sorpresas de último minuto.',
      author: 'Sofía Iglesias',
      date: '15 feb 2025',
      initials: 'SI',
      category: 'Producto',
    },
  ]

  let {
    kicker = 'Blog',
    title = 'Últimas publicaciones',
    subtitle = 'Notas del equipo sobre diseño, ingeniería y producto.',
    posts = DEFAULT_POSTS,
  }: {
    kicker?: string
    title?: string
    subtitle?: string
    posts?: BlogPostPreview[]
  } = $props()
</script>

<section class="md-blog-sections">
  <div class="md-blog-sections__header">
    <p class="md-blog-sections__kicker">{kicker}</p>
    <h2 class="md-blog-sections__title">{title}</h2>
    <p class="md-blog-sections__subtitle">{subtitle}</p>
  </div>
  <div class="md-blog-sections__grid">
    {#each posts as post (post.title)}
      <Card>
        {#if post.category}
          <div class="md-blog-sections__badge">
            <Badge>{post.category}</Badge>
          </div>
        {/if}
        <h3 class="md-blog-sections__post-title">{post.title}</h3>
        <p class="md-blog-sections__excerpt">{post.excerpt}</p>
        {#snippet footer()}
          <div class="md-blog-sections__meta">
            <Avatar src={post.avatarSrc} initials={post.initials} alt={post.author} size="sm" />
            <div>
              <p class="md-blog-sections__author-name">{post.author}</p>
              <p class="md-blog-sections__date">{post.date}</p>
            </div>
          </div>
        {/snippet}
      </Card>
    {/each}
  </div>
</section>

<style>
  .md-blog-sections {
    padding: 96px 24px;
    background: var(--md-surface-base);
  }
  .md-blog-sections__header {
    text-align: center;
    margin: 0 auto 56px;
    max-width: 640px;
  }
  .md-blog-sections__kicker {
    font-size: var(--md-text-label-sm);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--md-text-secondary);
    margin: 0 0 16px;
  }
  .md-blog-sections__title {
    font-family: var(--md-font-serif);
    font-size: 36px;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--md-text-primary);
    margin: 0 0 16px;
  }
  .md-blog-sections__subtitle {
    font-size: var(--md-text-body-lg);
    line-height: var(--md-text-body-lg-lh);
    color: var(--md-text-secondary);
    margin: 0;
  }
  .md-blog-sections__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    max-width: 1040px;
    margin: 0 auto;
  }
  .md-blog-sections__badge {
    margin: 0 0 12px;
  }
  .md-blog-sections__post-title {
    font-size: var(--md-text-headline-md);
    line-height: var(--md-text-headline-md-lh);
    font-weight: 600;
    color: var(--md-text-primary);
    margin: 0 0 8px;
  }
  .md-blog-sections__excerpt {
    font-size: var(--md-text-body-md);
    line-height: var(--md-text-body-md-lh);
    color: var(--md-text-secondary);
    margin: 0;
  }
  .md-blog-sections__meta {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .md-blog-sections__author-name {
    font-size: var(--md-text-label-md);
    font-weight: 600;
    color: var(--md-text-primary);
    margin: 0;
  }
  .md-blog-sections__date {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
    margin: 0;
  }
</style>
