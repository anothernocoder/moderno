<script lang="ts">
  // Moderno block — PortfolioSections (Svelte). Copy-paste; edit freely.
  // Work showcase grid. Uses Moderno tokens only (no primitives).

  export interface PortfolioProject {
    title: string
    meta: string
    image?: string
    href: string
  }

  const DEFAULT_PROJECTS: PortfolioProject[] = [
    { title: 'Moderno — sistema de diseño', meta: 'Design systems · 2025', href: '#moderno-sistema-de-diseno' },
    { title: 'Checkout de Rappi Turbo', meta: 'Producto · 2024', href: '#checkout-rappi-turbo' },
    { title: 'Rediseño de app bancaria', meta: 'Fintech · 2023', href: '#rediseno-app-bancaria' },
    { title: 'Dashboard de analítica para Platzi', meta: 'Data viz · 2022', href: '#dashboard-analitica-platzi' },
  ]

  let {
    projects = DEFAULT_PROJECTS,
    onSelect,
  }: {
    projects?: PortfolioProject[]
    onSelect?: (project: PortfolioProject) => void
  } = $props()
</script>

<section class="md-portfolio">
  {#each projects as project (project.href)}
    <a
      href={project.href}
      class="md-portfolio__card"
      onclick={() => onSelect?.(project)}
    >
      <div
        class="md-portfolio__image"
        style:background-image={project.image ? `url(${project.image})` : undefined}
      ></div>
      <div class="md-portfolio__meta">
        <div>
          <p class="md-portfolio__title">{project.title}</p>
          <p class="md-portfolio__submeta">{project.meta}</p>
        </div>
        <span class="md-portfolio__arrow">→</span>
      </div>
    </a>
  {/each}
</section>

<style>
  .md-portfolio {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }
  .md-portfolio__card {
    display: block;
    overflow: hidden;
    background: var(--md-surface-base);
    border: 1px solid var(--md-border-default);
    text-decoration: none;
    transition: border-color 0.15s ease;
  }
  .md-portfolio__card:hover {
    border-color: var(--md-border-strong);
  }
  .md-portfolio__image {
    aspect-ratio: 16 / 10;
    background-color: var(--md-surface-muted);
    background-size: cover;
    background-position: center;
  }
  .md-portfolio__meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 20px;
  }
  .md-portfolio__title {
    font-size: var(--md-text-body-md);
    color: var(--md-text-primary);
    margin: 0;
    text-underline-offset: 4px;
  }
  .md-portfolio__card:hover .md-portfolio__title {
    text-decoration: underline;
  }
  .md-portfolio__submeta {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
    margin: 4px 0 0;
  }
  .md-portfolio__arrow {
    color: var(--md-text-secondary);
    transition: transform 0.15s ease, color 0.15s ease;
  }
  .md-portfolio__card:hover .md-portfolio__arrow {
    color: var(--md-text-primary);
    transform: translateX(4px);
  }
</style>
