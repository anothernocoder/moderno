<script lang="ts">
  // Moderno block — SlideOvers (Svelte). Copy-paste; edit freely.
  // Side drawer for a view/edit record flow: a trigger button opens a Sheet sliding in from
  // the right with a title, a compact name/email/role form, and a footer with Cancel/Save
  // actions. Uses the Sheet + Input + Button + Divider primitives + Moderno tokens — the
  // panel's open/close state is the Sheet primitive's own controlled API, no bespoke overlay
  // or focus-trap logic here.
  import { Button, Divider, Input, Sheet } from '@moderno/svelte'

  export interface SlideOversFormValues {
    name: string
    email: string
    role: string
  }

  const DEFAULT_VALUES: SlideOversFormValues = {
    name: 'Bruno Restrepo',
    email: 'bruno@brunocafe.co',
    role: 'Administrador',
  }

  let {
    triggerLabel = 'Editar contacto',
    title = 'Editar contacto',
    nameLabel = 'Nombre',
    emailLabel = 'Correo',
    roleLabel = 'Rol',
    cancelLabel = 'Cancelar',
    saveLabel = 'Guardar cambios',
    closeLabel = 'Cerrar',
    defaultValues,
    onSave,
    onCancel,
  }: {
    triggerLabel?: string
    title?: string
    nameLabel?: string
    emailLabel?: string
    roleLabel?: string
    cancelLabel?: string
    saveLabel?: string
    closeLabel?: string
    defaultValues?: Partial<SlideOversFormValues>
    onSave?: (values: SlideOversFormValues) => void
    onCancel?: () => void
  } = $props()

  const initialValues: SlideOversFormValues = { ...DEFAULT_VALUES, ...defaultValues }

  let open = $state(false)
  let name = $state(initialValues.name)
  let email = $state(initialValues.email)
  let role = $state(initialValues.role)

  function handleCancel() {
    name = initialValues.name
    email = initialValues.email
    role = initialValues.role
    onCancel?.()
    open = false
  }

  function handleSave() {
    onSave?.({ name, email, role })
    open = false
  }
</script>

<Sheet.Root bind:open>
  <Sheet.Trigger>{triggerLabel}</Sheet.Trigger>
  <Sheet.Content side="right">
    <Sheet.Title>{title}</Sheet.Title>
    <Sheet.Close {closeLabel} />
    <Divider />
    <div class="md-slide-overs__body">
      <Input label={nameLabel} bind:value={name} />
      <Input label={emailLabel} type="email" bind:value={email} />
      <Input label={roleLabel} bind:value={role} />
    </div>
    <div class="md-slide-overs__footer">
      <Button variant="secondary" onclick={handleCancel}>{cancelLabel}</Button>
      <Button variant="primary" onclick={handleSave}>{saveLabel}</Button>
    </div>
  </Sheet.Content>
</Sheet.Root>

<style>
  .md-slide-overs__body {
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1;
  }
  .md-slide-overs__footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding-top: var(--md-spacing-4);
    border-top: 1px solid var(--md-border-default);
  }
</style>
