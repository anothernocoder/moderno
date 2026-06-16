<script lang="ts">
  // Moderno block — PortfolioHeader (Svelte). Copy-paste; edit freely.
  // Intro header. Uses the Avatar + Chip + Button primitives + Moderno tokens.
  import { Avatar, Chip, Button } from '@moderno/svelte'

  interface PortfolioLink {
    label: string
    href: string
  }

  let {
    name = 'Ana Restrepo',
    role = 'Diseñadora de producto',
    bio = 'Construyo interfaces claras y sistemas de diseño que escalan. Antes en Stripe y Linear.',
    avatarSrc,
    initials = 'AR',
    links = [
      { label: 'GitHub', href: '#' },
      { label: 'Dribbble', href: '#' },
      { label: 'LinkedIn', href: '#' },
    ],
    onContact,
  }: {
    name?: string
    role?: string
    bio?: string
    avatarSrc?: string
    initials?: string
    links?: PortfolioLink[]
    onContact?: () => void
  } = $props()
</script>

<header class="md-pf">
  <Avatar src={avatarSrc} {initials} alt={name} size="lg" />
  <h1 class="md-pf__name">{name}</h1>
  <p class="md-pf__role">{role}</p>
  <p class="md-pf__bio">{bio}</p>
  <div class="md-pf__links">
    {#each links as link (link.label)}
      <a href={link.href} class="md-pf__link"><Chip>{link.label}</Chip></a>
    {/each}
  </div>
  <Button label="Contacto" size="md" onclick={() => onContact?.()} />
</header>

<style>
  .md-pf {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 16px;
    padding: 64px 24px;
    background: var(--md-surface-base);
    border-bottom: 1px solid var(--md-border-default);
  }
  .md-pf__name {
    font-family: var(--md-font-serif);
    font-size: 40px;
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--md-text-primary);
    margin: 0;
  }
  .md-pf__role {
    font-size: var(--md-text-headline-md);
    color: var(--md-text-secondary);
    margin: 0;
  }
  .md-pf__bio {
    font-size: var(--md-text-body-md);
    line-height: var(--md-text-body-md-lh);
    color: var(--md-text-secondary);
    margin: 0;
    max-width: 48ch;
  }
  .md-pf__links {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .md-pf__link {
    text-decoration: none;
  }
</style>
