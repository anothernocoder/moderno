import { useState, type ChangeEvent, type CSSProperties, type FormEvent } from 'react'
import { Button, Divider, Input, Select, Textarea, type SelectItem } from '@moderno/react'

export interface FormLayoutsValues {
  firstName: string
  lastName: string
  email: string
  bio: string
  role: string
  timezone: string
}

export interface FormLayoutsProps {
  defaultValues?: Partial<FormLayoutsValues>
  onSave?: (values: FormLayoutsValues) => void
  onCancel?: () => void
}

const DEFAULT_VALUES: FormLayoutsValues = {
  firstName: 'Camila',
  lastName: 'Restrepo',
  email: 'camila@acme.com',
  bio: '',
  role: 'editor',
  timezone: 'america-bogota',
}

const ROLE_OPTIONS: SelectItem[] = [
  { label: 'Administrador', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Solo lectura', value: 'viewer' },
]

const TIMEZONE_OPTIONS: SelectItem[] = [
  { label: 'Bogotá (UTC-5)', value: 'america-bogota' },
  { label: 'Ciudad de México (UTC-6)', value: 'america-mexico-city' },
  { label: 'Madrid (UTC+1)', value: 'europe-madrid' },
]

const wrapperStyle: CSSProperties = {
  background: 'var(--md-surface-base)',
  border: '1px solid var(--md-border-default)',
  maxWidth: '640px',
}
const sectionStyle: CSSProperties = { padding: '24px' }
const sectionHeaderStyle: CSSProperties = { margin: '0 0 20px' }
const sectionTitleStyle: CSSProperties = {
  fontSize: 'var(--md-text-headline-md)',
  fontWeight: 600,
  color: 'var(--md-text-primary)',
  margin: '0 0 4px',
}
const sectionDescStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const gridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '16px',
}
const fullWidthStyle: CSSProperties = { gridColumn: '1 / -1' }
const footerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '12px',
  padding: '20px 24px',
}

/**
 * Moderno block — FormLayouts (React). Copy-paste; edit freely.
 * Settings/profile-edit form page layout: grouped fieldsets with headings, a responsive
 * multi-column field grid, section dividers, and a footer action row. Uses the Input +
 * Textarea + Select + Divider + Button primitives + Moderno tokens.
 */
export function FormLayouts({ defaultValues, onSave, onCancel }: FormLayoutsProps) {
  const [values, setValues] = useState<FormLayoutsValues>({ ...DEFAULT_VALUES, ...defaultValues })

  function handleChange(field: 'firstName' | 'lastName' | 'email' | 'bio') {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((current) => ({ ...current, [field]: event.currentTarget.value }))
    }
  }

  function handleSelectChange(field: 'role' | 'timezone') {
    return (value: string[]) => {
      setValues((current) => ({ ...current, [field]: value[0] ?? current[field] }))
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSave?.(values)
  }

  return (
    <div style={wrapperStyle}>
      <form onSubmit={handleSubmit}>
        <section style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <h2 style={sectionTitleStyle}>Perfil</h2>
            <p style={sectionDescStyle}>Información básica de tu cuenta, visible para tu equipo.</p>
          </div>
          <div style={gridStyle}>
            <Input
              label="Nombre"
              name="firstName"
              value={values.firstName}
              onChange={handleChange('firstName')}
              required
            />
            <Input
              label="Apellido"
              name="lastName"
              value={values.lastName}
              onChange={handleChange('lastName')}
              required
            />
            <div style={fullWidthStyle}>
              <Input
                label="Correo electrónico"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange('email')}
                required
              />
            </div>
            <div style={fullWidthStyle}>
              <Textarea
                label="Biografía"
                name="bio"
                hint="Breve descripción para tu perfil público."
                rows={3}
                value={values.bio}
                onChange={handleChange('bio')}
              />
            </div>
          </div>
        </section>

        <Divider />

        <section style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <h2 style={sectionTitleStyle}>Preferencias</h2>
            <p style={sectionDescStyle}>Cómo interactúas por defecto con el workspace.</p>
          </div>
          <div style={gridStyle}>
            <Select.Root
              items={ROLE_OPTIONS}
              defaultValue={[values.role]}
              onValueChange={handleSelectChange('role')}
            >
              <Select.Label>Rol</Select.Label>
              <Select.Trigger placeholder="Elige un rol" />
              <Select.Content>
                {ROLE_OPTIONS.map((item) => (
                  <Select.Item key={item.value} item={item} />
                ))}
              </Select.Content>
            </Select.Root>
            <Select.Root
              items={TIMEZONE_OPTIONS}
              defaultValue={[values.timezone]}
              onValueChange={handleSelectChange('timezone')}
            >
              <Select.Label>Zona horaria</Select.Label>
              <Select.Trigger placeholder="Elige una zona horaria" />
              <Select.Content>
                {TIMEZONE_OPTIONS.map((item) => (
                  <Select.Item key={item.value} item={item} />
                ))}
              </Select.Content>
            </Select.Root>
          </div>
        </section>

        <Divider />

        <div style={footerStyle}>
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            Guardar cambios
          </Button>
        </div>
      </form>
    </div>
  )
}
