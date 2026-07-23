<script lang="ts">
  // Moderno flow example — Referral (Svelte). Copy-paste; edit freely.
  // Thin assembly (ADR-0005): stitches the ReferralInvite, ReferralShare and
  // ReferralReward screens using Svelte's own $state runes for a local `step`
  // plus the referrer name, generated share link and growing invites list
  // carried between them, with no router dependency — the cross-domain
  // (Applications + Marketing) capstone, whose `share` screen `composes` the
  // Marketing Share/Invite block instead of re-implementing share UI. A
  // runnable demo and a copy-paste starting point, not the product.
  import ReferralInvite from '../../screens/applications/referral-invite/ReferralInvite.svelte'
  import type { ReferralInviteValues } from '../../screens/applications/referral-invite/ReferralInvite.svelte'
  import ReferralShare from '../../screens/applications/referral-share/ReferralShare.svelte'
  import type { ShareChannel, ShareInviteItem } from '../../screens/applications/referral-share/ReferralShare.svelte'
  import ReferralReward from '../../screens/applications/referral-reward/ReferralReward.svelte'
  import type { ReferralRewardItem } from '../../screens/applications/referral-reward/ReferralReward.svelte'

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

  // `initialStep` lets the docs demo jump straight to a given screen via a
  // plain string prop (the Astro-island boundary serializes to JSON, so this
  // stays a string rather than richer state).
  let { initialStep = 'invite' }: { initialStep?: Step } = $props()

  let step: Step = $state(initialStep)
  let inviteValues: ReferralInviteValues = $state({ ...EMPTY_INVITE_VALUES })
  let shareUrl: string = $state('')
  let inviteEmail: string = $state('')
  let invites: ShareInviteItem[] = $state([])

  function handleInviteNext(values: ReferralInviteValues) {
    inviteValues = values
    // Replace with your real "generate referral link" request.
    shareUrl = `https://moderno.app/r/${slugify(values.name)}`
    step = 'share'
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
    invites = [...invites, { id: nextInviteId(), email, status: 'Pendiente', statusVariant: 'warning' }]
    inviteEmail = ''
  }

  function handleClaim() {
    // Replace with your real "claim reward" request.
    console.log('Reward claimed', { referrer: inviteValues, invites })
    inviteValues = { ...EMPTY_INVITE_VALUES }
    shareUrl = ''
    inviteEmail = ''
    invites = []
    step = 'invite'
  }

  let rewardItems: ReferralRewardItem[] = $derived(
    invites.map((invite) => ({ id: invite.id, email: invite.email, status: invite.status, statusVariant: invite.statusVariant })),
  )
</script>

{#if step === 'share'}
  <ReferralShare
    {shareUrl}
    onCopyLink={handleCopyLink}
    onShare={handleShare}
    {inviteEmail}
    onInviteEmailChange={(v) => (inviteEmail = v)}
    onInvite={handleInvite}
    {invites}
    onNext={() => (step = 'reward')}
    onBack={() => (step = 'invite')}
  />
{:else if step === 'reward'}
  <ReferralReward invites={rewardItems} onClaim={handleClaim} onBack={() => (step = 'share')} />
{:else}
  <ReferralInvite values={inviteValues} onChange={(v) => (inviteValues = v)} onNext={handleInviteNext} />
{/if}
