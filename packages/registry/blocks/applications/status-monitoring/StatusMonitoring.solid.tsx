import { createMemo, For, type JSX } from 'solid-js'
import { Badge, Divider, Indicator } from '@moderno/solid'

export type ServiceStatus = 'operational' | 'degraded' | 'down'

export interface ServiceItem {
  id: string
  name: string
  status: ServiceStatus
  statusLabel: string
  uptime?: string
  lastIncident?: string
}

export interface StatusMonitoringProps {
  title?: string
  services?: ServiceItem[]
}

const STATUS_VARIANT: Record<ServiceStatus, 'success' | 'warning' | 'error'> = {
  operational: 'success',
  degraded: 'warning',
  down: 'error',
}

const STATUS_PRIORITY: Record<ServiceStatus, number> = { down: 0, degraded: 1, operational: 2 }

const OVERALL_LABEL: Record<ServiceStatus, string> = {
  operational: 'Todos los sistemas operativos',
  degraded: 'Rendimiento degradado',
  down: 'Interrupción del servicio',
}

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'api',
    name: 'API',
    status: 'operational',
    statusLabel: 'Operativo',
    uptime: '99.98%',
    lastIncident: 'Sin incidentes en 90 días',
  },
  {
    id: 'web',
    name: 'Sitio web',
    status: 'operational',
    statusLabel: 'Operativo',
    uptime: '99.95%',
    lastIncident: 'Sin incidentes en 60 días',
  },
  {
    id: 'payments',
    name: 'Pagos',
    status: 'degraded',
    statusLabel: 'Degradado',
    uptime: '98.40%',
    lastIncident: 'Incidente hace 2 horas',
  },
  {
    id: 'notifications',
    name: 'Notificaciones',
    status: 'down',
    statusLabel: 'Caído',
    uptime: '92.10%',
    lastIncident: 'Interrupción en curso',
  },
]

const wrapperStyle: JSX.CSSProperties = {
  background: 'var(--md-surface-base)',
  border: '1px solid var(--md-border-default)',
}
const headerStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'space-between',
  'flex-wrap': 'wrap',
  gap: '12px',
  padding: '16px 20px',
  'border-bottom': '1px solid var(--md-border-strong)',
}
const titleStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-md)',
  'font-weight': 600,
  color: 'var(--md-text-primary)',
  margin: 0,
}
const listStyle: JSX.CSSProperties = { 'list-style': 'none', margin: 0, padding: 0 }
const rowStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'space-between',
  'flex-wrap': 'wrap',
  gap: '12px',
  padding: '16px 20px',
}
const nameGroupStyle: JSX.CSSProperties = { display: 'flex', 'align-items': 'center', gap: '12px' }
const nameStyle: JSX.CSSProperties = { 'font-size': 'var(--md-text-body-sm)', color: 'var(--md-text-primary)', 'font-weight': 500 }
const metaGroupStyle: JSX.CSSProperties = { display: 'flex', 'align-items': 'center', gap: '12px' }
const metaTextStyle: JSX.CSSProperties = { 'font-size': 'var(--md-text-label-sm)', color: 'var(--md-text-secondary)', margin: 0 }

/**
 * Moderno block — StatusMonitoring (Solid). Copy-paste; edit freely.
 * Service/system health panel: overall status banner plus a list of monitored
 * services, each with a status Indicator, a Badge, and uptime / last-incident text.
 * Uses the Badge + Divider + Indicator primitives + Moderno tokens.
 */
export function StatusMonitoring(props: StatusMonitoringProps) {
  const title = () => props.title ?? 'Estado del sistema'
  const services = () => props.services ?? DEFAULT_SERVICES
  const overall = createMemo(() =>
    services().reduce<ServiceStatus>(
      (worst, service) => (STATUS_PRIORITY[service.status] < STATUS_PRIORITY[worst] ? service.status : worst),
      'operational',
    ),
  )

  return (
    <div style={wrapperStyle}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>{title()}</h3>
        <Badge variant={STATUS_VARIANT[overall()]} dot>
          {OVERALL_LABEL[overall()]}
        </Badge>
      </div>
      <ul style={listStyle}>
        <For each={services()}>
          {(service, index) => (
            <li>
              {index() > 0 ? <Divider /> : null}
              <div style={rowStyle}>
                <div style={nameGroupStyle}>
                  <Indicator variant={STATUS_VARIANT[service.status]} pulse={service.status === 'down'} />
                  <span style={nameStyle}>{service.name}</span>
                </div>
                <div style={metaGroupStyle}>
                  {service.uptime || service.lastIncident ? (
                    <p style={metaTextStyle}>
                      {service.uptime ? `${service.uptime} uptime` : null}
                      {service.uptime && service.lastIncident ? ' · ' : null}
                      {service.lastIncident}
                    </p>
                  ) : null}
                  <Badge variant={STATUS_VARIANT[service.status]}>{service.statusLabel}</Badge>
                </div>
              </div>
            </li>
          )}
        </For>
      </ul>
    </div>
  )
}
