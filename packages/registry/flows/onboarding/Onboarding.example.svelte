<script lang="ts">
  // Moderno flow example — Onboarding (Svelte). Copy-paste; edit freely.
  // Thin assembly (ADR-0005): stitches the Welcome, ProfileSetup, PlanSelect
  // and InviteTeam screens using Svelte's own $state runes for a local `step`
  // plus the profile values, selected plan and invites carried between them,
  // with no router dependency — the Applications domain capstone, whose
  // screens `composes` the FormLayouts, GridLists and List blocks. A runnable
  // demo and a copy-paste starting point, not the product.
  import Welcome from '../../screens/applications/welcome/Welcome.svelte'
  import ProfileSetup from '../../screens/applications/profile-setup/ProfileSetup.svelte'
  import type { FormLayoutsValues } from '../../screens/applications/profile-setup/ProfileSetup.svelte'
  import PlanSelect from '../../screens/applications/plan-select/PlanSelect.svelte'
  import type { GridListItem } from '../../screens/applications/plan-select/PlanSelect.svelte'
  import InviteTeam from '../../screens/applications/invite-team/InviteTeam.svelte'
  import type { InviteTeamValues, ListItem } from '../../screens/applications/invite-team/InviteTeam.svelte'

  type Step = 'welcome' | 'profile' | 'plan' | 'invite'

  const EMPTY_INVITE_VALUES: InviteTeamValues = { email: '' }

  let inviteIdCounter = 0
  function nextInviteId(): string {
    inviteIdCounter += 1
    return `invite-${inviteIdCounter}`
  }

  // `initialStep` lets the docs demo jump straight to a given screen via a
  // plain string prop (the Astro-island boundary serializes to JSON, so this
  // stays a string rather than richer state).
  let { initialStep = 'welcome' }: { initialStep?: Step } = $props()

  let step: Step = $state(initialStep)
  let profileValues: FormLayoutsValues | undefined = $state(undefined)
  let selectedPlan: GridListItem | undefined = $state(undefined)
  let inviteValues: InviteTeamValues = $state({ ...EMPTY_INVITE_VALUES })
  let invites: ListItem[] = $state([])

  function handleWelcomeNext() {
    step = 'profile'
  }

  function handleProfileNext(values: FormLayoutsValues) {
    profileValues = values
    step = 'plan'
  }

  function handlePlanNext(plan: GridListItem) {
    selectedPlan = plan
    step = 'invite'
  }

  function handleInvite(values: InviteTeamValues) {
    invites = [...invites, { id: nextInviteId(), title: values.email, status: 'Pendiente', statusVariant: 'warning' }]
    inviteValues = { ...EMPTY_INVITE_VALUES }
  }

  function handleRemoveInvite(item: ListItem) {
    invites = invites.filter((invite) => invite.id !== item.id)
  }

  function handleFinish() {
    // Replace with your real "complete onboarding" request.
    console.log('Onboarding complete', { profile: profileValues, plan: selectedPlan, invites })
    profileValues = undefined
    selectedPlan = undefined
    inviteValues = { ...EMPTY_INVITE_VALUES }
    invites = []
    step = 'welcome'
  }
</script>

{#if step === 'profile'}
  <ProfileSetup values={profileValues} onNext={handleProfileNext} onBack={() => (step = 'welcome')} />
{:else if step === 'plan'}
  <PlanSelect onNext={handlePlanNext} onBack={() => (step = 'profile')} />
{:else if step === 'invite'}
  <InviteTeam
    values={inviteValues}
    onChange={(v) => (inviteValues = v)}
    onInvite={handleInvite}
    {invites}
    onRemoveInvite={handleRemoveInvite}
    onNext={handleFinish}
    onBack={() => (step = 'plan')}
  />
{:else}
  <Welcome onNext={handleWelcomeNext} />
{/if}
