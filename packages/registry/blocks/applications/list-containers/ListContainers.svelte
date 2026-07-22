<script lang="ts">
  // Moderno block — List containers (Svelte). Copy-paste; edit freely.
  // A specialized container for lists: a fixed header, a scrollable body (overflow-y: auto
  // on a bounded-height wrapper) holding the row items, and a footer with a summary + action.
  // Uses the Avatar + Badge + Button + Divider primitives + Moderno tokens — no bespoke
  // interaction logic, just layout.
  import { Avatar, Badge, Button, Divider } from '@moderno/svelte'

  type ListContainerItemStatusVariant = 'neutral' | 'solid' | 'success' | 'warning' | 'error' | 'info'

  interface ListContainerItem {
    id: string
    title: string
    subtitle?: string
    meta?: string
    avatarSrc?: string
    avatarInitials?: string
    status?: string
    statusVariant?: ListContainerItemStatusVariant
  }

  const defaultItems: ListContainerItem[] = [
    { id: '1', title: 'Diseñar el flujo de onboarding', subtitle: 'Producto', meta: 'Vence hoy', status: 'En curso', statusVariant: 'info' },
    { id: '2', title: 'Revisar copy de checkout', subtitle: 'Contenido', meta: 'Vence mañana', status: 'Pendiente', statusVariant: 'warning' },
    { id: '3', title: 'Migrar tokens de color', subtitle: 'Diseño', meta: 'Hace 1 d', status: 'Completada', statusVariant: 'success' },
    { id: '4', title: 'Auditoría de accesibilidad', subtitle: 'QA', meta: 'Hace 2 d', status: 'Bloqueada', statusVariant: 'error' },
    { id: '5', title: 'Actualizar guía de marca', subtitle: 'Marketing', meta: 'Hace 3 d', status: 'Completada', statusVariant: 'success' },
    { id: '6', title: 'Preparar demo de release', subtitle: 'Producto', meta: 'Hace 4 d', status: 'En curso', statusVariant: 'info' },
  ]

  let {
    title = 'Tareas del sprint',
    description = 'Pendientes del equipo, ordenadas por fecha de vencimiento.',
    items = defaultItems,
    maxBodyHeight = '280px',
    footerLabel = 'Ver todas las tareas',
    onFooterAction,
  }: {
    title?: string
    description?: string
    items?: ListContainerItem[]
    maxBodyHeight?: string
    footerLabel?: string
    onFooterAction?: () => void
  } = $props()
</script>

<section class="md-list-containers">
  <div class="md-list-containers__header">
    <h2 class="md-list-containers__title">{title}</h2>
    {#if description}<p class="md-list-containers__description">{description}</p>{/if}
  </div>
  <div class="md-list-containers__body" style="max-height: {maxBodyHeight}">
    {#each items as item, index (item.id)}
      <div class="md-list-containers__row">
        <Avatar src={item.avatarSrc} initials={item.avatarInitials} alt={item.title} size="md" />
        <div class="md-list-containers__text">
          <p class="md-list-containers__item-title">{item.title}</p>
          {#if item.subtitle}<p class="md-list-containers__subtitle">{item.subtitle}</p>{/if}
        </div>
        {#if item.status}<Badge variant={item.statusVariant} dot>{item.status}</Badge>{/if}
        {#if item.meta}<span class="md-list-containers__meta">{item.meta}</span>{/if}
      </div>
      {#if index < items.length - 1}<Divider />{/if}
    {/each}
  </div>
  <div class="md-list-containers__footer">
    <p class="md-list-containers__footer-meta">{items.length} tareas</p>
    <Button variant="secondary" size="sm" onclick={onFooterAction}>{footerLabel}</Button>
  </div>
</section>

<style>
  .md-list-containers {
    display: flex;
    flex-direction: column;
    background: var(--md-surface-base);
    border: 1px solid var(--md-border-default);
  }
  .md-list-containers__header {
    padding: 20px 24px;
    border-bottom: 1px solid var(--md-border-default);
  }
  .md-list-containers__title {
    font-family: var(--md-font-serif);
    font-size: 20px;
    color: var(--md-text-primary);
    margin: 0 0 4px;
  }
  .md-list-containers__description {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
    margin: 0;
  }
  .md-list-containers__body {
    overflow-y: auto;
  }
  .md-list-containers__row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 24px;
  }
  .md-list-containers__text {
    flex: 1;
    min-width: 0;
  }
  .md-list-containers__item-title {
    margin: 0;
    font-size: var(--md-text-body-sm);
    font-weight: 500;
    color: var(--md-text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .md-list-containers__subtitle {
    margin: 0;
    font-size: var(--md-text-label-sm);
    color: var(--md-text-secondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .md-list-containers__meta {
    font-size: var(--md-text-label-sm);
    color: var(--md-text-secondary);
    white-space: nowrap;
  }
  .md-list-containers__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 24px;
    border-top: 1px solid var(--md-border-default);
  }
  .md-list-containers__footer-meta {
    font-size: var(--md-text-label-sm);
    color: var(--md-text-secondary);
    margin: 0;
  }
</style>
