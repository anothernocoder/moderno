import { useState, type ChangeEvent, type CSSProperties, type FormEvent } from 'react'
import { Button, Divider, Input, Select, type SelectItem } from '@moderno/react'

export interface CheckoutFormsValues {
  fullName: string
  email: string
  address: string
  city: string
  postalCode: string
  country: string
  cardName: string
  cardNumber: string
  cardExpiry: string
  cardCvc: string
}

export interface CheckoutFormsProps {
  heading?: string
  shippingTitle?: string
  shippingDescription?: string
  paymentTitle?: string
  paymentDescription?: string
  defaultValues?: Partial<CheckoutFormsValues>
  submitLabel?: string
  onCheckout?: (values: CheckoutFormsValues) => void
}

const DEFAULT_VALUES: CheckoutFormsValues = {
  fullName: 'Camila Restrepo',
  email: 'camila@acme.com',
  address: 'Calle 10 # 5-30',
  city: 'Bogotá',
  postalCode: '110111',
  country: 'colombia',
  cardName: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
}

const COUNTRY_OPTIONS: SelectItem[] = [
  { label: 'Colombia', value: 'colombia' },
  { label: 'México', value: 'mexico' },
  { label: 'España', value: 'espana' },
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
  padding: '20px 24px',
}

type TextField =
  | 'fullName'
  | 'email'
  | 'address'
  | 'city'
  | 'postalCode'
  | 'cardName'
  | 'cardNumber'
  | 'cardExpiry'
  | 'cardCvc'

/**
 * Moderno block — CheckoutForms (React). Copy-paste; edit freely.
 * Checkout page layout: a shipping-address section and a payment section grouped into
 * a multi-section form, separated by a divider, with a footer submit action. Card
 * number/expiry/CVC are plain text inputs — no masking, no validation, no luhn-check.
 * Uses the Input + Select + Divider + Button primitives + Moderno tokens. Static
 * UI-only demo: no real payment processing, values only live in local controlled state.
 */
export function CheckoutForms({
  heading = 'Finalizar compra',
  shippingTitle = 'Dirección de envío',
  shippingDescription = 'A dónde enviamos tu pedido.',
  paymentTitle = 'Método de pago',
  paymentDescription = 'Datos de la tarjeta para procesar el cobro.',
  defaultValues,
  submitLabel = 'Confirmar pedido',
  onCheckout,
}: CheckoutFormsProps) {
  const [values, setValues] = useState<CheckoutFormsValues>({ ...DEFAULT_VALUES, ...defaultValues })

  function handleChange(field: TextField) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setValues((current) => ({ ...current, [field]: event.currentTarget.value }))
    }
  }

  function handleCountryChange(value: string[]) {
    setValues((current) => ({ ...current, country: value[0] ?? current.country }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onCheckout?.(values)
  }

  return (
    <div style={wrapperStyle}>
      <form onSubmit={handleSubmit}>
        {heading ? (
          <div style={{ ...sectionStyle, paddingBottom: 0 }}>
            <h2 style={sectionTitleStyle}>{heading}</h2>
          </div>
        ) : null}

        <section style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <h3 style={sectionTitleStyle}>{shippingTitle}</h3>
            <p style={sectionDescStyle}>{shippingDescription}</p>
          </div>
          <div style={gridStyle}>
            <div style={fullWidthStyle}>
              <Input
                label="Nombre completo"
                name="fullName"
                value={values.fullName}
                onChange={handleChange('fullName')}
                required
              />
            </div>
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
              <Input
                label="Dirección"
                name="address"
                value={values.address}
                onChange={handleChange('address')}
                required
              />
            </div>
            <Input label="Ciudad" name="city" value={values.city} onChange={handleChange('city')} required />
            <Input
              label="Código postal"
              name="postalCode"
              value={values.postalCode}
              onChange={handleChange('postalCode')}
              required
            />
            <Select.Root
              items={COUNTRY_OPTIONS}
              defaultValue={[values.country]}
              onValueChange={handleCountryChange}
            >
              <Select.Label>País</Select.Label>
              <Select.Trigger placeholder="Elige un país" />
              <Select.Content>
                {COUNTRY_OPTIONS.map((item) => (
                  <Select.Item key={item.value} item={item} />
                ))}
              </Select.Content>
            </Select.Root>
          </div>
        </section>

        <Divider />

        <section style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <h3 style={sectionTitleStyle}>{paymentTitle}</h3>
            <p style={sectionDescStyle}>{paymentDescription}</p>
          </div>
          <div style={gridStyle}>
            <div style={fullWidthStyle}>
              <Input
                label="Nombre en la tarjeta"
                name="cardName"
                value={values.cardName}
                onChange={handleChange('cardName')}
                required
              />
            </div>
            <div style={fullWidthStyle}>
              <Input
                label="Número de tarjeta"
                name="cardNumber"
                inputMode="numeric"
                placeholder="1234 5678 9012 3456"
                value={values.cardNumber}
                onChange={handleChange('cardNumber')}
                required
              />
            </div>
            <Input
              label="Vencimiento"
              name="cardExpiry"
              placeholder="MM/AA"
              value={values.cardExpiry}
              onChange={handleChange('cardExpiry')}
              required
            />
            <Input
              label="CVC"
              name="cardCvc"
              inputMode="numeric"
              placeholder="123"
              value={values.cardCvc}
              onChange={handleChange('cardCvc')}
              required
            />
          </div>
        </section>

        <div style={footerStyle}>
          <Button type="submit" variant="primary">
            {submitLabel}
          </Button>
        </div>
      </form>
    </div>
  )
}
