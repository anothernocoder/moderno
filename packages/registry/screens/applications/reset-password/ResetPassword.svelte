<script lang="ts">
  // Moderno screen — ResetPassword (Svelte). Copy-paste; edit freely.
  // Presentational single-screen auth reset-password (ADR-0005): a typed wiring
  // contract (values/onChange/onSubmit) with no internal state and no router — the
  // consumer owns state and navigation. Composes the Input and Button primitives +
  // Moderno tokens.
  import { Button, Input } from '@moderno/svelte'

  export interface ResetPasswordValues {
    password: string
    confirmPassword: string
  }

  let {
    values,
    onChange,
    onSubmit,
    onBack,
    error,
    submitting,
    title = 'Elige una nueva contraseña',
    description = 'Tu nueva contraseña debe ser distinta a las anteriores.',
  }: {
    values: ResetPasswordValues
    onChange: (values: ResetPasswordValues) => void
    onSubmit: (values: ResetPasswordValues) => void
    onBack?: () => void
    error?: string
    submitting?: boolean
    title?: string
    description?: string
  } = $props()

  function set<K extends keyof ResetPasswordValues>(key: K, value: ResetPasswordValues[K]) {
    onChange({ ...values, [key]: value })
  }

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    onSubmit(values)
  }
</script>

<div class="md-reset-password">
  <div class="md-reset-password__card">
    <div class="md-reset-password__header">
      <h1 class="md-reset-password__title">{title}</h1>
      <p class="md-reset-password__description">{description}</p>
    </div>

    {#if error}
      <p class="md-reset-password__error">{error}</p>
    {/if}

    <form class="md-reset-password__form" onsubmit={handleSubmit}>
      <Input
        label="Nueva contraseña"
        name="password"
        type="password"
        autocomplete="new-password"
        value={values.password}
        oninput={(event: Event) => set('password', (event.currentTarget as HTMLInputElement).value)}
        required
      />
      <Input
        label="Confirma tu nueva contraseña"
        name="confirmPassword"
        type="password"
        autocomplete="new-password"
        value={values.confirmPassword}
        oninput={(event: Event) => set('confirmPassword', (event.currentTarget as HTMLInputElement).value)}
        required
      />
      <Button type="submit" variant="primary" style="width: 100%;" disabled={submitting}>
        {submitting ? 'Guardando…' : 'Guardar contraseña'}
      </Button>
    </form>

    <p class="md-reset-password__footer">
      <button type="button" class="md-reset-password__link" onclick={() => onBack?.()}>
        Volver a iniciar sesión
      </button>
    </p>
  </div>
</div>

<style>
  /* Fills its container's height rather than assuming the viewport (matches the
     ApplicationShells block's convention) — give it a full-height container
     (e.g. `#root { height: 100vh }`) in your own app if you want it to fill the page. */
  .md-reset-password {
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: var(--md-surface-base);
  }
  .md-reset-password__card {
    width: 100%;
    max-width: 400px;
    border: 1px solid var(--md-border-default);
    padding: 32px;
  }
  .md-reset-password__header {
    margin: 0 0 24px;
  }
  .md-reset-password__title {
    font-family: var(--md-font-serif);
    font-size: var(--md-text-headline-lg);
    color: var(--md-text-primary);
    margin: 0 0 8px;
  }
  .md-reset-password__description {
    font-size: var(--md-text-body-sm);
    line-height: var(--md-text-body-sm-lh);
    color: var(--md-text-secondary);
    margin: 0;
  }
  .md-reset-password__error {
    font-size: var(--md-text-body-sm);
    color: var(--md-error);
    margin: 0 0 16px;
  }
  .md-reset-password__form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .md-reset-password__link {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    font-size: var(--md-text-body-sm);
    color: var(--md-text-primary);
    text-decoration: underline;
    cursor: pointer;
  }
  .md-reset-password__footer {
    margin-top: 24px;
    text-align: center;
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
  }
</style>
