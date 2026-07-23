<script lang="ts">
  // Moderno block — ShareInvite (Svelte). Copy-paste; edit freely.
  // Data-display block (design system §2.3 "Share and Invite"): a shareable
  // link with a copy action, a row of channel share buttons, and an
  // email-invite form with a list of pending invites. Purely presentational —
  // no clipboard access or async logic lives here, just callbacks
  // (`onCopyLink`, `onShare`, `onInvite`) the consumer wires up. Uses the
  // Input/Button/Badge primitives + Moderno tokens (--md-* custom properties).
  import { Badge, Button, Input } from '@moderno/svelte'

  export type ShareInviteStatusVariant = 'neutral' | 'solid' | 'success' | 'warning' | 'error' | 'info'

  export interface ShareChannel {
    id: string
    label: string
  }

  export interface ShareInviteItem {
    id: string
    email: string
    status?: string
    statusVariant?: ShareInviteStatusVariant
  }

  let {
    title = 'Comparte e invita',
    description = 'Comparte tu enlace o invita a colaboradores por correo.',
    shareUrl = 'https://moderno.app/invite/abc123',
    linkLabel = 'Tu enlace para compartir',
    copyLabel = 'Copiar',
    onCopyLink,
    channels = [
      { id: 'email', label: 'Correo' },
      { id: 'twitter', label: 'X / Twitter' },
      { id: 'whatsapp', label: 'WhatsApp' },
    ],
    onShare,
    inviteEmail = '',
    onInviteEmailChange,
    inviteEmailPlaceholder = 'nombre@empresa.com',
    inviteLabel = 'Invitar',
    onInvite,
    invites,
    invitesLabel = 'Invitaciones pendientes',
  }: {
    title?: string
    description?: string
    shareUrl?: string
    linkLabel?: string
    copyLabel?: string
    onCopyLink?: (url: string) => void
    channels?: ShareChannel[]
    onShare?: (channel: ShareChannel) => void
    inviteEmail?: string
    onInviteEmailChange?: (value: string) => void
    inviteEmailPlaceholder?: string
    inviteLabel?: string
    onInvite?: (email: string) => void
    invites?: ShareInviteItem[]
    invitesLabel?: string
  } = $props()

  function handleInviteSubmit(event: SubmitEvent) {
    event.preventDefault()
    if (!inviteEmail) return
    onInvite?.(inviteEmail)
  }
</script>

<section class="md-share-invite">
  <div class="md-share-invite__header">
    <h2 class="md-share-invite__title">{title}</h2>
    {#if description}<p class="md-share-invite__description">{description}</p>{/if}
  </div>

  <div class="md-share-invite__group">
    <p class="md-share-invite__group-label">{linkLabel}</p>
    <div class="md-share-invite__link-row">
      <div class="md-share-invite__link-field">
        <Input readonly value={shareUrl} aria-label={linkLabel} />
      </div>
      <Button variant="secondary" onclick={() => onCopyLink?.(shareUrl)}>{copyLabel}</Button>
    </div>
  </div>

  {#if channels.length > 0}
    <div class="md-share-invite__group">
      <div class="md-share-invite__channels-row">
        {#each channels as channel (channel.id)}
          <Button variant="secondary" size="sm" onclick={() => onShare?.(channel)}>{channel.label}</Button>
        {/each}
      </div>
    </div>
  {/if}

  <form class="md-share-invite__invite-row" onsubmit={handleInviteSubmit}>
    <div class="md-share-invite__invite-field">
      <Input
        label="Correo electrónico"
        name="email"
        type="email"
        placeholder={inviteEmailPlaceholder}
        value={inviteEmail}
        oninput={(event: Event) => onInviteEmailChange?.((event.currentTarget as HTMLInputElement).value)}
      />
    </div>
    <Button type="submit" variant="primary">{inviteLabel}</Button>
  </form>

  {#if invites && invites.length > 0}
    <div class="md-share-invite__invites">
      <p class="md-share-invite__group-label">{invitesLabel}</p>
      <div class="md-share-invite__invites-list">
        {#each invites as invite, index (invite.id)}
          <div class="md-share-invite__invite-row-item" class:md-share-invite__invite-row-item--last={index === invites.length - 1}>
            <span class="md-share-invite__invite-email">{invite.email}</span>
            {#if invite.status}
              <Badge variant={invite.statusVariant} dot>{invite.status}</Badge>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {/if}
</section>

<style>
  .md-share-invite {
    padding: 32px 24px;
    background: var(--md-surface-raised);
    border: 1px solid var(--md-border-default);
  }
  .md-share-invite__header {
    margin-bottom: 24px;
  }
  .md-share-invite__title {
    font-family: var(--md-font-serif);
    font-size: var(--md-text-headline-sm);
    color: var(--md-text-primary);
    margin: 0 0 4px;
  }
  .md-share-invite__description {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
    margin: 0;
  }
  .md-share-invite__group {
    margin-bottom: 24px;
  }
  .md-share-invite__group-label {
    font-size: var(--md-text-label-md);
    color: var(--md-text-secondary);
    margin: 0 0 8px;
  }
  .md-share-invite__link-row,
  .md-share-invite__invite-row {
    display: flex;
    align-items: flex-end;
    gap: 12px;
  }
  .md-share-invite__link-field,
  .md-share-invite__invite-field {
    flex: 1;
    min-width: 0;
  }
  .md-share-invite__channels-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .md-share-invite__invites {
    margin-top: 24px;
  }
  .md-share-invite__invites-list {
    background: var(--md-surface-base);
    border: 1px solid var(--md-border-default);
  }
  .md-share-invite__invite-row-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 16px;
    border-bottom: 1px solid var(--md-border-default);
  }
  .md-share-invite__invite-row-item--last {
    border-bottom: none;
  }
  .md-share-invite__invite-email {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-primary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
