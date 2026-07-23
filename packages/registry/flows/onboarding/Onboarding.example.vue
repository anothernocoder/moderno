<script setup lang="ts">
// Moderno flow example — Onboarding (Vue). Copy-paste; edit freely.
// Thin assembly (ADR-0005): stitches the Welcome, ProfileSetup, PlanSelect
// and InviteTeam screens using Vue's own ref() for a local `step` plus the
// profile values, selected plan and invites carried between them, with no
// router dependency — the Applications domain capstone, whose screens
// `composes` the FormLayouts, GridLists and List blocks. A runnable demo and
// a copy-paste starting point, not the product.
import { ref } from 'vue'
import Welcome from '../../screens/applications/welcome/Welcome.vue'
import ProfileSetup from '../../screens/applications/profile-setup/ProfileSetup.vue'
import type { FormLayoutsValues } from '../../screens/applications/profile-setup/ProfileSetup.vue'
import PlanSelect from '../../screens/applications/plan-select/PlanSelect.vue'
import type { GridListItem } from '../../screens/applications/plan-select/PlanSelect.vue'
import InviteTeam from '../../screens/applications/invite-team/InviteTeam.vue'
import type { InviteTeamValues, ListItem } from '../../screens/applications/invite-team/InviteTeam.vue'

type Step = 'welcome' | 'profile' | 'plan' | 'invite'

const EMPTY_INVITE_VALUES: InviteTeamValues = { email: '' }

let inviteIdCounter = 0
function nextInviteId(): string {
  inviteIdCounter += 1
  return `invite-${inviteIdCounter}`
}

const props = withDefaults(
  defineProps<{
    /** Which screen to mount first — lets the docs demo jump straight to a given
     * screen via a plain string prop (the Astro-island boundary serializes to
     * JSON, so this stays a string rather than richer state). */
    initialStep?: Step
  }>(),
  { initialStep: 'welcome' },
)

const step = ref<Step>(props.initialStep)
const profileValues = ref<FormLayoutsValues>()
const selectedPlan = ref<GridListItem>()
const inviteValues = ref<InviteTeamValues>({ ...EMPTY_INVITE_VALUES })
const invites = ref<ListItem[]>([])

function handleWelcomeNext() {
  step.value = 'profile'
}

function handleProfileNext(values: FormLayoutsValues) {
  profileValues.value = values
  step.value = 'plan'
}

function handlePlanNext(plan: GridListItem) {
  selectedPlan.value = plan
  step.value = 'invite'
}

function handleInvite(values: InviteTeamValues) {
  invites.value = [...invites.value, { id: nextInviteId(), title: values.email, status: 'Pendiente', statusVariant: 'warning' }]
  inviteValues.value = { ...EMPTY_INVITE_VALUES }
}

function handleRemoveInvite(item: ListItem) {
  invites.value = invites.value.filter((invite) => invite.id !== item.id)
}

function handleFinish() {
  // Replace with your real "complete onboarding" request.
  console.log('Onboarding complete', { profile: profileValues.value, plan: selectedPlan.value, invites: invites.value })
  profileValues.value = undefined
  selectedPlan.value = undefined
  inviteValues.value = { ...EMPTY_INVITE_VALUES }
  invites.value = []
  step.value = 'welcome'
}
</script>

<template>
  <ProfileSetup
    v-if="step === 'profile'"
    :values="profileValues"
    @next="handleProfileNext"
    @back="() => (step = 'welcome')"
  />
  <PlanSelect v-else-if="step === 'plan'" @next="handlePlanNext" @back="() => (step = 'profile')" />
  <InviteTeam
    v-else-if="step === 'invite'"
    :values="inviteValues"
    :invites="invites"
    @change="(v) => (inviteValues = v)"
    @invite="handleInvite"
    @remove-invite="handleRemoveInvite"
    @next="handleFinish"
    @back="() => (step = 'plan')"
  />
  <Welcome v-else @next="handleWelcomeNext" />
</template>
