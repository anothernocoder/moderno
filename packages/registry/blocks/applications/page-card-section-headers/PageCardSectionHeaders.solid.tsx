import { For, Show, type JSX } from 'solid-js'
import { Badge, Button, Card, Divider } from '@moderno/solid'

export interface PageHeaderBreadcrumb {
  label: string
  href?: string
}

export interface PageCardSectionHeadersProps {
  // Page header: title + description + breadcrumbs/meta + actions
  breadcrumbs?: PageHeaderBreadcrumb[]
  pageTitle?: string
  pageDescription?: string
  pageStatus?: string
  pageMeta?: string
  primaryLabel?: string
  onPrimaryAction?: () => void
  secondaryLabel?: string
  onSecondaryAction?: () => void

  // Card header: title + subtitle + actions, for a card/panel
  cardTitle?: string
  cardSubtitle?: string
  cardBody?: string
  cardActionLabel?: string
  onCardAction?: () => void

  // Section top bar (title + description + actions) and bottom bar (summary + actions)
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
}

const DEFAULT_BREADCRUMBS: PageHeaderBreadcrumb[] = [
  { label: 'Panel', href: '#' },
  { label: 'Proyectos', href: '#' },
  { label: 'Rediseño Q3' },
]

const breadcrumbNavStyle: JSX.CSSProperties = { margin: '0 0 12px' }
const breadcrumbListStyle: JSX.CSSProperties = {
  display: 'flex',
  'flex-wrap': 'wrap',
  'align-items': 'center',
  gap: '6px',
  margin: 0,
  padding: 0,
  'list-style': 'none',
}
const breadcrumbItemStyle: JSX.CSSProperties = { display: 'flex', 'align-items': 'center', gap: '6px' }
const breadcrumbLinkStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-label-sm)',
  color: 'var(--md-text-secondary)',
  'text-decoration': 'none',
}
const breadcrumbCurrentStyle: JSX.CSSProperties = { 'font-size': 'var(--md-text-label-sm)', color: 'var(--md-text-primary)' }
const breadcrumbSepStyle: JSX.CSSProperties = { color: 'var(--md-text-tertiary)', 'font-size': 'var(--md-text-label-sm)' }

const rowStyle: JSX.CSSProperties = {
  display: 'flex',
  'flex-wrap': 'wrap',
  'align-items': 'flex-start',
  'justify-content': 'space-between',
  gap: '16px',
}
const actionsRowStyle: JSX.CSSProperties = { display: 'flex', 'flex-wrap': 'wrap', 'align-items': 'center', gap: '8px' }

const demoStyle: JSX.CSSProperties = {
  display: 'flex',
  'flex-direction': 'column',
  gap: '32px',
  padding: '24px',
  background: 'var(--md-surface-base)',
}

const pageTitleStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '28px',
  'line-height': 1.15,
  'letter-spacing': '-0.01em',
  color: 'var(--md-text-primary)',
  margin: 0,
}
const pageDescriptionStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-md)',
  'line-height': 'var(--md-text-body-md-lh)',
  color: 'var(--md-text-secondary)',
  margin: '8px 0 0',
}
const pageMetaRowStyle: JSX.CSSProperties = { display: 'flex', 'align-items': 'center', gap: '8px', margin: '16px 0 0' }
const pageMetaTextStyle: JSX.CSSProperties = { 'font-size': 'var(--md-text-body-sm)', color: 'var(--md-text-secondary)', margin: 0 }

const cardHeaderTitleStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-headline-md)',
  'line-height': 'var(--md-text-headline-md-lh)',
  'font-weight': 600,
  color: 'var(--md-text-primary)',
  margin: 0,
}
const cardHeaderSubtitleStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: '4px 0 0',
}
const cardBodyTextStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-md)',
  'line-height': 'var(--md-text-body-md-lh)',
  color: 'var(--md-text-secondary)',
  margin: '16px 0 0',
}

const sectionWrapStyle: JSX.CSSProperties = { background: 'var(--md-surface-base)', border: '1px solid var(--md-border-default)' }
const sectionHeaderRowStyle: JSX.CSSProperties = {
  ...rowStyle,
  padding: '16px 20px',
  'border-bottom': '1px solid var(--md-border-default)',
}
const sectionTitleStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-headline-md)',
  'line-height': 'var(--md-text-headline-md-lh)',
  'font-weight': 600,
  color: 'var(--md-text-primary)',
  margin: 0,
}
const sectionDescriptionStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: '4px 0 0',
}
const sectionBodyStyle: JSX.CSSProperties = {
  padding: '20px',
  'font-size': 'var(--md-text-body-md)',
  'line-height': 'var(--md-text-body-md-lh)',
  color: 'var(--md-text-secondary)',
}
const sectionBarStyle: JSX.CSSProperties = {
  display: 'flex',
  'flex-wrap': 'wrap',
  'align-items': 'center',
  'justify-content': 'space-between',
  gap: '12px',
  padding: '12px 20px',
  'border-top': '1px solid var(--md-border-strong)',
}
const sectionBarSummaryStyle: JSX.CSSProperties = { 'font-size': 'var(--md-text-body-sm)', color: 'var(--md-text-secondary)', margin: 0 }

function Breadcrumbs(props: { items?: PageHeaderBreadcrumb[] }) {
  return (
    <Show when={props.items?.length}>
      <nav aria-label="Breadcrumb" style={breadcrumbNavStyle}>
        <ol style={breadcrumbListStyle}>
          <For each={props.items}>
            {(item, index) => {
              const isLast = () => index() === (props.items?.length ?? 0) - 1
              return (
                <li style={breadcrumbItemStyle}>
                  <Show
                    when={item.href && !isLast()}
                    fallback={
                      <span style={isLast() ? breadcrumbCurrentStyle : breadcrumbLinkStyle} aria-current={isLast() ? 'page' : undefined}>
                        {item.label}
                      </span>
                    }
                  >
                    <a href={item.href} style={breadcrumbLinkStyle}>
                      {item.label}
                    </a>
                  </Show>
                  <Show when={!isLast()}>
                    <span style={breadcrumbSepStyle} aria-hidden="true">
                      /
                    </span>
                  </Show>
                </li>
              )
            }}
          </For>
        </ol>
      </nav>
    </Show>
  )
}

function PageHeaderSection(props: {
  breadcrumbs?: PageHeaderBreadcrumb[]
  title: string
  description?: string
  status?: string
  meta?: string
  primaryLabel?: string
  onPrimaryAction?: () => void
  secondaryLabel?: string
  onSecondaryAction?: () => void
}) {
  return (
    <header>
      <Breadcrumbs items={props.breadcrumbs} />
      <div style={rowStyle}>
        <div>
          <h1 style={pageTitleStyle}>{props.title}</h1>
          <Show when={props.description}>
            <p style={pageDescriptionStyle}>{props.description}</p>
          </Show>
        </div>
        <Show when={props.primaryLabel || props.secondaryLabel}>
          <div style={actionsRowStyle}>
            <Show when={props.secondaryLabel}>
              <Button variant="secondary" size="sm" onClick={props.onSecondaryAction}>
                {props.secondaryLabel}
              </Button>
            </Show>
            <Show when={props.primaryLabel}>
              <Button variant="primary" size="sm" onClick={props.onPrimaryAction}>
                {props.primaryLabel}
              </Button>
            </Show>
          </div>
        </Show>
      </div>
      <Show when={props.status || props.meta}>
        <div style={pageMetaRowStyle}>
          <Show when={props.status}>
            <Badge dot>{props.status}</Badge>
          </Show>
          <Show when={props.meta}>
            <p style={pageMetaTextStyle}>{props.meta}</p>
          </Show>
        </div>
      </Show>
    </header>
  )
}

function CardHeaderSection(props: {
  title: string
  subtitle?: string
  body?: string
  actionLabel?: string
  onAction?: () => void
}) {
  return (
    <Card>
      <div style={rowStyle}>
        <div>
          <h3 style={cardHeaderTitleStyle}>{props.title}</h3>
          <Show when={props.subtitle}>
            <p style={cardHeaderSubtitleStyle}>{props.subtitle}</p>
          </Show>
        </div>
        <Show when={props.actionLabel}>
          <Button variant="secondary" size="sm" onClick={props.onAction}>
            {props.actionLabel}
          </Button>
        </Show>
      </div>
      <Show when={props.body}>
        <div style={{ margin: '16px 0' }}>
          <Divider />
        </div>
        <p style={cardBodyTextStyle}>{props.body}</p>
      </Show>
    </Card>
  )
}

function SectionHeaderBars(props: {
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  body?: string
  summary?: string
  barActionLabel?: string
  onBarAction?: () => void
  barPrimaryLabel?: string
  onBarPrimaryAction?: () => void
}) {
  return (
    <div style={sectionWrapStyle}>
      <div style={sectionHeaderRowStyle}>
        <div>
          <h2 style={sectionTitleStyle}>{props.title}</h2>
          <Show when={props.description}>
            <p style={sectionDescriptionStyle}>{props.description}</p>
          </Show>
        </div>
        <Show when={props.actionLabel}>
          <Button variant="secondary" size="sm" onClick={props.onAction}>
            {props.actionLabel}
          </Button>
        </Show>
      </div>
      <Show when={props.body}>
        <div style={sectionBodyStyle}>{props.body}</div>
      </Show>
      <div style={sectionBarStyle}>
        <Show when={props.summary}>
          <p style={sectionBarSummaryStyle}>{props.summary}</p>
        </Show>
        <Show when={props.barActionLabel || props.barPrimaryLabel}>
          <div style={actionsRowStyle}>
            <Show when={props.barActionLabel}>
              <Button variant="secondary" size="sm" onClick={props.onBarAction}>
                {props.barActionLabel}
              </Button>
            </Show>
            <Show when={props.barPrimaryLabel}>
              <Button variant="primary" size="sm" onClick={props.onBarPrimaryAction}>
                {props.barPrimaryLabel}
              </Button>
            </Show>
          </div>
        </Show>
      </div>
    </div>
  )
}

/**
 * Moderno block — PageCardSectionHeaders (Solid). Copy-paste; edit freely.
 * Header family for application views: a page header (breadcrumbs, title, actions,
 * status/meta), a card header (title, subtitle, actions) and a section with a top
 * header bar and a bottom summary/actions bar. Uses the Button, Badge, Card and
 * Divider primitives + Moderno tokens.
 */
export function PageCardSectionHeaders(props: PageCardSectionHeadersProps) {
  const breadcrumbs = () => props.breadcrumbs ?? DEFAULT_BREADCRUMBS
  const pageTitle = () => props.pageTitle ?? 'Rediseño Q3'
  const pageDescription = () => props.pageDescription ?? 'Plan de lanzamiento y seguimiento de tareas del proyecto.'
  const pageStatus = () => props.pageStatus ?? 'Activo'
  const pageMeta = () => props.pageMeta ?? 'Actualizado hace 2 horas por Marta Gómez'
  const primaryLabel = () => props.primaryLabel ?? 'Nueva tarea'
  const secondaryLabel = () => props.secondaryLabel ?? 'Compartir'
  const cardTitle = () => props.cardTitle ?? 'Miembros del equipo'
  const cardSubtitle = () => props.cardSubtitle ?? '6 personas con acceso a este proyecto'
  const cardBody = () => props.cardBody ?? 'Marta Gómez, Carlos Peña, Sofía Iglesias y 3 personas más colaboran aquí.'
  const cardActionLabel = () => props.cardActionLabel ?? 'Invitar'
  const sectionTitle = () => props.sectionTitle ?? 'Actividad reciente'
  const sectionDescription = () => props.sectionDescription ?? 'Últimos cambios en las tareas del proyecto.'
  const sectionActionLabel = () => props.sectionActionLabel ?? 'Ver todo'
  const sectionBody = () => props.sectionBody ?? 'Sofía Iglesias completó “Wireframes de checkout” hace 1 hora.'
  const sectionSummary = () => props.sectionSummary ?? '12 tareas · 3 completadas hoy'
  const sectionBarActionLabel = () => props.sectionBarActionLabel ?? 'Exportar'
  const sectionBarPrimaryLabel = () => props.sectionBarPrimaryLabel ?? 'Marcar completadas'

  return (
    <div style={demoStyle}>
      <PageHeaderSection
        breadcrumbs={breadcrumbs()}
        title={pageTitle()}
        description={pageDescription()}
        status={pageStatus()}
        meta={pageMeta()}
        primaryLabel={primaryLabel()}
        onPrimaryAction={props.onPrimaryAction}
        secondaryLabel={secondaryLabel()}
        onSecondaryAction={props.onSecondaryAction}
      />
      <CardHeaderSection
        title={cardTitle()}
        subtitle={cardSubtitle()}
        body={cardBody()}
        actionLabel={cardActionLabel()}
        onAction={props.onCardAction}
      />
      <SectionHeaderBars
        title={sectionTitle()}
        description={sectionDescription()}
        actionLabel={sectionActionLabel()}
        onAction={props.onSectionAction}
        body={sectionBody()}
        summary={sectionSummary()}
        barActionLabel={sectionBarActionLabel()}
        onBarAction={props.onSectionBarAction}
        barPrimaryLabel={sectionBarPrimaryLabel()}
        onBarPrimaryAction={props.onSectionBarPrimaryAction}
      />
    </div>
  )
}
