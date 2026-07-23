<script lang="ts">
  // Moderno screen — Welcome (Svelte). Copy-paste; edit freely.
  // First step of the Onboarding flow (ADR-0005): a simple presentational
  // greeting with a single CTA. No Applications block fits a one-off welcome
  // message, so this screen composes only the Button primitive + Moderno
  // tokens — the same allowance the Checkout flow's `confirmation` screen used.
  import { Button } from '@moderno/svelte'

  let {
    onNext,
    workspaceName,
    title = '¡Bienvenido a Moderno!',
    description = 'Configuremos tu workspace en un par de minutos: tu perfil, un plan y tu equipo.',
    ctaLabel = 'Comenzar',
  }: {
    onNext: () => void
    workspaceName?: string
    title?: string
    description?: string
    ctaLabel?: string
  } = $props()
</script>

<div class="md-welcome">
  <div class="md-welcome__card">
    <div class="md-welcome__badge">👋</div>
    <h1 class="md-welcome__title">{title}</h1>
    <p class="md-welcome__description">
      {description}{workspaceName ? ` Estás creando el workspace "${workspaceName}".` : ''}
    </p>
    <Button variant="primary" style="width: 100%;" onclick={() => onNext()}>{ctaLabel}</Button>
  </div>
</div>

<style>
  .md-welcome {
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: var(--md-surface-base);
  }
  .md-welcome__card {
    width: 100%;
    max-width: 420px;
    border: 1px solid var(--md-border-default);
    padding: 32px;
    text-align: center;
  }
  .md-welcome__badge {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--md-surface-muted);
    color: var(--md-text-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    font-size: 24px;
  }
  .md-welcome__title {
    font-family: var(--md-font-serif);
    font-size: var(--md-text-headline-lg);
    color: var(--md-text-primary);
    margin: 0 0 8px;
  }
  .md-welcome__description {
    font-size: var(--md-text-body-sm);
    line-height: var(--md-text-body-sm-lh);
    color: var(--md-text-secondary);
    margin: 0 0 24px;
  }
</style>
