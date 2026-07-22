import type { CSSProperties } from 'react'
import { Badge, Button, Card, Divider } from '@moderno/react'

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

const breadcrumbNavStyle: CSSProperties = { margin: '0 0 12px' }
const breadcrumbListStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '6px',
  margin: 0,
  padding: 0,
  listStyle: 'none',
}
const breadcrumbItemStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: '6px' }
const breadcrumbLinkStyle: CSSProperties = {
  fontSize: 'var(--md-text-label-sm)',
  color: 'var(--md-text-secondary)',
  textDecoration: 'none',
}
const breadcrumbCurrentStyle: CSSProperties = { fontSize: 'var(--md-text-label-sm)', color: 'var(--md-text-primary)' }
const breadcrumbSepStyle: CSSProperties = { color: 'var(--md-text-tertiary)', fontSize: 'var(--md-text-label-sm)' }

const rowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '16px',
}
const actionsRowStyle: CSSProperties = { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }

const demoStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  padding: '24px',
  background: 'var(--md-surface-base)',
}

const pageTitleStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '28px',
  lineHeight: 1.15,
  letterSpacing: '-0.01em',
  color: 'var(--md-text-primary)',
  margin: 0,
}
const pageDescriptionStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-md)',
  lineHeight: 'var(--md-text-body-md-lh)',
  color: 'var(--md-text-secondary)',
  margin: '8px 0 0',
}
const pageMetaRowStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px', margin: '16px 0 0' }
const pageMetaTextStyle: CSSProperties = { fontSize: 'var(--md-text-body-sm)', color: 'var(--md-text-secondary)', margin: 0 }

const cardHeaderTitleStyle: CSSProperties = {
  fontSize: 'var(--md-text-headline-md)',
  lineHeight: 'var(--md-text-headline-md-lh)',
  fontWeight: 600,
  color: 'var(--md-text-primary)',
  margin: 0,
}
const cardHeaderSubtitleStyle: CSSProperties = { fontSize: 'var(--md-text-body-sm)', color: 'var(--md-text-secondary)', margin: '4px 0 0' }
const cardBodyTextStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-md)',
  lineHeight: 'var(--md-text-body-md-lh)',
  color: 'var(--md-text-secondary)',
  margin: '16px 0 0',
}

const sectionWrapStyle: CSSProperties = { background: 'var(--md-surface-base)', border: '1px solid var(--md-border-default)' }
const sectionHeaderRowStyle: CSSProperties = {
  ...rowStyle,
  padding: '16px 20px',
  borderBottom: '1px solid var(--md-border-default)',
}
const sectionTitleStyle: CSSProperties = {
  fontSize: 'var(--md-text-headline-md)',
  lineHeight: 'var(--md-text-headline-md-lh)',
  fontWeight: 600,
  color: 'var(--md-text-primary)',
  margin: 0,
}
const sectionDescriptionStyle: CSSProperties = { fontSize: 'var(--md-text-body-sm)', color: 'var(--md-text-secondary)', margin: '4px 0 0' }
const sectionBodyStyle: CSSProperties = {
  padding: '20px',
  fontSize: 'var(--md-text-body-md)',
  lineHeight: 'var(--md-text-body-md-lh)',
  color: 'var(--md-text-secondary)',
}
const sectionBarStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  padding: '12px 20px',
  borderTop: '1px solid var(--md-border-strong)',
}
const sectionBarSummaryStyle: CSSProperties = { fontSize: 'var(--md-text-body-sm)', color: 'var(--md-text-secondary)', margin: 0 }

function Breadcrumbs({ items }: { items?: PageHeaderBreadcrumb[] }) {
  if (!items?.length) return null
  return (
    <nav aria-label="Breadcrumb" style={breadcrumbNavStyle}>
      <ol style={breadcrumbListStyle}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.label} style={breadcrumbItemStyle}>
              {item.href && !isLast ? (
                <a href={item.href} style={breadcrumbLinkStyle}>
                  {item.label}
                </a>
              ) : (
                <span style={isLast ? breadcrumbCurrentStyle : breadcrumbLinkStyle} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <span style={breadcrumbSepStyle} aria-hidden="true">
                  /
                </span>
              ) : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

function PageHeaderSection({
  breadcrumbs,
  title,
  description,
  status,
  meta,
  primaryLabel,
  onPrimaryAction,
  secondaryLabel,
  onSecondaryAction,
}: {
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
      <Breadcrumbs items={breadcrumbs} />
      <div style={rowStyle}>
        <div>
          <h1 style={pageTitleStyle}>{title}</h1>
          {description ? <p style={pageDescriptionStyle}>{description}</p> : null}
        </div>
        {primaryLabel || secondaryLabel ? (
          <div style={actionsRowStyle}>
            {secondaryLabel ? (
              <Button variant="secondary" size="sm" onClick={onSecondaryAction}>
                {secondaryLabel}
              </Button>
            ) : null}
            {primaryLabel ? (
              <Button variant="primary" size="sm" onClick={onPrimaryAction}>
                {primaryLabel}
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
      {status || meta ? (
        <div style={pageMetaRowStyle}>
          {status ? <Badge dot>{status}</Badge> : null}
          {meta ? <p style={pageMetaTextStyle}>{meta}</p> : null}
        </div>
      ) : null}
    </header>
  )
}

function CardHeaderSection({
  title,
  subtitle,
  body,
  actionLabel,
  onAction,
}: {
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
          <h3 style={cardHeaderTitleStyle}>{title}</h3>
          {subtitle ? <p style={cardHeaderSubtitleStyle}>{subtitle}</p> : null}
        </div>
        {actionLabel ? (
          <Button variant="secondary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : null}
      </div>
      {body ? (
        <>
          <div style={{ margin: '16px 0' }}>
            <Divider />
          </div>
          <p style={cardBodyTextStyle}>{body}</p>
        </>
      ) : null}
    </Card>
  )
}

function SectionHeaderBars({
  title,
  description,
  actionLabel,
  onAction,
  body,
  summary,
  barActionLabel,
  onBarAction,
  barPrimaryLabel,
  onBarPrimaryAction,
}: {
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
          <h2 style={sectionTitleStyle}>{title}</h2>
          {description ? <p style={sectionDescriptionStyle}>{description}</p> : null}
        </div>
        {actionLabel ? (
          <Button variant="secondary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : null}
      </div>
      {body ? <div style={sectionBodyStyle}>{body}</div> : null}
      <div style={sectionBarStyle}>
        {summary ? <p style={sectionBarSummaryStyle}>{summary}</p> : null}
        {barActionLabel || barPrimaryLabel ? (
          <div style={actionsRowStyle}>
            {barActionLabel ? (
              <Button variant="secondary" size="sm" onClick={onBarAction}>
                {barActionLabel}
              </Button>
            ) : null}
            {barPrimaryLabel ? (
              <Button variant="primary" size="sm" onClick={onBarPrimaryAction}>
                {barPrimaryLabel}
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

/**
 * Moderno block — PageCardSectionHeaders (React). Copy-paste; edit freely.
 * Header family for application views: a page header (breadcrumbs, title, actions,
 * status/meta), a card header (title, subtitle, actions) and a section with a top
 * header bar and a bottom summary/actions bar. Uses the Button, Badge, Card and
 * Divider primitives + Moderno tokens.
 */
export function PageCardSectionHeaders({
  breadcrumbs = DEFAULT_BREADCRUMBS,
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
}: PageCardSectionHeadersProps) {
  return (
    <div style={demoStyle}>
      <PageHeaderSection
        breadcrumbs={breadcrumbs}
        title={pageTitle}
        description={pageDescription}
        status={pageStatus}
        meta={pageMeta}
        primaryLabel={primaryLabel}
        onPrimaryAction={onPrimaryAction}
        secondaryLabel={secondaryLabel}
        onSecondaryAction={onSecondaryAction}
      />
      <CardHeaderSection
        title={cardTitle}
        subtitle={cardSubtitle}
        body={cardBody}
        actionLabel={cardActionLabel}
        onAction={onCardAction}
      />
      <SectionHeaderBars
        title={sectionTitle}
        description={sectionDescription}
        actionLabel={sectionActionLabel}
        onAction={onSectionAction}
        body={sectionBody}
        summary={sectionSummary}
        barActionLabel={sectionBarActionLabel}
        onBarAction={onSectionBarAction}
        barPrimaryLabel={sectionBarPrimaryLabel}
        onBarPrimaryAction={onSectionBarPrimaryAction}
      />
    </div>
  )
}
