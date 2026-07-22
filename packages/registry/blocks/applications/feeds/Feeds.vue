<script setup lang="ts">
// Moderno block — Feeds (Vue). Copy-paste; edit freely.
// Activity feed / timeline: avatar connected by a vertical rail, actor + action text,
// an optional status tag, and a timestamp. Uses the Avatar + Badge primitives + Moderno tokens.
import { Avatar, Badge } from '@moderno/vue'

export type FeedTagVariant = 'neutral' | 'solid' | 'success' | 'warning' | 'error' | 'info'

export interface FeedItem {
  id: string
  actor: string
  initials: string
  action: string
  timestamp: string
  tag?: string
  tagVariant?: FeedTagVariant
}

withDefaults(
  defineProps<{
    items?: FeedItem[]
  }>(),
  {
    items: () => [
      {
        id: '1',
        actor: 'Bruno Café',
        initials: 'BC',
        action: 'actualizó el estado del pedido PED-1104 a',
        tag: 'Despachado',
        tagVariant: 'success',
        timestamp: 'Hace 5 min',
      },
      {
        id: '2',
        actor: 'Verde Logística',
        initials: 'VL',
        action: 'agregó una nota al pedido PED-1103',
        timestamp: 'Hace 32 min',
      },
      {
        id: '3',
        actor: 'Kapital Foods',
        initials: 'KF',
        action: 'creó el pedido PED-1102',
        tag: 'Nuevo',
        tagVariant: 'info',
        timestamp: 'Hace 2 h',
      },
      {
        id: '4',
        actor: 'Sistema',
        initials: 'SI',
        action: 'canceló el pedido PED-1101 por falta de pago',
        tag: 'Cancelado',
        tagVariant: 'error',
        timestamp: 'Ayer',
      },
    ],
  },
)
</script>

<template>
  <div class="md-feeds">
    <ul class="md-feeds__list">
      <li v-for="(item, index) in items" :key="item.id" class="md-feeds__item">
        <div class="md-feeds__rail">
          <Avatar size="sm" :initials="item.initials" />
          <span v-if="index < items.length - 1" class="md-feeds__line" aria-hidden="true" />
        </div>
        <div class="md-feeds__content" :class="{ 'md-feeds__content--last': index === items.length - 1 }">
          <p class="md-feeds__text"><strong>{{ item.actor }}</strong> {{ item.action }}</p>
          <div class="md-feeds__meta">
            <Badge v-if="item.tag" :variant="item.tagVariant" dot>{{ item.tag }}</Badge>
            <span class="md-feeds__time">{{ item.timestamp }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.md-feeds {
  background: var(--md-surface-base);
  border: 1px solid var(--md-border-default);
  padding: 24px;
}
.md-feeds__list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.md-feeds__item {
  display: flex;
  gap: 12px;
}
.md-feeds__rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 28px;
  flex-shrink: 0;
}
.md-feeds__line {
  flex: 1;
  width: 2px;
  min-height: 16px;
  background: var(--md-border-default);
  margin: 4px 0;
}
.md-feeds__content {
  flex: 1;
  padding-bottom: 20px;
}
.md-feeds__content--last {
  padding-bottom: 0;
}
.md-feeds__text {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-primary);
  margin: 0 0 6px;
  line-height: 1.4;
}
.md-feeds__meta {
  display: flex;
  align-items: center;
  gap: 8px;
}
.md-feeds__time {
  font-size: var(--md-text-label-sm);
  color: var(--md-text-secondary);
}
</style>
