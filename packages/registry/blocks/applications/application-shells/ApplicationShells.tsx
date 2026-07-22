import { useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react'
import { Avatar, Badge, Button, Divider } from '@moderno/react'

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
  children?: ReactNode
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

const wrapperStyle: CSSProperties = {
  display: 'flex',
  height: '100%',
  minHeight: 0,
  background: 'var(--md-surface-base)',
  border: '1px solid var(--md-border-default)',
  overflow: 'hidden',
}
const sidebarBaseStyle: CSSProperties = {
  flexShrink: 0,
  overflow: 'hidden',
  background: 'var(--md-surface-muted)',
  transition: 'width 0.15s ease, border-color 0.15s ease',
  display: 'flex',
  flexDirection: 'column',
}
const sidebarInnerStyle: CSSProperties = {
  width: '240px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}
const brandRowStyle: CSSProperties = { padding: '20px', borderBottom: '1px solid var(--md-border-default)' }
const brandLinkStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: 'var(--md-text-headline-md)',
  color: 'var(--md-text-primary)',
  textDecoration: 'none',
}
const navListStyle: CSSProperties = {
  flex: 1,
  overflowY: 'auto',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
}
const footerStyle: CSSProperties = { padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }
const userRowStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: '10px' }
const userNameStyle: CSSProperties = { fontSize: 'var(--md-text-body-sm)', color: 'var(--md-text-primary)', fontWeight: 500 }
const userRoleStyle: CSSProperties = { fontSize: 'var(--md-text-label-md)', color: 'var(--md-text-secondary)' }
const mainColumnStyle: CSSProperties = { display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }
const topbarStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
  height: '64px',
  flexShrink: 0,
  padding: '0 24px',
  borderBottom: '1px solid var(--md-border-default)',
}
const topbarLeftStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: '16px', minWidth: 0 }
const topbarRightStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }
const pageTitleStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: 'var(--md-text-headline-md)',
  color: 'var(--md-text-primary)',
  margin: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}
const notificationsWrapStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: '6px' }
const userButtonStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  color: 'inherit',
  font: 'inherit',
}
const userButtonNameStyle: CSSProperties = { fontSize: 'var(--md-text-body-sm)', color: 'var(--md-text-primary)', whiteSpace: 'nowrap' }
const mainStyle: CSSProperties = { flex: 1, overflowY: 'auto', padding: '24px' }
const contentTitleStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: 'var(--md-text-headline-lg)',
  color: 'var(--md-text-primary)',
  margin: '0 0 8px',
}
const contentBodyStyle: CSSProperties = { fontSize: 'var(--md-text-body-sm)', color: 'var(--md-text-secondary)', margin: 0 }

function navItemStyle(active: boolean): CSSProperties {
  return {
    display: 'block',
    padding: '8px 12px',
    fontSize: 'var(--md-text-body-sm)',
    color: active ? 'var(--md-text-primary)' : 'var(--md-text-secondary)',
    fontWeight: active ? 600 : 400,
    background: active ? 'var(--md-border-default)' : 'transparent',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  }
}

function sidebarStyle(open: boolean): CSSProperties {
  return {
    ...sidebarBaseStyle,
    width: open ? '240px' : '0px',
    borderRight: open ? '1px solid var(--md-border-default)' : '1px solid transparent',
  }
}

/**
 * Moderno block — Application Shells (React). Copy-paste; edit freely.
 * Full-page application frame: collapsible sidebar (brand, nav with active-item
 * highlight, user/sign-out footer), a topbar (sidebar toggle, page title,
 * notifications, user menu) and a scrollable main content slot. Uses the
 * Avatar + Badge + Button + Divider primitives + Moderno tokens. Mount it inside
 * a full-height container (e.g. `#root { height: 100vh }`) — the shell fills 100%
 * of its parent rather than forcing the viewport height itself.
 */
export function ApplicationShells({
  brandLabel = 'Moderno',
  brandHref = '#',
  navItems = DEFAULT_NAV_ITEMS,
  defaultActiveItem,
  pageTitle,
  user = DEFAULT_USER,
  unreadCount = 3,
  children,
  onNavItemClick,
  onSignOut,
  onNotificationsClick,
  onUserMenuClick,
}: ApplicationShellsProps) {
  const [activeItem, setActiveItem] = useState(defaultActiveItem ?? navItems[0]?.id)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const activeNavItem = navItems.find((item) => item.id === activeItem) ?? navItems[0]

  function handleNavClick(event: MouseEvent<HTMLAnchorElement>, item: ApplicationShellsNavItem) {
    event.preventDefault()
    setActiveItem(item.id)
    onNavItemClick?.(item)
  }

  return (
    <div style={wrapperStyle}>
      <aside style={sidebarStyle(sidebarOpen)} aria-label="Barra lateral">
        <div style={sidebarInnerStyle}>
          <div style={brandRowStyle}>
            <a href={brandHref} style={brandLinkStyle}>
              {brandLabel}
            </a>
          </div>
          <nav style={navListStyle}>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href ?? '#'}
                style={navItemStyle(item.id === activeItem)}
                aria-current={item.id === activeItem ? 'page' : undefined}
                onClick={(event) => handleNavClick(event, item)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Divider />
          <div style={footerStyle}>
            <div style={userRowStyle}>
              <Avatar size="sm" initials={user.avatarInitials} src={user.avatarSrc} alt={user.name} />
              <div>
                <div style={userNameStyle}>{user.name}</div>
                {user.role ? <div style={userRoleStyle}>{user.role}</div> : null}
              </div>
            </div>
            <Button variant="secondary" size="sm" style={{ width: '100%' }} onClick={() => onSignOut?.()}>
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
              aria-label={sidebarOpen ? 'Ocultar barra lateral' : 'Mostrar barra lateral'}
              aria-pressed={sidebarOpen}
              onClick={() => setSidebarOpen((open) => !open)}
            >
              ☰
            </Button>
            <h1 style={pageTitleStyle}>{pageTitle ?? activeNavItem?.label}</h1>
          </div>
          <div style={topbarRightStyle}>
            <div style={notificationsWrapStyle}>
              <Button variant="secondary" size="sm" aria-label="Notificaciones" onClick={() => onNotificationsClick?.()}>
                🔔
              </Button>
              {unreadCount > 0 ? (
                <Badge variant="error" dot>
                  {unreadCount}
                </Badge>
              ) : null}
            </div>
            <Divider orientation="vertical" />
            <button type="button" style={userButtonStyle} aria-label="Menú de usuario" onClick={() => onUserMenuClick?.()}>
              <Avatar size="sm" initials={user.avatarInitials} src={user.avatarSrc} alt={user.name} />
              <span style={userButtonNameStyle}>{user.name}</span>
            </button>
          </div>
        </header>
        <main style={mainStyle}>
          {children ?? (
            <div>
              <h2 style={contentTitleStyle}>{activeNavItem?.label}</h2>
              <p style={contentBodyStyle}>Esta es el área de contenido del shell — reemplázala con tu página.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
