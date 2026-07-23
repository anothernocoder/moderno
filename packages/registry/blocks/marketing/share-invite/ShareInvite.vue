<script setup lang="ts">
// Moderno block — ShareInvite (Vue). Copy-paste; edit freely.
// Data-display block (design system §2.3 "Share and Invite"): a shareable
// link with a copy action, a row of channel share buttons, and an
// email-invite form with a list of pending invites. Purely presentational —
// no clipboard access or async logic lives here, just emitted events
// (`copy-link`, `share`, `invite`) the consumer wires up. Uses the
// Input/Button/Badge primitives + Moderno tokens (--md-* custom properties).
import { Badge, Button, Input } from '@moderno/vue'

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

const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    shareUrl?: string
    linkLabel?: string
    copyLabel?: string
    channels?: ShareChannel[]
    inviteEmail?: string
    inviteEmailPlaceholder?: string
    inviteLabel?: string
    invites?: ShareInviteItem[]
    invitesLabel?: string
  }>(),
  {
    title: 'Comparte e invita',
    description: 'Comparte tu enlace o invita a colaboradores por correo.',
    shareUrl: 'https://moderno.app/invite/abc123',
    linkLabel: 'Tu enlace para compartir',
    copyLabel: 'Copiar',
    channels: () => [
      { id: 'email', label: 'Correo' },
      { id: 'twitter', label: 'X / Twitter' },
      { id: 'whatsapp', label: 'WhatsApp' },
    ],
    inviteEmail: '',
    inviteEmailPlaceholder: 'nombre@empresa.com',
    inviteLabel: 'Invitar',
    invitesLabel: 'Invitaciones pendientes',
  },
)

const emit = defineEmits<{
  'copy-link': [url: string]
  share: [channel: ShareChannel]
  'update:inviteEmail': [value: string]
  invite: [email: string]
}>()

function handleInviteSubmit() {
  if (!props.inviteEmail) return
  emit('invite', props.inviteEmail)
}
</script>

<template>
  <section class="md-share-invite">
    <div class="md-share-invite__header">
      <h2 class="md-share-invite__title">{{ title }}</h2>
      <p v-if="description" class="md-share-invite__description">{{ description }}</p>
    </div>

    <div class="md-share-invite__group">
      <p class="md-share-invite__group-label">{{ linkLabel }}</p>
      <div class="md-share-invite__link-row">
        <div class="md-share-invite__link-field">
          <Input readonly :model-value="shareUrl" :aria-label="linkLabel" />
        </div>
        <Button variant="secondary" @click="emit('copy-link', shareUrl)">{{ copyLabel }}</Button>
      </div>
    </div>

    <div v-if="channels.length > 0" class="md-share-invite__group">
      <div class="md-share-invite__channels-row">
        <Button
          v-for="channel in channels"
          :key="channel.id"
          variant="secondary"
          size="sm"
          @click="emit('share', channel)"
        >
          {{ channel.label }}
        </Button>
      </div>
    </div>

    <form class="md-share-invite__invite-row" @submit.prevent="handleInviteSubmit">
      <div class="md-share-invite__invite-field">
        <Input
          label="Correo electrónico"
          name="email"
          type="email"
          :placeholder="inviteEmailPlaceholder"
          :model-value="inviteEmail"
          @update:model-value="(v) => emit('update:inviteEmail', v ?? '')"
        />
      </div>
      <Button type="submit" variant="primary">{{ inviteLabel }}</Button>
    </form>

    <div v-if="invites && invites.length > 0" class="md-share-invite__invites">
      <p class="md-share-invite__group-label">{{ invitesLabel }}</p>
      <div class="md-share-invite__invites-list">
        <div
          v-for="(invite, index) in invites"
          :key="invite.id"
          class="md-share-invite__invite-row-item"
          :class="{ 'md-share-invite__invite-row-item--last': index === invites.length - 1 }"
        >
          <span class="md-share-invite__invite-email">{{ invite.email }}</span>
          <Badge v-if="invite.status" :variant="invite.statusVariant" dot>{{ invite.status }}</Badge>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
