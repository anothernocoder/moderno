import { createSignal, type JSX } from 'solid-js'
import { Button, Divider, Input, Sheet } from '@moderno/solid'

export interface SlideOversFormValues {
  name: string
  email: string
  role: string
}

export interface SlideOversProps {
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
}

const DEFAULT_VALUES: SlideOversFormValues = {
  name: 'Bruno Restrepo',
  email: 'bruno@brunocafe.co',
  role: 'Administrador',
}

const bodyStyle: JSX.CSSProperties = { display: 'flex', 'flex-direction': 'column', gap: '16px', flex: 1 }
const footerStyle: JSX.CSSProperties = {
  display: 'flex',
  'justify-content': 'flex-end',
  gap: '8px',
  'padding-top': 'var(--md-spacing-4)',
  'border-top': '1px solid var(--md-border-default)',
}

/**
 * Moderno block — SlideOvers (Solid). Copy-paste; edit freely.
 * Side drawer for a view/edit record flow: a trigger button opens a Sheet sliding in from
 * the right with a title, a compact name/email/role form, and a footer with Cancel/Save
 * actions. Uses the Sheet + Input + Button + Divider primitives + Moderno tokens — the
 * panel's open/close state is the Sheet primitive's own controlled API, no bespoke overlay
 * or focus-trap logic here.
 */
export function SlideOvers(props: SlideOversProps) {
  const triggerLabel = () => props.triggerLabel ?? 'Editar contacto'
  const title = () => props.title ?? 'Editar contacto'
  const nameLabel = () => props.nameLabel ?? 'Nombre'
  const emailLabel = () => props.emailLabel ?? 'Correo'
  const roleLabel = () => props.roleLabel ?? 'Rol'
  const cancelLabel = () => props.cancelLabel ?? 'Cancelar'
  const saveLabel = () => props.saveLabel ?? 'Guardar cambios'
  const closeLabel = () => props.closeLabel ?? 'Cerrar'

  const initialValues: SlideOversFormValues = { ...DEFAULT_VALUES, ...props.defaultValues }

  const [open, setOpen] = createSignal(false)
  const [name, setName] = createSignal(initialValues.name)
  const [email, setEmail] = createSignal(initialValues.email)
  const [role, setRole] = createSignal(initialValues.role)

  function handleCancel() {
    setName(initialValues.name)
    setEmail(initialValues.email)
    setRole(initialValues.role)
    props.onCancel?.()
    setOpen(false)
  }

  function handleSave() {
    props.onSave?.({ name: name(), email: email(), role: role() })
    setOpen(false)
  }

  return (
    <Sheet.Root open={open()} onOpenChange={setOpen}>
      <Sheet.Trigger>{triggerLabel()}</Sheet.Trigger>
      <Sheet.Content side="right">
        <Sheet.Title>{title()}</Sheet.Title>
        <Sheet.Close closeLabel={closeLabel()} />
        <Divider />
        <div style={bodyStyle}>
          <Input label={nameLabel()} value={name()} onInput={(event) => setName(event.currentTarget.value)} />
          <Input
            label={emailLabel()}
            type="email"
            value={email()}
            onInput={(event) => setEmail(event.currentTarget.value)}
          />
          <Input label={roleLabel()} value={role()} onInput={(event) => setRole(event.currentTarget.value)} />
        </div>
        <div style={footerStyle}>
          <Button variant="secondary" onClick={handleCancel}>
            {cancelLabel()}
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {saveLabel()}
          </Button>
        </div>
      </Sheet.Content>
    </Sheet.Root>
  )
}
