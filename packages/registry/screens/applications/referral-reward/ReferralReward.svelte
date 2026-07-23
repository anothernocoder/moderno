<script lang="ts">
  // Moderno screen — ReferralReward (Svelte). Copy-paste; edit freely.
  // Final step of the Referral flow (ADR-0005, cross-domain Applications +
  // Marketing): a presentational reward/claim summary — the accrued reward
  // amount, the list of referred invites carried from the share step (with
  // their status), and a claim CTA. No block fits this one-off summary card,
  // so it composes only the Badge/Button primitives + Moderno tokens, the same
  // allowance the Onboarding flow's `welcome` screen used.
  import { Badge, Button } from '@moderno/svelte'

  export type ReferralRewardStatusVariant = 'neutral' | 'solid' | 'success' | 'warning' | 'error' | 'info'

  export interface ReferralRewardItem {
    id: string
    email: string
    status?: string
    statusVariant?: ReferralRewardStatusVariant
  }

  let {
    invites,
    rewardAmount = '$50',
    onClaim,
    onBack,
    title = '¡Ganaste una recompensa!',
    description = 'Gracias por compartir Moderno — esto es lo que acumulaste hasta ahora.',
    claimLabel = 'Reclamar recompensa',
    backLabel = 'Volver',
  }: {
    invites?: ReferralRewardItem[]
    rewardAmount?: string
    onClaim: () => void
    onBack?: () => void
    title?: string
    description?: string
    claimLabel?: string
    backLabel?: string
  } = $props()
</script>

<div class="md-referral-reward">
  <div class="md-referral-reward__card">
    <div class="md-referral-reward__badge">🎉</div>
    <h1 class="md-referral-reward__title">{title}</h1>
    <p class="md-referral-reward__description">{description}</p>
    <p class="md-referral-reward__amount">{rewardAmount}</p>

    {#if invites && invites.length > 0}
      <div class="md-referral-reward__list">
        {#each invites as invite, index (invite.id)}
          <div class="md-referral-reward__row" class:md-referral-reward__row--last={index === invites.length - 1}>
            <span class="md-referral-reward__email">{invite.email}</span>
            {#if invite.status}
              <Badge variant={invite.statusVariant} dot>{invite.status}</Badge>
            {/if}
          </div>
        {/each}
      </div>
    {/if}

    <Button variant="primary" style="width: 100%;" onclick={() => onClaim()}>{claimLabel}</Button>
    {#if onBack}
      <button type="button" class="md-referral-reward__back" onclick={() => onBack?.()}>{backLabel}</button>
    {/if}
  </div>
</div>

<style>
  .md-referral-reward {
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: var(--md-surface-base);
  }
  .md-referral-reward__card {
    width: 100%;
    max-width: 420px;
    border: 1px solid var(--md-border-default);
    padding: 32px;
    text-align: center;
  }
  .md-referral-reward__badge {
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
  .md-referral-reward__title {
    font-family: var(--md-font-serif);
    font-size: var(--md-text-headline-lg);
    color: var(--md-text-primary);
    margin: 0 0 8px;
  }
  .md-referral-reward__description {
    font-size: var(--md-text-body-sm);
    line-height: var(--md-text-body-sm-lh);
    color: var(--md-text-secondary);
    margin: 0 0 24px;
  }
  .md-referral-reward__amount {
    font-family: var(--md-font-serif);
    font-size: 32px;
    color: var(--md-text-primary);
    margin: 0 0 24px;
  }
  .md-referral-reward__list {
    text-align: left;
    border: 1px solid var(--md-border-default);
    margin-bottom: 24px;
  }
  .md-referral-reward__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 16px;
    border-bottom: 1px solid var(--md-border-default);
  }
  .md-referral-reward__row--last {
    border-bottom: none;
  }
  .md-referral-reward__email {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-primary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
