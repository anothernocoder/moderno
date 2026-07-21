<script lang="ts">
  // Moderno block — BlogHeader (Svelte). Copy-paste; edit freely.
  // Index/landing header for a blog: centered kicker/title/subtitle above a row of category chips.
  // Uses the Chip primitive + Moderno tokens.
  import { Chip } from '@moderno/svelte'

  const DEFAULT_CATEGORIES = ['Producto', 'Ingeniería', 'Diseño']

  let {
    kicker = 'Blog',
    title = 'Ideas, historias y aprendizajes del equipo',
    subtitle = 'Reflexiones sobre diseño, ingeniería y producto, directo desde quienes construyen Moderno.',
    categories = DEFAULT_CATEGORIES,
  }: {
    kicker?: string
    title?: string
    subtitle?: string
    categories?: string[]
  } = $props()
</script>

<section class="md-blog-header">
  <div class="md-blog-header__header">
    <p class="md-blog-header__kicker">{kicker}</p>
    <h1 class="md-blog-header__title">{title}</h1>
    <p class="md-blog-header__subtitle">{subtitle}</p>
  </div>
  <div class="md-blog-header__categories">
    {#each categories as category (category)}
      <Chip>{category}</Chip>
    {/each}
  </div>
</section>

<style>
  .md-blog-header {
    padding: 96px 24px;
    text-align: center;
    background: var(--md-surface-base);
  }
  .md-blog-header__header {
    margin: 0 auto;
    max-width: 640px;
  }
  .md-blog-header__kicker {
    font-size: var(--md-text-label-sm);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--md-text-secondary);
    margin: 0 0 16px;
  }
  .md-blog-header__title {
    font-family: var(--md-font-serif);
    font-size: 36px;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--md-text-primary);
    margin: 0 0 16px;
  }
  .md-blog-header__subtitle {
    font-size: var(--md-text-body-lg);
    line-height: var(--md-text-body-lg-lh);
    color: var(--md-text-secondary);
    margin: 0;
  }
  .md-blog-header__categories {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
  }
</style>
