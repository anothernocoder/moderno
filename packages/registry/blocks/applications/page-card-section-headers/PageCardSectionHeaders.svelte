<script lang="ts">
  // Moderno block — PageCardSectionHeaders (Svelte). Copy-paste; edit freely.
  // Header family for application views: a page header (breadcrumbs, title, actions,
  // status/meta), a card header (title, subtitle, actions) and a section with a top
  // header bar and a bottom summary/actions bar.
  // Uses the Button + Badge + Card + Divider primitives + Moderno tokens.
  import { Badge, Button, Card, Divider } from '@moderno/svelte'

  export interface PageHeaderBreadcrumb {
    label: string
    href?: string
  }

  const defaultBreadcrumbs: PageHeaderBreadcrumb[] = [
    { label: 'Panel', href: '#' },
    { label: 'Proyectos', href: '#' },
    { label: 'Rediseño Q3' },
  ]

  let {
    breadcrumbs = defaultBreadcrumbs,
    pageTitle = 'Rediseño Q3',
    pageDescription = 'Plan de lanzamiento y seguimiento de tareas del proyecto.',
    pageStatus = 'Activo',
    pageMeta = 'Actualizado hace 2 horas por Marta Gómez',
    primaryLabel = 'Nueva tarea',
    onPrimaryAction,
    secondaryLabel = 'Compartir',
    onSecondaryAction,
    cardTitle = 'Miembros del equipo',
    cardSubtitle = '6 personas con acceso a este proyecto',
    cardBody = 'Marta Gómez, Carlos Peña, Sofía Iglesias y 3 personas más colaboran aquí.',
    cardActionLabel = 'Invitar',
    onCardAction,
    sectionTitle = 'Actividad reciente',
    sectionDescription = 'Últimos cambios en las tareas del proyecto.',
    sectionActionLabel = 'Ver todo',
    onSectionAction,
    sectionBody = 'Sofía Iglesias completó “Wireframes de checkout” hace 1 hora.',
    sectionSummary = '12 tareas · 3 completadas hoy',
    sectionBarActionLabel = 'Exportar',
    onSectionBarAction,
    sectionBarPrimaryLabel = 'Marcar completadas',
    onSectionBarPrimaryAction,
  }: {
    breadcrumbs?: PageHeaderBreadcrumb[]
    pageTitle?: string
    pageDescription?: string
    pageStatus?: string
    pageMeta?: string
    primaryLabel?: string
    onPrimaryAction?: () => void
    secondaryLabel?: string
    onSecondaryAction?: () => void
    cardTitle?: string
    cardSubtitle?: string
    cardBody?: string
    cardActionLabel?: string
    onCardAction?: () => void
    sectionTitle?: string
    sectionDescription?: string
    sectionActionLabel?: string
    onSectionAction?: () => void
    sectionBody?: string
    sectionSummary?: string
    sectionBarActionLabel?: string
    onSectionBarAction?: () => void
    sectionBarPrimaryLabel?: string
    onSectionBarPrimaryAction?: () => void
  } = $props()
</script>

<div class="md-page-card-section-headers">
  <header class="md-page-card-section-headers__page">
    {#if breadcrumbs.length}
      <nav aria-label="Breadcrumb" class="md-page-card-section-headers__breadcrumb-nav">
        <ol class="md-page-card-section-headers__breadcrumb-list">
          {#each breadcrumbs as item, index (item.label)}
            <li class="md-page-card-section-headers__breadcrumb-item">
              {#if item.href && index !== breadcrumbs.length - 1}
                <a href={item.href} class="md-page-card-section-headers__breadcrumb-link">{item.label}</a>
              {:else}
                <span
                  class={index === breadcrumbs.length - 1
                    ? 'md-page-card-section-headers__breadcrumb-current'
                    : 'md-page-card-section-headers__breadcrumb-link'}
                  aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
                >
                  {item.label}
                </span>
              {/if}
              {#if index !== breadcrumbs.length - 1}
                <span class="md-page-card-section-headers__breadcrumb-sep" aria-hidden="true">/</span>
              {/if}
            </li>
          {/each}
        </ol>
      </nav>
    {/if}
    <div class="md-page-card-section-headers__row">
      <div>
        <h1 class="md-page-card-section-headers__page-title">{pageTitle}</h1>
        {#if pageDescription}
          <p class="md-page-card-section-headers__page-description">{pageDescription}</p>
        {/if}
      </div>
      {#if primaryLabel || secondaryLabel}
        <div class="md-page-card-section-headers__actions">
          {#if secondaryLabel}
            <Button variant="secondary" size="sm" onclick={onSecondaryAction}>{secondaryLabel}</Button>
          {/if}
          {#if primaryLabel}
            <Button variant="primary" size="sm" onclick={onPrimaryAction}>{primaryLabel}</Button>
          {/if}
        </div>
      {/if}
    </div>
    {#if pageStatus || pageMeta}
      <div class="md-page-card-section-headers__page-meta-row">
        {#if pageStatus}
          <Badge dot>{pageStatus}</Badge>
        {/if}
        {#if pageMeta}
          <p class="md-page-card-section-headers__page-meta-text">{pageMeta}</p>
        {/if}
      </div>
    {/if}
  </header>

  <Card>
    <div class="md-page-card-section-headers__row">
      <div>
        <h3 class="md-page-card-section-headers__card-title">{cardTitle}</h3>
        {#if cardSubtitle}
          <p class="md-page-card-section-headers__card-subtitle">{cardSubtitle}</p>
        {/if}
      </div>
      {#if cardActionLabel}
        <Button variant="secondary" size="sm" onclick={onCardAction}>{cardActionLabel}</Button>
      {/if}
    </div>
    {#if cardBody}
      <div class="md-page-card-section-headers__card-divider"><Divider /></div>
      <p class="md-page-card-section-headers__card-body">{cardBody}</p>
    {/if}
  </Card>

  <div class="md-page-card-section-headers__section">
    <div class="md-page-card-section-headers__section-header-row">
      <div>
        <h2 class="md-page-card-section-headers__section-title">{sectionTitle}</h2>
        {#if sectionDescription}
          <p class="md-page-card-section-headers__section-description">{sectionDescription}</p>
        {/if}
      </div>
      {#if sectionActionLabel}
        <Button variant="secondary" size="sm" onclick={onSectionAction}>{sectionActionLabel}</Button>
      {/if}
    </div>
    {#if sectionBody}
      <div class="md-page-card-section-headers__section-body">{sectionBody}</div>
    {/if}
    <div class="md-page-card-section-headers__section-bar">
      {#if sectionSummary}
        <p class="md-page-card-section-headers__section-bar-summary">{sectionSummary}</p>
      {/if}
      {#if sectionBarActionLabel || sectionBarPrimaryLabel}
        <div class="md-page-card-section-headers__actions">
          {#if sectionBarActionLabel}
            <Button variant="secondary" size="sm" onclick={onSectionBarAction}>{sectionBarActionLabel}</Button>
          {/if}
          {#if sectionBarPrimaryLabel}
            <Button variant="primary" size="sm" onclick={onSectionBarPrimaryAction}>{sectionBarPrimaryLabel}</Button>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .md-page-card-section-headers {
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 24px;
    background: var(--md-surface-base);
  }
  .md-page-card-section-headers__row {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }
  .md-page-card-section-headers__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }

  .md-page-card-section-headers__breadcrumb-nav {
    margin: 0 0 12px;
  }
  .md-page-card-section-headers__breadcrumb-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .md-page-card-section-headers__breadcrumb-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .md-page-card-section-headers__breadcrumb-link {
    font-size: var(--md-text-label-sm);
    color: var(--md-text-secondary);
    text-decoration: none;
  }
  .md-page-card-section-headers__breadcrumb-current {
    font-size: var(--md-text-label-sm);
    color: var(--md-text-primary);
  }
  .md-page-card-section-headers__breadcrumb-sep {
    color: var(--md-text-tertiary);
    font-size: var(--md-text-label-sm);
  }

  .md-page-card-section-headers__page-title {
    font-family: var(--md-font-serif);
    font-size: 28px;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--md-text-primary);
    margin: 0;
  }
  .md-page-card-section-headers__page-description {
    font-size: var(--md-text-body-md);
    line-height: var(--md-text-body-md-lh);
    color: var(--md-text-secondary);
    margin: 8px 0 0;
  }
  .md-page-card-section-headers__page-meta-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 16px 0 0;
  }
  .md-page-card-section-headers__page-meta-text {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
    margin: 0;
  }

  .md-page-card-section-headers__card-title {
    font-size: var(--md-text-headline-md);
    line-height: var(--md-text-headline-md-lh);
    font-weight: 600;
    color: var(--md-text-primary);
    margin: 0;
  }
  .md-page-card-section-headers__card-subtitle {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
    margin: 4px 0 0;
  }
  .md-page-card-section-headers__card-divider {
    margin: 16px 0;
  }
  .md-page-card-section-headers__card-body {
    font-size: var(--md-text-body-md);
    line-height: var(--md-text-body-md-lh);
    color: var(--md-text-secondary);
    margin: 0;
  }

  .md-page-card-section-headers__section {
    background: var(--md-surface-base);
    border: 1px solid var(--md-border-default);
  }
  .md-page-card-section-headers__section-header-row {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    padding: 16px 20px;
    border-bottom: 1px solid var(--md-border-default);
  }
  .md-page-card-section-headers__section-title {
    font-size: var(--md-text-headline-md);
    line-height: var(--md-text-headline-md-lh);
    font-weight: 600;
    color: var(--md-text-primary);
    margin: 0;
  }
  .md-page-card-section-headers__section-description {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
    margin: 4px 0 0;
  }
  .md-page-card-section-headers__section-body {
    padding: 20px;
    font-size: var(--md-text-body-md);
    line-height: var(--md-text-body-md-lh);
    color: var(--md-text-secondary);
  }
  .md-page-card-section-headers__section-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 20px;
    border-top: 1px solid var(--md-border-strong);
  }
  .md-page-card-section-headers__section-bar-summary {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
    margin: 0;
  }
</style>
