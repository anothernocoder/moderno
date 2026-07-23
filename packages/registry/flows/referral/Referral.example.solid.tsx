import { createSignal, createMemo, Switch, Match } from 'solid-js'
import { ReferralInvite, type ReferralInviteValues } from '../../screens/applications/referral-invite/ReferralInvite.solid'
import { ReferralShare, type ShareChannel, type ShareInviteItem } from '../../screens/applications/referral-share/ReferralShare.solid'
import { ReferralReward, type ReferralRewardItem } from '../../screens/applications/referral-reward/ReferralReward.solid'

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

export interface ReferralExampleProps {
  /** Which screen to mount first — lets the docs demo jump straight to a given
   * screen via a plain string prop (the Astro-island boundary serializes to
   * JSON, so this stays a string rather than richer state). Defaults to `'invite'`. */
  initialStep?: Step
}

/**
 * Moderno flow example — Referral (Solid). Copy-paste; edit freely.
 * Thin assembly (ADR-0005): stitches the ReferralInvite, ReferralShare and
 * ReferralReward screens using Solid's own createSignal for a local `step`
 * plus the referrer name, generated share link and growing invites list
 * carried between them, with no router dependency — the cross-domain
 * (Applications + Marketing) capstone, whose `share` screen `composes` the
 * Marketing Share/Invite block instead of re-implementing share UI. A
 * runnable demo and a copy-paste starting point, not the product.
 */
export function ReferralExample(props: ReferralExampleProps = {}) {
  const [step, setStep] = createSignal<Step>(props.initialStep ?? 'invite')
  const [inviteValues, setInviteValues] = createSignal<ReferralInviteValues>({ ...EMPTY_INVITE_VALUES })
  const [shareUrl, setShareUrl] = createSignal('')
  const [inviteEmail, setInviteEmail] = createSignal('')
  const [invites, setInvites] = createSignal<ShareInviteItem[]>([])

  function handleInviteNext(values: ReferralInviteValues) {
    setInviteValues(values)
    // Replace with your real "generate referral link" request.
    setShareUrl(`https://moderno.app/r/${slugify(values.name)}`)
    setStep('share')
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
    setInvites((current) => [...current, { id: nextInviteId(), email, status: 'Pendiente', statusVariant: 'warning' }])
    setInviteEmail('')
  }

  function handleClaim() {
    // Replace with your real "claim reward" request.
    console.log('Reward claimed', { referrer: inviteValues(), invites: invites() })
    setInviteValues({ ...EMPTY_INVITE_VALUES })
    setShareUrl('')
    setInviteEmail('')
    setInvites([])
    setStep('invite')
  }

  const rewardItems = createMemo<ReferralRewardItem[]>(() =>
    invites().map((invite) => ({
      id: invite.id,
      email: invite.email,
      status: invite.status,
      statusVariant: invite.statusVariant,
    })),
  )

  return (
    <Switch fallback={<ReferralInvite values={inviteValues()} onChange={setInviteValues} onNext={handleInviteNext} />}>
      <Match when={step() === 'share'}>
        <ReferralShare
          shareUrl={shareUrl()}
          onCopyLink={handleCopyLink}
          onShare={handleShare}
          inviteEmail={inviteEmail()}
          onInviteEmailChange={setInviteEmail}
          onInvite={handleInvite}
          invites={invites()}
          onNext={() => setStep('reward')}
          onBack={() => setStep('invite')}
        />
      </Match>
      <Match when={step() === 'reward'}>
        <ReferralReward invites={rewardItems()} onClaim={handleClaim} onBack={() => setStep('share')} />
      </Match>
      <Match when={step() === 'invite'}>
        <ReferralInvite values={inviteValues()} onChange={setInviteValues} onNext={handleInviteNext} />
      </Match>
    </Switch>
  )
}
