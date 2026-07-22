<script setup lang="ts">
// Moderno block — PageCardSectionHeaders (Vue). Copy-paste; edit freely.
// Header family for application views: a page header (breadcrumbs, title, actions,
// status/meta), a card header (title, subtitle, actions) and a section with a top
// header bar and a bottom summary/actions bar.
// Uses the Button + Badge + Card + Divider primitives + Moderno tokens.
import { Badge, Button, Card, Divider } from '@moderno/vue'

export interface PageHeaderBreadcrumb {
  label: string
  href?: string
}

const props = withDefaults(
  defineProps<{
    breadcrumbs?: PageHeaderBreadcrumb[]
    pageTitle?: string
    pageDescription?: string
    pageStatus?: string
    pageMeta?: string
    primaryLabel?: string
    secondaryLabel?: string
    cardTitle?: string
    cardSubtitle?: string
    cardBody?: string
    cardActionLabel?: string
    sectionTitle?: string
    sectionDescription?: string
    sectionActionLabel?: string
    sectionBody?: string
    sectionSummary?: string
    sectionBarActionLabel?: string
    sectionBarPrimaryLabel?: string
  }>(),
  {
    breadcrumbs: () => [{ label: 'Panel', href: '#' }, { label: 'Proyectos', href: '#' }, { label: 'Rediseño Q3' }],
    pageTitle: 'Rediseño Q3',
    pageDescription: 'Plan de lanzamiento y seguimiento de tareas del proyecto.',
    pageStatus: 'Activo',
    pageMeta: 'Actualizado hace 2 horas por Marta Gómez',
    primaryLabel: 'Nueva tarea',
    secondaryLabel: 'Compartir',
    cardTitle: 'Miembros del equipo',
    cardSubtitle: '6 personas con acceso a este proyecto',
    cardBody: 'Marta Gómez, Carlos Peña, Sofía Iglesias y 3 personas más colaboran aquí.',
    cardActionLabel: 'Invitar',
    sectionTitle: 'Actividad reciente',
    sectionDescription: 'Últimos cambios en las tareas del proyecto.',
    sectionActionLabel: 'Ver todo',
    sectionBody: 'Sofía Iglesias completó “Wireframes de checkout” hace 1 hora.',
    sectionSummary: '12 tareas · 3 completadas hoy',
    sectionBarActionLabel: 'Exportar',
    sectionBarPrimaryLabel: 'Marcar completadas',
  },
)

const emit = defineEmits<{
  primaryAction: []
  secondaryAction: []
  cardAction: []
  sectionAction: []
  sectionBarAction: []
  sectionBarPrimaryAction: []
}>()
</script>

<template>
  <div class="md-page-card-section-headers">
    <header class="md-page-card-section-headers__page">
      <nav v-if="props.breadcrumbs?.length" aria-label="Breadcrumb" class="md-page-card-section-headers__breadcrumb-nav">
        <ol class="md-page-card-section-headers__breadcrumb-list">
          <li v-for="(item, index) in props.breadcrumbs" :key="item.label" class="md-page-card-section-headers__breadcrumb-item">
            <a
              v-if="item.href && index !== props.breadcrumbs.length - 1"
              :href="item.href"
              class="md-page-card-section-headers__breadcrumb-link"
            >
              {{ item.label }}
            </a>
            <span
              v-else
              :class="
                index === props.breadcrumbs.length - 1
                  ? 'md-page-card-section-headers__breadcrumb-current'
                  : 'md-page-card-section-headers__breadcrumb-link'
              "
              :aria-current="index === props.breadcrumbs.length - 1 ? 'page' : undefined"
            >
              {{ item.label }}
            </span>
            <span v-if="index !== props.breadcrumbs.length - 1" class="md-page-card-section-headers__breadcrumb-sep" aria-hidden="true">
              /
            </span>
          </li>
        </ol>
      </nav>
      <div class="md-page-card-section-headers__row">
        <div>
          <h1 class="md-page-card-section-headers__page-title">{{ pageTitle }}</h1>
          <p v-if="pageDescription" class="md-page-card-section-headers__page-description">{{ pageDescription }}</p>
        </div>
        <div v-if="primaryLabel || secondaryLabel" class="md-page-card-section-headers__actions">
          <Button v-if="secondaryLabel" variant="secondary" size="sm" @click="emit('secondaryAction')">{{ secondaryLabel }}</Button>
          <Button v-if="primaryLabel" variant="primary" size="sm" @click="emit('primaryAction')">{{ primaryLabel }}</Button>
        </div>
      </div>
      <div v-if="pageStatus || pageMeta" class="md-page-card-section-headers__page-meta-row">
        <Badge v-if="pageStatus" dot>{{ pageStatus }}</Badge>
        <p v-if="pageMeta" class="md-page-card-section-headers__page-meta-text">{{ pageMeta }}</p>
      </div>
    </header>

    <Card>
      <div class="md-page-card-section-headers__row">
        <div>
          <h3 class="md-page-card-section-headers__card-title">{{ cardTitle }}</h3>
          <p v-if="cardSubtitle" class="md-page-card-section-headers__card-subtitle">{{ cardSubtitle }}</p>
        </div>
        <Button v-if="cardActionLabel" variant="secondary" size="sm" @click="emit('cardAction')">{{ cardActionLabel }}</Button>
      </div>
      <template v-if="cardBody">
        <div class="md-page-card-section-headers__card-divider"><Divider /></div>
        <p class="md-page-card-section-headers__card-body">{{ cardBody }}</p>
      </template>
    </Card>

    <div class="md-page-card-section-headers__section">
      <div class="md-page-card-section-headers__section-header-row">
        <div>
          <h2 class="md-page-card-section-headers__section-title">{{ sectionTitle }}</h2>
          <p v-if="sectionDescription" class="md-page-card-section-headers__section-description">{{ sectionDescription }}</p>
        </div>
        <Button v-if="sectionActionLabel" variant="secondary" size="sm" @click="emit('sectionAction')">{{ sectionActionLabel }}</Button>
      </div>
      <div v-if="sectionBody" class="md-page-card-section-headers__section-body">{{ sectionBody }}</div>
      <div class="md-page-card-section-headers__section-bar">
        <p v-if="sectionSummary" class="md-page-card-section-headers__section-bar-summary">{{ sectionSummary }}</p>
        <div v-if="sectionBarActionLabel || sectionBarPrimaryLabel" class="md-page-card-section-headers__actions">
          <Button v-if="sectionBarActionLabel" variant="secondary" size="sm" @click="emit('sectionBarAction')">
            {{ sectionBarActionLabel }}
          </Button>
          <Button v-if="sectionBarPrimaryLabel" variant="primary" size="sm" @click="emit('sectionBarPrimaryAction')">
            {{ sectionBarPrimaryLabel }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
