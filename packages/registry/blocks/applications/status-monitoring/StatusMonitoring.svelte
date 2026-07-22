<script lang="ts">
  // Moderno block — StatusMonitoring (Svelte). Copy-paste; edit freely.
  // Service/system health panel: overall status banner plus a list of monitored
  // services, each with a status Indicator, a Badge, and uptime / last-incident text.
  // Uses the Badge + Divider + Indicator primitives + Moderno tokens.
  import { Badge, Divider, Indicator } from '@moderno/svelte'

  export type ServiceStatus = 'operational' | 'degraded' | 'down'

  export interface ServiceItem {
    id: string
    name: string
    status: ServiceStatus
    statusLabel: string
    uptime?: string
    lastIncident?: string
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

  const defaultServices: ServiceItem[] = [
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

  let {
    title = 'Estado del sistema',
    services = defaultServices,
  }: {
    title?: string
    services?: ServiceItem[]
  } = $props()

  const overall = $derived(
    services.reduce<ServiceStatus>(
      (worst, service) => (STATUS_PRIORITY[service.status] < STATUS_PRIORITY[worst] ? service.status : worst),
      'operational',
    ),
  )
</script>

<div class="md-status-monitoring">
  <div class="md-status-monitoring__header">
    <h3 class="md-status-monitoring__title">{title}</h3>
    <Badge variant={STATUS_VARIANT[overall]} dot>{OVERALL_LABEL[overall]}</Badge>
  </div>
  <ul class="md-status-monitoring__list">
    {#each services as service, index (service.id)}
      <li>
        {#if index > 0}
          <Divider />
        {/if}
        <div class="md-status-monitoring__row">
          <div class="md-status-monitoring__name-group">
            <Indicator variant={STATUS_VARIANT[service.status]} pulse={service.status === 'down'} />
            <span class="md-status-monitoring__name">{service.name}</span>
          </div>
          <div class="md-status-monitoring__meta-group">
            {#if service.uptime || service.lastIncident}
              <p class="md-status-monitoring__meta-text">
                {#if service.uptime}{service.uptime} uptime{/if}
                {#if service.uptime && service.lastIncident} · {/if}
                {#if service.lastIncident}{service.lastIncident}{/if}
              </p>
            {/if}
            <Badge variant={STATUS_VARIANT[service.status]}>{service.statusLabel}</Badge>
          </div>
        </div>
      </li>
    {/each}
  </ul>
</div>

<style>
  .md-status-monitoring {
    background: var(--md-surface-base);
    border: 1px solid var(--md-border-default);
  }
  .md-status-monitoring__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    padding: 16px 20px;
    border-bottom: 1px solid var(--md-border-strong);
  }
  .md-status-monitoring__title {
    font-size: var(--md-text-body-md);
    font-weight: 600;
    color: var(--md-text-primary);
    margin: 0;
  }
  .md-status-monitoring__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .md-status-monitoring__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    padding: 16px 20px;
  }
  .md-status-monitoring__name-group {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .md-status-monitoring__name {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-primary);
    font-weight: 500;
  }
  .md-status-monitoring__meta-group {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .md-status-monitoring__meta-text {
    font-size: var(--md-text-label-sm);
    color: var(--md-text-secondary);
    margin: 0;
  }
</style>
