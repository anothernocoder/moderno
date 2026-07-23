<script setup lang="ts">
// Moderno screen — ReferralShare (Vue). Copy-paste; edit freely.
// Second step of the Referral flow (ADR-0005, cross-domain Applications +
// Marketing): composes the Marketing Share/Invite block for the link,
// channel-share buttons and email-invite form + pending-invites list,
// instead of re-implementing any of that markup. This screen owns no state
// of its own — `shareUrl`, `inviteEmail` and `invites` are all controlled,
// carried by the example assembly (or your own code) from the previous
// `referral-invite` step.
import { Button } from '@moderno/vue'
import ShareInvite from '../../../blocks/marketing/share-invite/ShareInvite.vue'
import type { ShareChannel, ShareInviteItem } from '../../../blocks/marketing/share-invite/ShareInvite.vue'

export type { ShareChannel, ShareInviteItem }

withDefaults(
  defineProps<{
    shareUrl: string
    channels?: ShareChannel[]
    inviteEmail: string
    invites?: ShareInviteItem[]
    title?: string
    description?: string
    nextLabel?: string
    backLabel?: string
  }>(),
  {
    title: 'Comparte tu enlace',
    description: 'Copia tu enlace, compártelo en tus redes o invita por correo.',
    nextLabel: 'Continuar',
    backLabel: 'Volver',
  },
)

const emit = defineEmits<{
  'copy-link': [url: string]
  share: [channel: ShareChannel]
  'update:inviteEmail': [value: string]
  invite: [email: string]
  next: []
  back: []
}>()
</script>

<template>
  <div class="md-referral-share">
    <div class="md-referral-share__header">
      <div>
        <h1 class="md-referral-share__title">{{ title }}</h1>
        <p class="md-referral-share__description">{{ description }}</p>
      </div>
      <button type="button" class="md-referral-share__link" @click="emit('back')">{{ backLabel }}</button>
    </div>

    <div class="md-referral-share__body">
      <ShareInvite
        :share-url="shareUrl"
        :channels="channels"
        :invite-email="inviteEmail"
        :invites="invites"
        @copy-link="emit('copy-link', $event)"
        @share="emit('share', $event)"
        @update:invite-email="emit('update:inviteEmail', $event)"
        @invite="emit('invite', $event)"
      />
    </div>

    <div class="md-referral-share__footer">
      <Button variant="primary" @click="emit('next')">{{ nextLabel }}</Button>
    </div>
  </div>
</template>

<style scoped>
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
