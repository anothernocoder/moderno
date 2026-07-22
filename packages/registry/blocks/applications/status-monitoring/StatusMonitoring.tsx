import type { CSSProperties } from 'react'
import { Badge, Divider, Indicator } from '@moderno/react'

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

function overallStatus(services: ServiceItem[]): ServiceStatus {
  return services.reduce<ServiceStatus>(
    (worst, service) => (STATUS_PRIORITY[service.status] < STATUS_PRIORITY[worst] ? service.status : worst),
    'operational',
  )
}

const wrapperStyle: CSSProperties = {
  background: 'var(--md-surface-base)',
  border: '1px solid var(--md-border-default)',
}
const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '12px',
  padding: '16px 20px',
  borderBottom: '1px solid var(--md-border-strong)',
}
const titleStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-md)',
  fontWeight: 600,
  color: 'var(--md-text-primary)',
  margin: 0,
}
const listStyle: CSSProperties = { listStyle: 'none', margin: 0, padding: 0 }
const rowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '12px',
  padding: '16px 20px',
}
const nameGroupStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: '12px' }
const nameStyle: CSSProperties = { fontSize: 'var(--md-text-body-sm)', color: 'var(--md-text-primary)', fontWeight: 500 }
const metaGroupStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: '12px' }
const metaTextStyle: CSSProperties = { fontSize: 'var(--md-text-label-sm)', color: 'var(--md-text-secondary)', margin: 0 }

/**
 * Moderno block — StatusMonitoring (React). Copy-paste; edit freely.
 * Service/system health panel: overall status banner plus a list of monitored
 * services, each with a status Indicator, a Badge, and uptime / last-incident text.
 * Uses the Badge + Divider + Indicator primitives + Moderno tokens.
 */
export function StatusMonitoring({ title = 'Estado del sistema', services = DEFAULT_SERVICES }: StatusMonitoringProps) {
  const overall = overallStatus(services)

  return (
    <div style={wrapperStyle}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>{title}</h3>
        <Badge variant={STATUS_VARIANT[overall]} dot>
          {OVERALL_LABEL[overall]}
        </Badge>
      </div>
      <ul style={listStyle}>
        {services.map((service, index) => (
          <li key={service.id}>
            {index > 0 ? <Divider /> : null}
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
        ))}
      </ul>
    </div>
  )
}
