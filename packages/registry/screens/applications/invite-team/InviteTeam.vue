<script setup lang="ts">
// Moderno screen — InviteTeam (Vue). Copy-paste; edit freely.
// Final step of the Onboarding flow (ADR-0005): composes the Applications
// List block for the invited-member rows (avatar, status badge, row action)
// instead of re-implementing that markup. The "add teammate" email field is
// this screen's own simple form — there's no dedicated "invite by email"
// block to compose, so it isn't duplicating any block's internals, the same
// allowance the Checkout ticket used for its confirmation screen. `invite`
// fires on submit; `remove-invite` forwards the composed List's
// `item-action`; `next` finishes onboarding.
import { Button, Input } from '@moderno/vue'
import List from '../../../blocks/applications/list/List.vue'
import type { ListItem } from '../../../blocks/applications/list/List.vue'

export type { ListItem }

export interface InviteTeamValues {
  email: string
}

const props = withDefaults(
  defineProps<{
    values: InviteTeamValues
    invites?: ListItem[]
    title?: string
    description?: string
    emailPlaceholder?: string
    inviteLabel?: string
    nextLabel?: string
    backLabel?: string
  }>(),
  {
    title: 'Invita a tu equipo',
    description: 'Agrega compañeros por correo — pueden aceptar la invitación después.',
    emailPlaceholder: 'nombre@empresa.com',
    inviteLabel: 'Invitar',
    nextLabel: 'Finalizar',
    backLabel: 'Volver',
  },
)
const emit = defineEmits<{
  change: [values: InviteTeamValues]
  invite: [values: InviteTeamValues]
  removeInvite: [item: ListItem]
  next: []
  back: []
}>()

function handleSubmit() {
  if (!props.values.email) return
  emit('invite', props.values)
}
</script>

<template>
  <div class="md-invite-team">
    <div class="md-invite-team__header">
      <div>
        <h1 class="md-invite-team__title">{{ title }}</h1>
        <p class="md-invite-team__description">{{ description }}</p>
      </div>
      <button type="button" class="md-invite-team__link" @click="emit('back')">{{ backLabel }}</button>
    </div>

    <div class="md-invite-team__body">
      <form class="md-invite-team__row" @submit.prevent="handleSubmit">
        <div class="md-invite-team__field">
          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            :placeholder="emailPlaceholder"
            :model-value="values.email"
            @update:model-value="(v) => emit('change', { ...values, email: v ?? '' })"
          />
        </div>
        <Button type="submit" variant="secondary">{{ inviteLabel }}</Button>
      </form>

      <template v-if="invites && invites.length > 0">
        <p class="md-invite-team__list-heading">Invitaciones enviadas</p>
        <List :items="invites" @item-action="emit('removeInvite', $event)" />
      </template>
    </div>

    <div class="md-invite-team__footer">
      <Button variant="primary" @click="emit('next')">{{ nextLabel }}</Button>
    </div>
  </div>
</template>

<style scoped>
.md-invite-team {
  min-height: 100%;
  background: var(--md-surface-base);
  padding: 24px;
}
.md-invite-team__header {
  max-width: 640px;
  margin: 0 auto 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 12px;
}
.md-invite-team__title {
  font-family: var(--md-font-serif);
  font-size: var(--md-text-headline-lg);
  color: var(--md-text-primary);
  margin: 0 0 4px;
}
.md-invite-team__description {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
  margin: 0;
}
.md-invite-team__link {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  font-size: var(--md-text-body-sm);
  color: var(--md-text-primary);
  text-decoration: underline;
  cursor: pointer;
}
.md-invite-team__body {
  max-width: 640px;
  margin: 0 auto;
}
.md-invite-team__row {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  margin-bottom: 24px;
}
.md-invite-team__field {
  flex: 1;
  min-width: 0;
}
.md-invite-team__list-heading {
  font-size: var(--md-text-label-md);
  color: var(--md-text-secondary);
  margin: 0 0 8px;
}
.md-invite-team__footer {
  max-width: 640px;
  margin: 24px auto 0;
  display: flex;
  justify-content: flex-end;
}
</style>
