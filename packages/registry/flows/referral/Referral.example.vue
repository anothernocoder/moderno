<script setup lang="ts">
// Moderno flow example — Referral (Vue). Copy-paste; edit freely.
// Thin assembly (ADR-0005): stitches the ReferralInvite, ReferralShare and
// ReferralReward screens using Vue's own ref() for a local `step` plus the
// referrer name, generated share link and growing invites list carried
// between them, with no router dependency — the cross-domain (Applications +
// Marketing) capstone, whose `share` screen `composes` the Marketing
// Share/Invite block instead of re-implementing share UI. A runnable demo
// and a copy-paste starting point, not the product.
import { ref } from 'vue'
import ReferralInvite from '../../screens/applications/referral-invite/ReferralInvite.vue'
import type { ReferralInviteValues } from '../../screens/applications/referral-invite/ReferralInvite.vue'
import ReferralShare from '../../screens/applications/referral-share/ReferralShare.vue'
import type { ShareChannel, ShareInviteItem } from '../../screens/applications/referral-share/ReferralShare.vue'
import ReferralReward from '../../screens/applications/referral-reward/ReferralReward.vue'
import type { ReferralRewardItem } from '../../screens/applications/referral-reward/ReferralReward.vue'

type Step = 'invite' | 'share' | 'reward'

const EMPTY_INVITE_VALUES: ReferralInviteValues = { name: '' }

let inviteIdCounter = 0
function nextInviteId(): string {
  inviteIdCounter += 1
  return `invite-${inviteIdCounter}`
}

function slugify(name: string): string {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'friend'
}

const props = withDefaults(
  defineProps<{
    /** Which screen to mount first — lets the docs demo jump straight to a given
     * screen via a plain string prop (the Astro-island boundary serializes to
     * JSON, so this stays a string rather than richer state). */
    initialStep?: Step
  }>(),
  { initialStep: 'invite' },
)

const step = ref<Step>(props.initialStep)
const inviteValues = ref<ReferralInviteValues>({ ...EMPTY_INVITE_VALUES })
const shareUrl = ref('')
const inviteEmail = ref('')
const invites = ref<ShareInviteItem[]>([])

function handleInviteNext(values: ReferralInviteValues) {
  inviteValues.value = values
  // Replace with your real "generate referral link" request.
  shareUrl.value = `https://moderno.app/r/${slugify(values.name)}`
  step.value = 'share'
}

function handleCopyLink(url: string) {
  // Replace with your real clipboard write (e.g. navigator.clipboard.writeText).
  console.log('Copied referral link', url)
}

function handleShare(channel: ShareChannel) {
  // Replace with your real share integration for the given channel.
  console.log('Share via', channel.id)
}

function handleInvite(email: string) {
  invites.value = [...invites.value, { id: nextInviteId(), email, status: 'Pendiente', statusVariant: 'warning' }]
  inviteEmail.value = ''
}

function handleClaim() {
  // Replace with your real "claim reward" request.
  console.log('Reward claimed', { referrer: inviteValues.value, invites: invites.value })
  inviteValues.value = { ...EMPTY_INVITE_VALUES }
  shareUrl.value = ''
  inviteEmail.value = ''
  invites.value = []
  step.value = 'invite'
}

const rewardItems = () =>
  invites.value.map(
    (invite): ReferralRewardItem => ({
      id: invite.id,
      email: invite.email,
      status: invite.status,
      statusVariant: invite.statusVariant,
    }),
  )
</script>

<template>
  <ReferralShare
    v-if="step === 'share'"
    :share-url="shareUrl"
    :invite-email="inviteEmail"
    :invites="invites"
    @copy-link="handleCopyLink"
    @share="handleShare"
    @update:invite-email="(v) => (inviteEmail = v)"
    @invite="handleInvite"
    @next="step = 'reward'"
    @back="step = 'invite'"
  />
  <ReferralReward
    v-else-if="step === 'reward'"
    :invites="rewardItems()"
    @claim="handleClaim"
    @back="step = 'share'"
  />
  <ReferralInvite
    v-else
    :values="inviteValues"
    @change="(v) => (inviteValues = v)"
    @next="handleInviteNext"
  />
</template>
