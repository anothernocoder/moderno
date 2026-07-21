<script lang="ts">
  // Moderno block — Newsletter (Svelte). Copy-paste; edit freely.
  // Email signup / subscription section: centered header above an inline email form.
  // Uses the Input + Button primitives + Moderno tokens.
  import { Button, Input } from '@moderno/svelte'

  let {
    kicker = 'Newsletter',
    title = 'Recibe las novedades de Moderno',
    subtitle = 'Un correo al mes con nuevos blocks, primitives y notas de diseño.',
    placeholder = 'tu@email.com',
    buttonLabel = 'Suscribirme',
    defaultEmail = '',
    onSubmit,
  }: {
    kicker?: string
    title?: string
    subtitle?: string
    placeholder?: string
    buttonLabel?: string
    defaultEmail?: string
    onSubmit?: (email: string) => void
  } = $props()

  let email = $state(defaultEmail)

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    onSubmit?.(email)
  }
</script>

<section class="md-newsletter">
  <div class="md-newsletter__header">
    <p class="md-newsletter__kicker">{kicker}</p>
    <h2 class="md-newsletter__title">{title}</h2>
    <p class="md-newsletter__subtitle">{subtitle}</p>
  </div>
  <form class="md-newsletter__form" onsubmit={handleSubmit}>
    <div class="md-newsletter__field">
      <Input label="Correo" name="email" type="email" {placeholder} bind:value={email} required />
    </div>
    <Button type="submit" variant="primary" label={buttonLabel} />
  </form>
</section>

<style>
  .md-newsletter {
    padding: 96px 24px;
    background: var(--md-surface-base);
  }
  .md-newsletter__header {
    text-align: center;
    margin: 0 auto 32px;
    max-width: 640px;
  }
  .md-newsletter__kicker {
    font-size: var(--md-text-label-sm);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--md-text-secondary);
    margin: 0 0 16px;
  }
  .md-newsletter__title {
    font-family: var(--md-font-serif);
    font-size: 36px;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--md-text-primary);
    margin: 0 0 16px;
  }
  .md-newsletter__subtitle {
    font-size: var(--md-text-body-lg);
    line-height: var(--md-text-body-lg-lh);
    color: var(--md-text-secondary);
    margin: 0;
  }
  .md-newsletter__form {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    max-width: 480px;
    margin: 0 auto;
  }
  .md-newsletter__field {
    flex: 1 1 260px;
  }
</style>
