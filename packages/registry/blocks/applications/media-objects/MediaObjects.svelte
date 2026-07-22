<script lang="ts">
  // Moderno block — Media objects (Svelte). Copy-paste; edit freely.
  // Media + text layout: a list of rows pairing an Avatar (image or initials fallback) with a
  // heading, body copy and an optional meta line — the classic "media object" pattern for
  // comments, activity, or contact lists. Uses the Avatar primitive + Moderno tokens.
  import { Avatar } from '@moderno/svelte'

  interface MediaObjectItem {
    id: string
    heading: string
    body: string
    meta?: string
    avatarSrc?: string
    avatarAlt?: string
    initials: string
  }

  const defaultItems: MediaObjectItem[] = [
    {
      id: 'valentina-rios',
      heading: 'Valentina Ríos',
      body: 'El nuevo flujo de checkout se ve mucho más claro. ¿Podemos aplicar el mismo patrón en el panel de pedidos?',
      meta: 'Hace 10 min',
      initials: 'VR',
    },
    {
      id: 'mateo-fernandez',
      heading: 'Mateo Fernández',
      body: 'Buen trabajo con los estados vacíos. Sugiero agregar un ícono ilustrativo para reforzar el mensaje.',
      meta: 'Hace 1 h',
      initials: 'MF',
    },
    {
      id: 'sofia-castillo',
      heading: 'Sofía Castillo',
      body: 'Aprobado. Podemos pasar este componente a producción esta semana.',
      meta: 'Ayer',
      initials: 'SC',
    },
  ]

  let {
    title = 'Comentarios',
    description = 'Retroalimentación reciente del equipo sobre el diseño.',
    items = defaultItems,
  }: {
    title?: string
    description?: string
    items?: MediaObjectItem[]
  } = $props()
</script>

<section class="md-media-objects">
  <div class="md-media-objects__header">
    <h2 class="md-media-objects__title">{title}</h2>
    {#if description}<p class="md-media-objects__description">{description}</p>{/if}
  </div>
  {#each items as item, index (item.id)}
    <div class="md-media-objects__row" class:md-media-objects__row--last={index === items.length - 1}>
      <Avatar size="md" src={item.avatarSrc} alt={item.avatarAlt} initials={item.initials} />
      <div class="md-media-objects__content">
        <p class="md-media-objects__heading">{item.heading}</p>
        <p class="md-media-objects__body">{item.body}</p>
        {#if item.meta}
          <p class="md-media-objects__meta">{item.meta}</p>
        {/if}
      </div>
    </div>
  {/each}
</section>

<style>
  .md-media-objects {
    background: var(--md-surface-base);
    border: 1px solid var(--md-border-default);
  }
  .md-media-objects__header {
    padding: 20px 24px;
    border-bottom: 1px solid var(--md-border-default);
  }
  .md-media-objects__title {
    font-family: var(--md-font-serif);
    font-size: 20px;
    color: var(--md-text-primary);
    margin: 0 0 4px;
  }
  .md-media-objects__description {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
    margin: 0;
  }
  .md-media-objects__row {
    display: flex;
    gap: 16px;
    padding: 20px 24px;
    border-bottom: 1px solid var(--md-border-default);
  }
  .md-media-objects__row--last {
    border-bottom: none;
  }
  .md-media-objects__content {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  }
  .md-media-objects__heading {
    font-size: var(--md-text-body-md);
    font-weight: 500;
    color: var(--md-text-primary);
    margin: 0;
  }
  .md-media-objects__body {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
    margin: 0;
    line-height: 1.5;
  }
  .md-media-objects__meta {
    font-size: var(--md-text-label-sm);
    color: var(--md-text-secondary);
    margin: 4px 0 0;
  }
</style>
