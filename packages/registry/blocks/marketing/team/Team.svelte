<script lang="ts">
  // Moderno block — Team (Svelte). Copy-paste; edit freely.
  // Team section: centered header above a grid of member profile cards with avatar, name, role, and bio.
  // Uses the Card + Avatar primitives + Moderno tokens.
  import { Avatar, Card } from '@moderno/svelte'

  export interface TeamMember {
    name: string
    role?: string
    bio?: string
    avatarSrc?: string
    initials?: string
  }

  const DEFAULT_MEMBERS: TeamMember[] = [
    {
      name: 'Marta Gómez',
      role: 'Head of Design',
      bio: 'Lidera el lenguaje visual de Moderno y cuida la coherencia entre los cuatro frameworks.',
      initials: 'MG',
    },
    {
      name: 'Carlos Peña',
      role: 'Frontend Lead',
      bio: 'Construye la arquitectura de primitives y mantiene la paridad de API entre React, Vue, Svelte y Solid.',
      initials: 'CP',
    },
    {
      name: 'Sofía Iglesias',
      role: 'Product Engineer',
      bio: 'Diseña los tokens --md-* y ayuda a los equipos a tematizar sus apps sin fricción.',
      initials: 'SI',
    },
    {
      name: 'Diego Salas',
      role: 'Developer Experience',
      bio: 'Cuida la CLI y la documentación para que copiar un block sea siempre trivial.',
      initials: 'DS',
    },
  ]

  let {
    kicker = 'Nuestro equipo',
    title = 'Conoce al equipo',
    subtitle = 'Las personas que diseñan y construyen Moderno todos los días.',
    members = DEFAULT_MEMBERS,
  }: {
    kicker?: string
    title?: string
    subtitle?: string
    members?: TeamMember[]
  } = $props()
</script>

<section class="md-team">
  <div class="md-team__header">
    <p class="md-team__kicker">{kicker}</p>
    <h2 class="md-team__title">{title}</h2>
    <p class="md-team__subtitle">{subtitle}</p>
  </div>
  <div class="md-team__grid">
    {#each members as member (member.name)}
      <Card>
        <div class="md-team__member">
          <Avatar src={member.avatarSrc} initials={member.initials} alt={member.name} size="lg" />
          <p class="md-team__member-name">{member.name}</p>
          {#if member.role}<p class="md-team__member-role">{member.role}</p>{/if}
          {#if member.bio}<p class="md-team__member-bio">{member.bio}</p>{/if}
        </div>
      </Card>
    {/each}
  </div>
</section>

<style>
  .md-team {
    padding: 96px 24px;
    background: var(--md-surface-base);
  }
  .md-team__header {
    text-align: center;
    margin: 0 auto 56px;
    max-width: 640px;
  }
  .md-team__kicker {
    font-size: var(--md-text-label-sm);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--md-text-secondary);
    margin: 0 0 16px;
  }
  .md-team__title {
    font-family: var(--md-font-serif);
    font-size: 36px;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--md-text-primary);
    margin: 0 0 16px;
  }
  .md-team__subtitle {
    font-size: var(--md-text-body-lg);
    line-height: var(--md-text-body-lg-lh);
    color: var(--md-text-secondary);
    margin: 0;
  }
  .md-team__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px;
    max-width: 1040px;
    margin: 0 auto;
  }
  .md-team__member {
    text-align: center;
  }
  .md-team__member-name {
    font-size: var(--md-text-label-md);
    font-weight: 600;
    color: var(--md-text-primary);
    margin: 12px 0 0;
  }
  .md-team__member-role {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
    margin: 4px 0 0;
  }
  .md-team__member-bio {
    font-size: var(--md-text-body-md);
    line-height: var(--md-text-body-md-lh);
    color: var(--md-text-secondary);
    margin: 12px 0 0;
  }
</style>
