<script lang="ts">
  // Moderno screen — ReferralInvite (Svelte). Copy-paste; edit freely.
  // First step of the Referral flow (ADR-0005, cross-domain Applications +
  // Marketing): a presentational "start your referral" form — just a name
  // field to personalize the link and a CTA to generate it. No block fits a
  // one-off kickoff form like this, so it composes only the Input/Button
  // primitives + Moderno tokens, the same allowance the Onboarding flow's
  // `welcome` screen and the Checkout flow's `confirmation` screen used. The
  // actual link/invite UI lives on the next `share` step, which composes the
  // Share/Invite block instead of duplicating it here.
  import { Button, Input } from '@moderno/svelte'

  export interface ReferralInviteValues {
    name: string
  }

  let {
    values,
    onChange,
    onNext,
    title = 'Invita a tus amigos',
    description = 'Comparte Moderno y gana recompensas por cada persona que se una.',
    namePlaceholder = 'Tu nombre',
    ctaLabel = 'Generar mi enlace',
  }: {
    values: ReferralInviteValues
    onChange: (values: ReferralInviteValues) => void
    onNext: (values: ReferralInviteValues) => void
    title?: string
    description?: string
    namePlaceholder?: string
    ctaLabel?: string
  } = $props()

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    onNext(values)
  }
</script>

<div class="md-referral-invite">
  <div class="md-referral-invite__card">
    <div class="md-referral-invite__badge">🎁</div>
    <h1 class="md-referral-invite__title">{title}</h1>
    <p class="md-referral-invite__description">{description}</p>
    <form onsubmit={handleSubmit}>
      <div class="md-referral-invite__field">
        <Input
          label="Tu nombre"
          name="name"
          placeholder={namePlaceholder}
          value={values.name}
          oninput={(event: Event) => onChange({ ...values, name: (event.currentTarget as HTMLInputElement).value })}
        />
      </div>
      <Button type="submit" variant="primary" style="width: 100%;">{ctaLabel}</Button>
    </form>
  </div>
</div>

<style>
  .md-referral-invite {
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: var(--md-surface-base);
  }
  .md-referral-invite__card {
    width: 100%;
    max-width: 420px;
    border: 1px solid var(--md-border-default);
    padding: 32px;
    text-align: center;
  }
  .md-referral-invite__badge {
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
  .md-referral-invite__title {
    font-family: var(--md-font-serif);
    font-size: var(--md-text-headline-lg);
    color: var(--md-text-primary);
    margin: 0 0 8px;
  }
  .md-referral-invite__description {
    font-size: var(--md-text-body-sm);
    line-height: var(--md-text-body-sm-lh);
    color: var(--md-text-secondary);
    margin: 0 0 24px;
  }
  .md-referral-invite__field {
    text-align: left;
    margin-bottom: 20px;
  }
</style>
