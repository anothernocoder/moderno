<script lang="ts">
  // Moderno block — List (Svelte). Copy-paste; edit freely.
  // Application record list: avatar, primary/secondary text, status badge, meta and a row
  // action — without Table's sorting, multi-select, or tabular columns. Uses the Avatar +
  // Badge + Button + Divider primitives + Moderno tokens.
  import { Avatar, Badge, Button, Divider } from '@moderno/svelte'

  export type ListItemStatusVariant = 'neutral' | 'solid' | 'success' | 'warning' | 'error' | 'info'

  export interface ListItem {
    id: string
    title: string
    subtitle?: string
    meta?: string
    avatarSrc?: string
    avatarInitials?: string
    status?: string
    statusVariant?: ListItemStatusVariant
  }

  const defaultItems: ListItem[] = [
    { id: '1', title: 'Bruno Café', subtitle: 'bruno@brunocafe.co', avatarInitials: 'BC', status: 'Activo', statusVariant: 'success', meta: 'Hace 2 h' },
    { id: '2', title: 'Verde Logística', subtitle: 'contacto@verdelog.com', avatarInitials: 'VL', status: 'Pendiente', statusVariant: 'warning', meta: 'Hace 1 d' },
    { id: '3', title: 'Kapital Foods', subtitle: 'hola@kapitalfoods.com', avatarInitials: 'KF', status: 'Inactivo', statusVariant: 'neutral', meta: 'Hace 5 d' },
    { id: '4', title: 'Norte Distribución', subtitle: 'ventas@nortedist.com', avatarInitials: 'ND', status: 'Activo', statusVariant: 'success', meta: 'Hace 3 h' },
  ]

  let {
    items = defaultItems,
    onItemAction,
  }: {
    items?: ListItem[]
    onItemAction?: (item: ListItem) => void
  } = $props()
</script>

<div class="md-list">
  {#each items as item, index (item.id)}
    <div class="md-list__row">
      <Avatar src={item.avatarSrc} initials={item.avatarInitials} alt={item.title} size="md" />
      <div class="md-list__text">
        <p class="md-list__title">{item.title}</p>
        {#if item.subtitle}
          <p class="md-list__subtitle">{item.subtitle}</p>
        {/if}
      </div>
      {#if item.status}
        <Badge variant={item.statusVariant} dot>{item.status}</Badge>
      {/if}
      {#if item.meta}
        <span class="md-list__meta">{item.meta}</span>
      {/if}
      <Button variant="secondary" size="sm" aria-label={`Acciones de ${item.title}`} onclick={() => onItemAction?.(item)}>
        ⋯
      </Button>
    </div>
    {#if index < items.length - 1}
      <Divider />
    {/if}
  {/each}
</div>

<style>
  .md-list {
    background: var(--md-surface-base);
    border: 1px solid var(--md-border-default);
  }
  .md-list__row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
  }
  .md-list__text {
    flex: 1;
    min-width: 0;
  }
  .md-list__title {
    margin: 0;
    font-size: var(--md-text-body-sm);
    font-weight: 500;
    color: var(--md-text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .md-list__subtitle {
    margin: 0;
    font-size: var(--md-text-label-sm);
    color: var(--md-text-secondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .md-list__meta {
    font-size: var(--md-text-label-sm);
    color: var(--md-text-secondary);
    white-space: nowrap;
  }
</style>
