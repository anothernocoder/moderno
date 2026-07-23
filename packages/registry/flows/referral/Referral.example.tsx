import { useState } from 'react'
import { ReferralInvite, type ReferralInviteValues } from '../../screens/applications/referral-invite/ReferralInvite'
import { ReferralShare, type ShareChannel, type ShareInviteItem } from '../../screens/applications/referral-share/ReferralShare'
import { ReferralReward, type ReferralRewardItem } from '../../screens/applications/referral-reward/ReferralReward'

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
 * Moderno flow example — Referral (React). Copy-paste; edit freely.
 * Thin assembly (ADR-0005): stitches the ReferralInvite, ReferralShare and
 * ReferralReward screens using React's own useState for a local `step` plus
 * the referrer name, generated share link and growing invites list carried
 * between them, with no router dependency — the cross-domain (Applications +
 * Marketing) capstone, whose `share` screen `composes` the Marketing
 * Share/Invite block instead of re-implementing share UI. A runnable demo
 * and a copy-paste starting point, not the product.
 */
export function ReferralExample({ initialStep = 'invite' }: ReferralExampleProps = {}) {
  const [step, setStep] = useState<Step>(initialStep)
  const [inviteValues, setInviteValues] = useState<ReferralInviteValues>(EMPTY_INVITE_VALUES)
  const [shareUrl, setShareUrl] = useState('')
  const [inviteEmail, setInviteEmail] = useState('')
  const [invites, setInvites] = useState<ShareInviteItem[]>([])

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
    console.log('Reward claimed', { referrer: inviteValues, invites })
    setInviteValues(EMPTY_INVITE_VALUES)
    setShareUrl('')
    setInviteEmail('')
    setInvites([])
    setStep('invite')
  }

  const rewardItems: ReferralRewardItem[] = invites.map((invite) => ({
    id: invite.id,
    email: invite.email,
    status: invite.status,
    statusVariant: invite.statusVariant,
  }))

  switch (step) {
    case 'share':
      return (
        <ReferralShare
          shareUrl={shareUrl}
          onCopyLink={handleCopyLink}
          onShare={handleShare}
          inviteEmail={inviteEmail}
          onInviteEmailChange={setInviteEmail}
          onInvite={handleInvite}
          invites={invites}
          onNext={() => setStep('reward')}
          onBack={() => setStep('invite')}
        />
      )
    case 'reward':
      return <ReferralReward invites={rewardItems} onClaim={handleClaim} onBack={() => setStep('share')} />
    case 'invite':
    default:
      return <ReferralInvite values={inviteValues} onChange={setInviteValues} onNext={handleInviteNext} />
  }
}
