import { useState } from 'react'
import { Welcome } from '../../screens/applications/welcome/Welcome'
import { ProfileSetup, type FormLayoutsValues } from '../../screens/applications/profile-setup/ProfileSetup'
import { PlanSelect, type GridListItem } from '../../screens/applications/plan-select/PlanSelect'
import { InviteTeam, type InviteTeamValues, type ListItem } from '../../screens/applications/invite-team/InviteTeam'

type Step = 'welcome' | 'profile' | 'plan' | 'invite'

const EMPTY_INVITE_VALUES: InviteTeamValues = { email: '' }

let inviteIdCounter = 0
function nextInviteId(): string {
  inviteIdCounter += 1
  return `invite-${inviteIdCounter}`
}

export interface OnboardingExampleProps {
  /** Which screen to mount first — lets the docs demo jump straight to a given
   * screen via a plain string prop (the Astro-island boundary serializes to
   * JSON, so this stays a string rather than richer state). Defaults to `'welcome'`. */
  initialStep?: Step
}

/**
 * Moderno flow example — Onboarding (React). Copy-paste; edit freely.
 * Thin assembly (ADR-0005): stitches the Welcome, ProfileSetup, PlanSelect
 * and InviteTeam screens using React's own useState for a local `step` plus
 * the profile values, selected plan and invites carried between them, with
 * no router dependency — the Applications domain capstone, whose screens
 * `composes` the FormLayouts, GridLists and List blocks. A runnable demo and
 * a copy-paste starting point, not the product.
 */
export function OnboardingExample({ initialStep = 'welcome' }: OnboardingExampleProps = {}) {
  const [step, setStep] = useState<Step>(initialStep)
  const [profileValues, setProfileValues] = useState<FormLayoutsValues>()
  const [selectedPlan, setSelectedPlan] = useState<GridListItem>()
  const [inviteValues, setInviteValues] = useState<InviteTeamValues>(EMPTY_INVITE_VALUES)
  const [invites, setInvites] = useState<ListItem[]>([])

  function handleWelcomeNext() {
    setStep('profile')
  }

  function handleProfileNext(values: FormLayoutsValues) {
    setProfileValues(values)
    setStep('plan')
  }

  function handlePlanNext(plan: GridListItem) {
    setSelectedPlan(plan)
    setStep('invite')
  }

  function handleInvite(values: InviteTeamValues) {
    setInvites((current) => [
      ...current,
      { id: nextInviteId(), title: values.email, status: 'Pendiente', statusVariant: 'warning' },
    ])
    setInviteValues(EMPTY_INVITE_VALUES)
  }

  function handleRemoveInvite(item: ListItem) {
    setInvites((current) => current.filter((invite) => invite.id !== item.id))
  }

  function handleFinish() {
    // Replace with your real "complete onboarding" request.
    console.log('Onboarding complete', { profile: profileValues, plan: selectedPlan, invites })
    setProfileValues(undefined)
    setSelectedPlan(undefined)
    setInviteValues(EMPTY_INVITE_VALUES)
    setInvites([])
    setStep('welcome')
  }

  switch (step) {
    case 'profile':
      return <ProfileSetup values={profileValues} onNext={handleProfileNext} onBack={() => setStep('welcome')} />
    case 'plan':
      return <PlanSelect onNext={handlePlanNext} onBack={() => setStep('profile')} />
    case 'invite':
      return (
        <InviteTeam
          values={inviteValues}
          onChange={setInviteValues}
          onInvite={handleInvite}
          invites={invites}
          onRemoveInvite={handleRemoveInvite}
          onNext={handleFinish}
          onBack={() => setStep('plan')}
        />
      )
    case 'welcome':
    default:
      return <Welcome onNext={handleWelcomeNext} />
  }
}
