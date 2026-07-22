import { useState, type ChangeEvent, type CSSProperties } from 'react'
import { Button, Divider, Input, Sheet } from '@moderno/react'

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

const bodyStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }
const footerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
  paddingTop: 'var(--md-spacing-4)',
  borderTop: '1px solid var(--md-border-default)',
}

/**
 * Moderno block — SlideOvers (React). Copy-paste; edit freely.
 * Side drawer for a view/edit record flow: a trigger button opens a `Sheet` sliding in from
 * the right with a title, a compact name/email/role form, and a footer with Cancel/Save
 * actions. Uses the Sheet + Input + Button + Divider primitives + Moderno tokens — the
 * panel's open/close state is the Sheet primitive's own controlled API, no bespoke overlay
 * or focus-trap logic here.
 */
export function SlideOvers({
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
}: SlideOversProps) {
  const initialValues: SlideOversFormValues = { ...DEFAULT_VALUES, ...defaultValues }
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState<SlideOversFormValues>(initialValues)

  function handleChange(field: keyof SlideOversFormValues) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setValues((current) => ({ ...current, [field]: event.currentTarget.value }))
    }
  }

  function handleCancel() {
    setValues(initialValues)
    onCancel?.()
    setOpen(false)
  }

  function handleSave() {
    onSave?.(values)
    setOpen(false)
  }

  return (
    <Sheet.Root open={open} onOpenChange={setOpen}>
      <Sheet.Trigger>{triggerLabel}</Sheet.Trigger>
      <Sheet.Content side="right">
        <Sheet.Title>{title}</Sheet.Title>
        <Sheet.Close closeLabel={closeLabel} />
        <Divider />
        <div style={bodyStyle}>
          <Input label={nameLabel} value={values.name} onChange={handleChange('name')} />
          <Input label={emailLabel} type="email" value={values.email} onChange={handleChange('email')} />
          <Input label={roleLabel} value={values.role} onChange={handleChange('role')} />
        </div>
        <div style={footerStyle}>
          <Button variant="secondary" onClick={handleCancel}>
            {cancelLabel}
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {saveLabel}
          </Button>
        </div>
      </Sheet.Content>
    </Sheet.Root>
  )
}
