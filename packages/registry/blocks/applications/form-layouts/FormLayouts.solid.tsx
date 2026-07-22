import { createSignal, For, type JSX } from 'solid-js'
import { Button, Divider, Input, Select, Textarea } from '@moderno/solid'
import type { SelectItem } from '@moderno/solid'

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

const wrapperStyle: JSX.CSSProperties = {
  background: 'var(--md-surface-base)',
  border: '1px solid var(--md-border-default)',
  'max-width': '640px',
}
const sectionStyle: JSX.CSSProperties = { padding: '24px' }
const sectionHeaderStyle: JSX.CSSProperties = { margin: '0 0 20px' }
const sectionTitleStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-headline-md)',
  'font-weight': 600,
  color: 'var(--md-text-primary)',
  margin: '0 0 4px',
}
const sectionDescStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const gridStyle: JSX.CSSProperties = {
  display: 'grid',
  'grid-template-columns': 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '16px',
}
const fullWidthStyle: JSX.CSSProperties = { 'grid-column': '1 / -1' }
const footerStyle: JSX.CSSProperties = {
  display: 'flex',
  'justify-content': 'flex-end',
  gap: '12px',
  padding: '20px 24px',
}

/**
 * Moderno block — FormLayouts (Solid). Copy-paste; edit freely.
 * Settings/profile-edit form page layout: grouped fieldsets with headings, a responsive
 * multi-column field grid, section dividers, and a footer action row. Uses the Input +
 * Textarea + Select + Divider + Button primitives + Moderno tokens.
 */
export function FormLayouts(props: FormLayoutsProps) {
  const initial = { ...DEFAULT_VALUES, ...props.defaultValues }

  const [firstName, setFirstName] = createSignal(initial.firstName)
  const [lastName, setLastName] = createSignal(initial.lastName)
  const [email, setEmail] = createSignal(initial.email)
  const [bio, setBio] = createSignal(initial.bio)
  const [role, setRole] = createSignal(initial.role)
  const [timezone, setTimezone] = createSignal(initial.timezone)

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    props.onSave?.({
      firstName: firstName(),
      lastName: lastName(),
      email: email(),
      bio: bio(),
      role: role(),
      timezone: timezone(),
    })
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
              value={firstName()}
              onInput={(event) => setFirstName(event.currentTarget.value)}
              required
            />
            <Input
              label="Apellido"
              name="lastName"
              value={lastName()}
              onInput={(event) => setLastName(event.currentTarget.value)}
              required
            />
            <div style={fullWidthStyle}>
              <Input
                label="Correo electrónico"
                name="email"
                type="email"
                value={email()}
                onInput={(event) => setEmail(event.currentTarget.value)}
                required
              />
            </div>
            <div style={fullWidthStyle}>
              <Textarea
                label="Biografía"
                name="bio"
                hint="Breve descripción para tu perfil público."
                rows={3}
                value={bio()}
                onInput={(event) => setBio(event.currentTarget.value)}
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
            <Select.Root items={ROLE_OPTIONS} defaultValue={[role()]} onValueChange={(v) => setRole(v[0] ?? role())}>
              <Select.Label>Rol</Select.Label>
              <Select.Trigger placeholder="Elige un rol" />
              <Select.Content>
                <For each={ROLE_OPTIONS}>{(item) => <Select.Item item={item} />}</For>
              </Select.Content>
            </Select.Root>
            <Select.Root
              items={TIMEZONE_OPTIONS}
              defaultValue={[timezone()]}
              onValueChange={(v) => setTimezone(v[0] ?? timezone())}
            >
              <Select.Label>Zona horaria</Select.Label>
              <Select.Trigger placeholder="Elige una zona horaria" />
              <Select.Content>
                <For each={TIMEZONE_OPTIONS}>{(item) => <Select.Item item={item} />}</For>
              </Select.Content>
            </Select.Root>
          </div>
        </section>

        <Divider />

        <div style={footerStyle}>
          <Button type="button" variant="secondary" onClick={() => props.onCancel?.()}>
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
