<script setup lang="ts">
// Moderno block — Application Shells (Vue). Copy-paste; edit freely.
// Full-page application frame: collapsible sidebar (brand, nav with active-item
// highlight, user/sign-out footer), a topbar (sidebar toggle, page title,
// notifications, user menu) and a scrollable main content slot. Uses the
// Avatar + Badge + Button + Divider primitives + Moderno tokens. Mount it inside
// a full-height container (e.g. `#root { height: 100vh }`) — the shell fills 100%
// of its parent rather than forcing the viewport height itself.
import { computed, ref } from 'vue'
import { Avatar, Badge, Button, Divider } from '@moderno/vue'

export interface ApplicationShellsNavItem {
  id: string
  label: string
  href?: string
}

export interface ApplicationShellsUser {
  name: string
  role?: string
  avatarInitials?: string
  avatarSrc?: string
}

const defaultNavItems: ApplicationShellsNavItem[] = [
  { id: 'overview', label: 'Resumen', href: '#' },
  { id: 'orders', label: 'Pedidos', href: '#' },
  { id: 'customers', label: 'Clientes', href: '#' },
  { id: 'products', label: 'Productos', href: '#' },
  { id: 'settings', label: 'Configuración', href: '#' },
]

const defaultUser: ApplicationShellsUser = { name: 'Ana Torres', role: 'Administradora', avatarInitials: 'AT' }

const props = defineProps<{
  brandLabel?: string
  brandHref?: string
  navItems?: ApplicationShellsNavItem[]
  defaultActiveItem?: string
  pageTitle?: string
  user?: ApplicationShellsUser
  unreadCount?: number
}>()
const emit = defineEmits<{
  navItemClick: [item: ApplicationShellsNavItem]
  signOut: []
  notificationsClick: []
  userMenuClick: []
}>()

const brandLabel = computed(() => props.brandLabel ?? 'Moderno')
const brandHref = computed(() => props.brandHref ?? '#')
const navItems = computed(() => props.navItems ?? defaultNavItems)
const user = computed(() => props.user ?? defaultUser)
const unreadCount = computed(() => props.unreadCount ?? 3)

const activeItem = ref(props.defaultActiveItem ?? navItems.value[0]?.id)
const sidebarOpen = ref(true)

const activeNavItem = computed(() => navItems.value.find((item) => item.id === activeItem.value) ?? navItems.value[0])

function handleNavClick(event: MouseEvent, item: ApplicationShellsNavItem) {
  event.preventDefault()
  activeItem.value = item.id
  emit('navItemClick', item)
}
</script>

<template>
  <div class="md-app-shell">
    <aside
      class="md-app-shell__sidebar"
      :class="{ 'md-app-shell__sidebar--closed': !sidebarOpen }"
      aria-label="Barra lateral"
    >
      <div class="md-app-shell__sidebar-inner">
        <div class="md-app-shell__brand">
          <a :href="brandHref" class="md-app-shell__brand-link">{{ brandLabel }}</a>
        </div>
        <nav class="md-app-shell__nav">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="item.href ?? '#'"
            class="md-app-shell__nav-item"
            :class="{ 'md-app-shell__nav-item--active': item.id === activeItem }"
            :aria-current="item.id === activeItem ? 'page' : undefined"
            @click="handleNavClick($event, item)"
          >
            {{ item.label }}
          </a>
        </nav>
        <Divider />
        <div class="md-app-shell__footer">
          <div class="md-app-shell__user-row">
            <Avatar size="sm" :initials="user.avatarInitials" :src="user.avatarSrc" :alt="user.name" />
            <div>
              <div class="md-app-shell__user-name">{{ user.name }}</div>
              <div v-if="user.role" class="md-app-shell__user-role">{{ user.role }}</div>
            </div>
          </div>
          <Button variant="secondary" size="sm" class="md-app-shell__signout" @click="emit('signOut')">
            Cerrar sesión
          </Button>
        </div>
      </div>
    </aside>
    <div class="md-app-shell__main-column">
      <header class="md-app-shell__topbar">
        <div class="md-app-shell__topbar-left">
          <Button
            variant="secondary"
            size="sm"
            :aria-label="sidebarOpen ? 'Ocultar barra lateral' : 'Mostrar barra lateral'"
            :aria-pressed="sidebarOpen"
            @click="sidebarOpen = !sidebarOpen"
          >
            ☰
          </Button>
          <h1 class="md-app-shell__page-title">{{ pageTitle ?? activeNavItem?.label }}</h1>
        </div>
        <div class="md-app-shell__topbar-right">
          <div class="md-app-shell__notifications">
            <Button variant="secondary" size="sm" aria-label="Notificaciones" @click="emit('notificationsClick')">
              🔔
            </Button>
            <Badge v-if="unreadCount > 0" variant="error" dot>{{ unreadCount }}</Badge>
          </div>
          <Divider orientation="vertical" />
          <button
            type="button"
            class="md-app-shell__user-button"
            aria-label="Menú de usuario"
            @click="emit('userMenuClick')"
          >
            <Avatar size="sm" :initials="user.avatarInitials" :src="user.avatarSrc" :alt="user.name" />
            <span class="md-app-shell__user-button-name">{{ user.name }}</span>
          </button>
        </div>
      </header>
      <main class="md-app-shell__content">
        <slot>
          <div>
            <h2 class="md-app-shell__content-title">{{ activeNavItem?.label }}</h2>
            <p class="md-app-shell__content-body">Esta es el área de contenido del shell — reemplázala con tu página.</p>
          </div>
        </slot>
      </main>
    </div>
  </div>
</template>

<style scoped>
.md-app-shell {
  display: flex;
  height: 100%;
  min-height: 0;
  background: var(--md-surface-base);
  border: 1px solid var(--md-border-default);
  overflow: hidden;
}
.md-app-shell__sidebar {
  flex-shrink: 0;
  overflow: hidden;
  width: 240px;
  background: var(--md-surface-muted);
  border-right: 1px solid var(--md-border-default);
  transition: width 0.15s ease, border-color 0.15s ease;
  display: flex;
  flex-direction: column;
}
.md-app-shell__sidebar--closed {
  width: 0;
  border-right-color: transparent;
}
.md-app-shell__sidebar-inner {
  width: 240px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.md-app-shell__brand {
  padding: 20px;
  border-bottom: 1px solid var(--md-border-default);
}
.md-app-shell__brand-link {
  font-family: var(--md-font-serif);
  font-size: var(--md-text-headline-md);
  color: var(--md-text-primary);
  text-decoration: none;
}
.md-app-shell__nav {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.md-app-shell__nav-item {
  display: block;
  padding: 8px 12px;
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
  text-decoration: none;
  white-space: nowrap;
}
.md-app-shell__nav-item--active {
  color: var(--md-text-primary);
  font-weight: 600;
  background: var(--md-border-default);
}
.md-app-shell__footer {
  padding: 0 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.md-app-shell__user-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.md-app-shell__user-name {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-primary);
  font-weight: 500;
}
.md-app-shell__user-role {
  font-size: var(--md-text-label-md);
  color: var(--md-text-secondary);
}
.md-app-shell__signout {
  width: 100%;
}
.md-app-shell__main-column {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}
.md-app-shell__topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: 64px;
  flex-shrink: 0;
  padding: 0 24px;
  border-bottom: 1px solid var(--md-border-default);
}
.md-app-shell__topbar-left {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
}
.md-app-shell__topbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}
.md-app-shell__page-title {
  font-family: var(--md-font-serif);
  font-size: var(--md-text-headline-md);
  color: var(--md-text-primary);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.md-app-shell__notifications {
  display: flex;
  align-items: center;
  gap: 6px;
}
.md-app-shell__user-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: inherit;
  font: inherit;
}
.md-app-shell__user-button-name {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-primary);
  white-space: nowrap;
}
.md-app-shell__content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}
.md-app-shell__content-title {
  font-family: var(--md-font-serif);
  font-size: var(--md-text-headline-lg);
  color: var(--md-text-primary);
  margin: 0 0 8px;
}
.md-app-shell__content-body {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
  margin: 0;
}
</style>
