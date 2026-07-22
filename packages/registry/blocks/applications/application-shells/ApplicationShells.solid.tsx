import { createMemo, createSignal, For, Show, type JSX } from 'solid-js'
import { Avatar, Badge, Button, Divider } from '@moderno/solid'

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

export interface ApplicationShellsProps {
  brandLabel?: string
  brandHref?: string
  navItems?: ApplicationShellsNavItem[]
  defaultActiveItem?: string
  pageTitle?: string
  user?: ApplicationShellsUser
  unreadCount?: number
  children?: JSX.Element
  onNavItemClick?: (item: ApplicationShellsNavItem) => void
  onSignOut?: () => void
  onNotificationsClick?: () => void
  onUserMenuClick?: () => void
}

const DEFAULT_NAV_ITEMS: ApplicationShellsNavItem[] = [
  { id: 'overview', label: 'Resumen', href: '#' },
  { id: 'orders', label: 'Pedidos', href: '#' },
  { id: 'customers', label: 'Clientes', href: '#' },
  { id: 'products', label: 'Productos', href: '#' },
  { id: 'settings', label: 'Configuración', href: '#' },
]

const DEFAULT_USER: ApplicationShellsUser = { name: 'Ana Torres', role: 'Administradora', avatarInitials: 'AT' }

const wrapperStyle: JSX.CSSProperties = {
  display: 'flex',
  height: '100%',
  'min-height': 0,
  background: 'var(--md-surface-base)',
  border: '1px solid var(--md-border-default)',
  overflow: 'hidden',
}
const sidebarInnerStyle: JSX.CSSProperties = {
  width: '240px',
  height: '100%',
  display: 'flex',
  'flex-direction': 'column',
}
const brandRowStyle: JSX.CSSProperties = { padding: '20px', 'border-bottom': '1px solid var(--md-border-default)' }
const brandLinkStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': 'var(--md-text-headline-md)',
  color: 'var(--md-text-primary)',
  'text-decoration': 'none',
}
const navListStyle: JSX.CSSProperties = {
  flex: 1,
  'overflow-y': 'auto',
  padding: '12px',
  display: 'flex',
  'flex-direction': 'column',
  gap: '2px',
}
const footerStyle: JSX.CSSProperties = { padding: '0 16px 16px', display: 'flex', 'flex-direction': 'column', gap: '12px' }
const userRowStyle: JSX.CSSProperties = { display: 'flex', 'align-items': 'center', gap: '10px' }
const userNameStyle: JSX.CSSProperties = { 'font-size': 'var(--md-text-body-sm)', color: 'var(--md-text-primary)', 'font-weight': 500 }
const userRoleStyle: JSX.CSSProperties = { 'font-size': 'var(--md-text-label-md)', color: 'var(--md-text-secondary)' }
const mainColumnStyle: JSX.CSSProperties = { display: 'flex', 'flex-direction': 'column', flex: 1, 'min-width': 0 }
const topbarStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'space-between',
  gap: '16px',
  height: '64px',
  'flex-shrink': 0,
  padding: '0 24px',
  'border-bottom': '1px solid var(--md-border-default)',
}
const topbarLeftStyle: JSX.CSSProperties = { display: 'flex', 'align-items': 'center', gap: '16px', 'min-width': 0 }
const topbarRightStyle: JSX.CSSProperties = { display: 'flex', 'align-items': 'center', gap: '12px', 'flex-shrink': 0 }
const pageTitleStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': 'var(--md-text-headline-md)',
  color: 'var(--md-text-primary)',
  margin: 0,
  overflow: 'hidden',
  'text-overflow': 'ellipsis',
  'white-space': 'nowrap',
}
const notificationsWrapStyle: JSX.CSSProperties = { display: 'flex', 'align-items': 'center', gap: '6px' }
const userButtonStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  gap: '8px',
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  color: 'inherit',
  font: 'inherit',
}
const userButtonNameStyle: JSX.CSSProperties = { 'font-size': 'var(--md-text-body-sm)', color: 'var(--md-text-primary)', 'white-space': 'nowrap' }
const mainStyle: JSX.CSSProperties = { flex: 1, 'overflow-y': 'auto', padding: '24px' }
const contentTitleStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': 'var(--md-text-headline-lg)',
  color: 'var(--md-text-primary)',
  margin: '0 0 8px',
}
const contentBodyStyle: JSX.CSSProperties = { 'font-size': 'var(--md-text-body-sm)', color: 'var(--md-text-secondary)', margin: 0 }

function navItemStyle(active: boolean): JSX.CSSProperties {
  return {
    display: 'block',
    padding: '8px 12px',
    'font-size': 'var(--md-text-body-sm)',
    color: active ? 'var(--md-text-primary)' : 'var(--md-text-secondary)',
    'font-weight': active ? 600 : 400,
    background: active ? 'var(--md-border-default)' : 'transparent',
    'text-decoration': 'none',
    'white-space': 'nowrap',
  }
}

function sidebarStyle(open: boolean): JSX.CSSProperties {
  return {
    'flex-shrink': 0,
    overflow: 'hidden',
    background: 'var(--md-surface-muted)',
    transition: 'width 0.15s ease, border-color 0.15s ease',
    display: 'flex',
    'flex-direction': 'column',
    width: open ? '240px' : '0px',
    'border-right': open ? '1px solid var(--md-border-default)' : '1px solid transparent',
  }
}

/**
 * Moderno block — Application Shells (Solid). Copy-paste; edit freely.
 * Full-page application frame: collapsible sidebar (brand, nav with active-item
 * highlight, user/sign-out footer), a topbar (sidebar toggle, page title,
 * notifications, user menu) and a scrollable main content slot. Uses the
 * Avatar + Badge + Button + Divider primitives + Moderno tokens. Mount it inside
 * a full-height container (e.g. `#root { height: 100vh }`) — the shell fills 100%
 * of its parent rather than forcing the viewport height itself.
 */
export function ApplicationShells(props: ApplicationShellsProps) {
  const navItems = () => props.navItems ?? DEFAULT_NAV_ITEMS
  const user = () => props.user ?? DEFAULT_USER
  const unreadCount = () => props.unreadCount ?? 3

  const [activeItem, setActiveItem] = createSignal(props.defaultActiveItem ?? navItems()[0]?.id)
  const [sidebarOpen, setSidebarOpen] = createSignal(true)

  const activeNavItem = createMemo(() => navItems().find((item) => item.id === activeItem()) ?? navItems()[0])

  function handleNavClick(event: MouseEvent, item: ApplicationShellsNavItem) {
    event.preventDefault()
    setActiveItem(item.id)
    props.onNavItemClick?.(item)
  }

  return (
    <div style={wrapperStyle}>
      <aside style={sidebarStyle(sidebarOpen())} aria-label="Barra lateral">
        <div style={sidebarInnerStyle}>
          <div style={brandRowStyle}>
            <a href={props.brandHref ?? '#'} style={brandLinkStyle}>
              {props.brandLabel ?? 'Moderno'}
            </a>
          </div>
          <nav style={navListStyle}>
            <For each={navItems()}>
              {(item) => (
                <a
                  href={item.href ?? '#'}
                  style={navItemStyle(item.id === activeItem())}
                  aria-current={item.id === activeItem() ? 'page' : undefined}
                  onClick={(event) => handleNavClick(event, item)}
                >
                  {item.label}
                </a>
              )}
            </For>
          </nav>
          <Divider />
          <div style={footerStyle}>
            <div style={userRowStyle}>
              <Avatar size="sm" initials={user().avatarInitials} src={user().avatarSrc} alt={user().name} />
              <div>
                <div style={userNameStyle}>{user().name}</div>
                <Show when={user().role}>
                  <div style={userRoleStyle}>{user().role}</div>
                </Show>
              </div>
            </div>
            <Button variant="secondary" size="sm" style={{ width: '100%' }} onClick={() => props.onSignOut?.()}>
              Cerrar sesión
            </Button>
          </div>
        </div>
      </aside>
      <div style={mainColumnStyle}>
        <header style={topbarStyle}>
          <div style={topbarLeftStyle}>
            <Button
              variant="secondary"
              size="sm"
              aria-label={sidebarOpen() ? 'Ocultar barra lateral' : 'Mostrar barra lateral'}
              aria-pressed={sidebarOpen()}
              onClick={() => setSidebarOpen((open) => !open)}
            >
              ☰
            </Button>
            <h1 style={pageTitleStyle}>{props.pageTitle ?? activeNavItem()?.label}</h1>
          </div>
          <div style={topbarRightStyle}>
            <div style={notificationsWrapStyle}>
              <Button variant="secondary" size="sm" aria-label="Notificaciones" onClick={() => props.onNotificationsClick?.()}>
                🔔
              </Button>
              <Show when={unreadCount() > 0}>
                <Badge variant="error" dot>
                  {unreadCount()}
                </Badge>
              </Show>
            </div>
            <Divider orientation="vertical" />
            <button type="button" style={userButtonStyle} aria-label="Menú de usuario" onClick={() => props.onUserMenuClick?.()}>
              <Avatar size="sm" initials={user().avatarInitials} src={user().avatarSrc} alt={user().name} />
              <span style={userButtonNameStyle}>{user().name}</span>
            </button>
          </div>
        </header>
        <main style={mainStyle}>
          <Show
            when={props.children}
            fallback={
              <div>
                <h2 style={contentTitleStyle}>{activeNavItem()?.label}</h2>
                <p style={contentBodyStyle}>Esta es el área de contenido del shell — reemplázala con tu página.</p>
              </div>
            }
          >
            {props.children}
          </Show>
        </main>
      </div>
    </div>
  )
}
