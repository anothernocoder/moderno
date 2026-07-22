<script lang="ts">
  // Moderno block — FormLayouts (Svelte). Copy-paste; edit freely.
  // Settings/profile-edit form page layout: grouped fieldsets with headings, a responsive
  // multi-column field grid, section dividers, and a footer action row. Uses the Input +
  // Textarea + Select + Divider + Button primitives + Moderno tokens.
  import { Button, Divider, Input, Select, Textarea } from '@moderno/svelte'
  import type { SelectItem } from '@moderno/svelte'

  export interface FormLayoutsValues {
    firstName: string
    lastName: string
    email: string
    bio: string
    role: string
    timezone: string
  }

  const DEFAULT_VALUES: FormLayoutsValues = {
    firstName: 'Camila',
    lastName: 'Restrepo',
    email: 'camila@acme.com',
    bio: '',
    role: 'editor',
    timezone: 'america-bogota',
  }

  const roleOptions: SelectItem[] = [
    { label: 'Administrador', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Solo lectura', value: 'viewer' },
  ]

  const timezoneOptions: SelectItem[] = [
    { label: 'Bogotá (UTC-5)', value: 'america-bogota' },
    { label: 'Ciudad de México (UTC-6)', value: 'america-mexico-city' },
    { label: 'Madrid (UTC+1)', value: 'europe-madrid' },
  ]

  let {
    defaultValues,
    onSave,
    onCancel,
  }: {
    defaultValues?: Partial<FormLayoutsValues>
    onSave?: (values: FormLayoutsValues) => void
    onCancel?: () => void
  } = $props()

  const initial = { ...DEFAULT_VALUES, ...defaultValues }

  let firstName = $state(initial.firstName)
  let lastName = $state(initial.lastName)
  let email = $state(initial.email)
  let bio = $state(initial.bio)
  let role = $state(initial.role)
  let timezone = $state(initial.timezone)

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    onSave?.({ firstName, lastName, email, bio, role, timezone })
  }
</script>

<div class="md-form-layouts">
  <form onsubmit={handleSubmit}>
    <section class="md-form-layouts__section">
      <div class="md-form-layouts__header">
        <h2 class="md-form-layouts__title">Perfil</h2>
        <p class="md-form-layouts__description">Información básica de tu cuenta, visible para tu equipo.</p>
      </div>
      <div class="md-form-layouts__grid">
        <Input label="Nombre" name="firstName" bind:value={firstName} required />
        <Input label="Apellido" name="lastName" bind:value={lastName} required />
        <div class="md-form-layouts__full">
          <Input label="Correo electrónico" name="email" type="email" bind:value={email} required />
        </div>
        <div class="md-form-layouts__full">
          <Textarea
            label="Biografía"
            name="bio"
            hint="Breve descripción para tu perfil público."
            rows={3}
            bind:value={bio}
          />
        </div>
      </div>
    </section>

    <Divider />

    <section class="md-form-layouts__section">
      <div class="md-form-layouts__header">
        <h2 class="md-form-layouts__title">Preferencias</h2>
        <p class="md-form-layouts__description">Cómo interactúas por defecto con el workspace.</p>
      </div>
      <div class="md-form-layouts__grid">
        <Select.Root
          items={roleOptions}
          defaultValue={[role]}
          onValueChange={(v) => (role = v[0] ?? role)}
        >
          <Select.Label>Rol</Select.Label>
          <Select.Trigger placeholder="Elige un rol" />
          <Select.Content>
            {#each roleOptions as item (item.value)}
              <Select.Item {item} />
            {/each}
          </Select.Content>
        </Select.Root>
        <Select.Root
          items={timezoneOptions}
          defaultValue={[timezone]}
          onValueChange={(v) => (timezone = v[0] ?? timezone)}
        >
          <Select.Label>Zona horaria</Select.Label>
          <Select.Trigger placeholder="Elige una zona horaria" />
          <Select.Content>
            {#each timezoneOptions as item (item.value)}
              <Select.Item {item} />
            {/each}
          </Select.Content>
        </Select.Root>
      </div>
    </section>

    <Divider />

    <div class="md-form-layouts__footer">
      <Button type="button" variant="secondary" onclick={() => onCancel?.()}>Cancelar</Button>
      <Button type="submit" variant="primary">Guardar cambios</Button>
    </div>
  </form>
</div>

<style>
  .md-form-layouts {
    background: var(--md-surface-base);
    border: 1px solid var(--md-border-default);
    max-width: 640px;
  }
  .md-form-layouts__section {
    padding: 24px;
  }
  .md-form-layouts__header {
    margin: 0 0 20px;
  }
  .md-form-layouts__title {
    font-size: var(--md-text-headline-md);
    font-weight: 600;
    color: var(--md-text-primary);
    margin: 0 0 4px;
  }
  .md-form-layouts__description {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
    margin: 0;
  }
  .md-form-layouts__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
  }
  .md-form-layouts__full {
    grid-column: 1 / -1;
  }
  .md-form-layouts__footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 20px 24px;
  }
</style>
