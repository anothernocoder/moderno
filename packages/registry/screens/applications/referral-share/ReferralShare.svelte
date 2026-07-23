<script lang="ts">
  // Moderno screen — ReferralShare (Svelte). Copy-paste; edit freely.
  // Second step of the Referral flow (ADR-0005, cross-domain Applications +
  // Marketing): composes the Marketing Share/Invite block for the link,
  // channel-share buttons and email-invite form + pending-invites list,
  // instead of re-implementing any of that markup. This screen owns no state
  // of its own — `shareUrl`, `inviteEmail` and `invites` are all controlled,
  // carried by the example assembly (or your own code) from the previous
  // `referral-invite` step.
  import { Button } from '@moderno/svelte'
  import ShareInvite from '../../../blocks/marketing/share-invite/ShareInvite.svelte'
  import type { ShareChannel, ShareInviteItem } from '../../../blocks/marketing/share-invite/ShareInvite.svelte'

  export type { ShareChannel, ShareInviteItem }

  let {
    shareUrl,
    onCopyLink,
    channels,
    onShare,
    inviteEmail,
    onInviteEmailChange,
    onInvite,
    invites,
    onNext,
    onBack,
    title = 'Comparte tu enlace',
    description = 'Copia tu enlace, compártelo en tus redes o invita por correo.',
    nextLabel = 'Continuar',
    backLabel = 'Volver',
  }: {
    shareUrl: string
    onCopyLink?: (url: string) => void
    channels?: ShareChannel[]
    onShare?: (channel: ShareChannel) => void
    inviteEmail: string
    onInviteEmailChange: (value: string) => void
    onInvite: (email: string) => void
    invites?: ShareInviteItem[]
    onNext: () => void
    onBack?: () => void
    title?: string
    description?: string
    nextLabel?: string
    backLabel?: string
  } = $props()
</script>

<div class="md-referral-share">
  <div class="md-referral-share__header">
    <div>
      <h1 class="md-referral-share__title">{title}</h1>
      <p class="md-referral-share__description">{description}</p>
    </div>
    {#if onBack}
      <button type="button" class="md-referral-share__link" onclick={() => onBack?.()}>{backLabel}</button>
    {/if}
  </div>

  <div class="md-referral-share__body">
    <ShareInvite
      {shareUrl}
      {onCopyLink}
      {channels}
      {onShare}
      {inviteEmail}
      {onInviteEmailChange}
      {onInvite}
      {invites}
    />
  </div>

  <div class="md-referral-share__footer">
    <Button variant="primary" onclick={() => onNext()}>{nextLabel}</Button>
  </div>
</div>

<style>
  .md-referral-share {
    min-height: 100%;
    background: var(--md-surface-base);
    padding: 24px;
  }
  .md-referral-share__header {
    max-width: 640px;
    margin: 0 auto 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 8px 12px;
  }
  .md-referral-share__title {
    font-family: var(--md-font-serif);
    font-size: var(--md-text-headline-lg);
    color: var(--md-text-primary);
    margin: 0 0 4px;
  }
  .md-referral-share__description {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
    margin: 0;
  }
  .md-referral-share__link {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    font-size: var(--md-text-body-sm);
    color: var(--md-text-primary);
    text-decoration: underline;
    cursor: pointer;
  }
  .md-referral-share__body {
    max-width: 640px;
    margin: 0 auto;
  }
  .md-referral-share__footer {
    max-width: 640px;
    margin: 24px auto 0;
    display: flex;
    justify-content: flex-end;
  }
</style>
