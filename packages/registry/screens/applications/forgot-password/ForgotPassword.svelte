<script lang="ts">
  // Moderno screen — ForgotPassword (Svelte). Copy-paste; edit freely.
  // Presentational single-screen auth forgot-password (ADR-0005): a typed wiring
  // contract (values/onChange/onSubmit) with no internal state and no router — the
  // consumer owns state and navigation. Composes the Input and Button primitives +
  // Moderno tokens.
  import { Button, Input } from '@moderno/svelte'

  export interface ForgotPasswordValues {
    email: string
  }

  let {
    values,
    onChange,
    onSubmit,
    onBack,
    error,
    submitting,
    sent,
    title = 'Recupera tu contraseña',
    description = 'Ingresa tu correo y te enviaremos un enlace para restablecerla.',
  }: {
    values: ForgotPasswordValues
    onChange: (values: ForgotPasswordValues) => void
    onSubmit: (values: ForgotPasswordValues) => void
    onBack?: () => void
    error?: string
    submitting?: boolean
    sent?: boolean
    title?: string
    description?: string
  } = $props()

  function set<K extends keyof ForgotPasswordValues>(key: K, value: ForgotPasswordValues[K]) {
    onChange({ ...values, [key]: value })
  }

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    onSubmit(values)
  }
</script>

<div class="md-forgot-password">
  <div class="md-forgot-password__card">
    <div class="md-forgot-password__header">
      <h1 class="md-forgot-password__title">{title}</h1>
      <p class="md-forgot-password__description">{description}</p>
    </div>

    {#if error}
      <p class="md-forgot-password__error">{error}</p>
    {/if}

    {#if sent}
      <p class="md-forgot-password__confirmation">
        Si existe una cuenta con el correo <strong>{values.email}</strong>, te enviamos un enlace para
        restablecer tu contraseña.
      </p>
      <Button type="button" variant="secondary" style="width: 100%;" onclick={() => onBack?.()}>
        Volver a iniciar sesión
      </Button>
    {:else}
      <form class="md-forgot-password__form" onsubmit={handleSubmit}>
        <Input
          label="Correo electrónico"
          name="email"
          type="email"
          autocomplete="email"
          value={values.email}
          oninput={(event: Event) => set('email', (event.currentTarget as HTMLInputElement).value)}
          required
        />
        <Button type="submit" variant="primary" style="width: 100%;" disabled={submitting}>
          {submitting ? 'Enviando…' : 'Enviar enlace'}
        </Button>
      </form>

      <p class="md-forgot-password__footer">
        <button type="button" class="md-forgot-password__link" onclick={() => onBack?.()}>
          Volver a iniciar sesión
        </button>
      </p>
    {/if}
  </div>
</div>

<style>
  /* Fills its container's height rather than assuming the viewport (matches the
     ApplicationShells block's convention) — give it a full-height container
     (e.g. `#root { height: 100vh }`) in your own app if you want it to fill the page. */
  .md-forgot-password {
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: var(--md-surface-base);
  }
  .md-forgot-password__card {
    width: 100%;
    max-width: 400px;
    border: 1px solid var(--md-border-default);
    padding: 32px;
  }
  .md-forgot-password__header {
    margin: 0 0 24px;
  }
  .md-forgot-password__title {
    font-family: var(--md-font-serif);
    font-size: var(--md-text-headline-lg);
    color: var(--md-text-primary);
    margin: 0 0 8px;
  }
  .md-forgot-password__description {
    font-size: var(--md-text-body-sm);
    line-height: var(--md-text-body-sm-lh);
    color: var(--md-text-secondary);
    margin: 0;
  }
  .md-forgot-password__error {
    font-size: var(--md-text-body-sm);
    color: var(--md-error);
    margin: 0 0 16px;
  }
  .md-forgot-password__confirmation {
    font-size: var(--md-text-body-sm);
    line-height: var(--md-text-body-sm-lh);
    color: var(--md-text-secondary);
    margin: 0 0 24px;
  }
  .md-forgot-password__form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .md-forgot-password__link {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    font-size: var(--md-text-body-sm);
    color: var(--md-text-primary);
    text-decoration: underline;
    cursor: pointer;
  }
  .md-forgot-password__footer {
    margin-top: 24px;
    text-align: center;
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
  }
</style>
