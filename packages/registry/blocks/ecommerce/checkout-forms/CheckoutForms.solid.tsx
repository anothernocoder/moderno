import { createSignal, For, type JSX } from 'solid-js'
import { Button, Divider, Input, Select } from '@moderno/solid'
import type { SelectItem } from '@moderno/solid'

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

const wrapperStyle: JSX.CSSProperties = {
  background: 'var(--md-surface-base)',
  border: '1px solid var(--md-border-default)',
  'max-width': '640px',
}
const headingWrapStyle: JSX.CSSProperties = { padding: '24px 24px 0' }
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
  padding: '20px 24px',
}

/**
 * Moderno block — CheckoutForms (Solid). Copy-paste; edit freely.
 * Checkout page layout: a shipping-address section and a payment section grouped into
 * a multi-section form, separated by a divider, with a footer submit action. Card
 * number/expiry/CVC are plain text inputs — no masking, no validation, no luhn-check.
 * Uses the Input + Select + Divider + Button primitives + Moderno tokens. Static
 * UI-only demo: no real payment processing, values only live in local controlled state.
 */
export function CheckoutForms(props: CheckoutFormsProps) {
  const initial = { ...DEFAULT_VALUES, ...props.defaultValues }

  const [fullName, setFullName] = createSignal(initial.fullName)
  const [email, setEmail] = createSignal(initial.email)
  const [address, setAddress] = createSignal(initial.address)
  const [city, setCity] = createSignal(initial.city)
  const [postalCode, setPostalCode] = createSignal(initial.postalCode)
  const [country, setCountry] = createSignal(initial.country)
  const [cardName, setCardName] = createSignal(initial.cardName)
  const [cardNumber, setCardNumber] = createSignal(initial.cardNumber)
  const [cardExpiry, setCardExpiry] = createSignal(initial.cardExpiry)
  const [cardCvc, setCardCvc] = createSignal(initial.cardCvc)

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    props.onCheckout?.({
      fullName: fullName(),
      email: email(),
      address: address(),
      city: city(),
      postalCode: postalCode(),
      country: country(),
      cardName: cardName(),
      cardNumber: cardNumber(),
      cardExpiry: cardExpiry(),
      cardCvc: cardCvc(),
    })
  }

  return (
    <div style={wrapperStyle}>
      <form onSubmit={handleSubmit}>
        {props.heading ?? 'Finalizar compra' ? (
          <div style={headingWrapStyle}>
            <h2 style={sectionTitleStyle}>{props.heading ?? 'Finalizar compra'}</h2>
          </div>
        ) : null}

        <section style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <h3 style={sectionTitleStyle}>{props.shippingTitle ?? 'Dirección de envío'}</h3>
            <p style={sectionDescStyle}>{props.shippingDescription ?? 'A dónde enviamos tu pedido.'}</p>
          </div>
          <div style={gridStyle}>
            <div style={fullWidthStyle}>
              <Input
                label="Nombre completo"
                name="fullName"
                value={fullName()}
                onInput={(event) => setFullName(event.currentTarget.value)}
                required
              />
            </div>
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
              <Input
                label="Dirección"
                name="address"
                value={address()}
                onInput={(event) => setAddress(event.currentTarget.value)}
                required
              />
            </div>
            <Input
              label="Ciudad"
              name="city"
              value={city()}
              onInput={(event) => setCity(event.currentTarget.value)}
              required
            />
            <Input
              label="Código postal"
              name="postalCode"
              value={postalCode()}
              onInput={(event) => setPostalCode(event.currentTarget.value)}
              required
            />
            <Select.Root
              items={COUNTRY_OPTIONS}
              defaultValue={[country()]}
              onValueChange={(v) => setCountry(v[0] ?? country())}
            >
              <Select.Label>País</Select.Label>
              <Select.Trigger placeholder="Elige un país" />
              <Select.Content>
                <For each={COUNTRY_OPTIONS}>{(item) => <Select.Item item={item} />}</For>
              </Select.Content>
            </Select.Root>
          </div>
        </section>

        <Divider />

        <section style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <h3 style={sectionTitleStyle}>{props.paymentTitle ?? 'Método de pago'}</h3>
            <p style={sectionDescStyle}>
              {props.paymentDescription ?? 'Datos de la tarjeta para procesar el cobro.'}
            </p>
          </div>
          <div style={gridStyle}>
            <div style={fullWidthStyle}>
              <Input
                label="Nombre en la tarjeta"
                name="cardName"
                value={cardName()}
                onInput={(event) => setCardName(event.currentTarget.value)}
                required
              />
            </div>
            <div style={fullWidthStyle}>
              <Input
                label="Número de tarjeta"
                name="cardNumber"
                inputMode="numeric"
                placeholder="1234 5678 9012 3456"
                value={cardNumber()}
                onInput={(event) => setCardNumber(event.currentTarget.value)}
                required
              />
            </div>
            <Input
              label="Vencimiento"
              name="cardExpiry"
              placeholder="MM/AA"
              value={cardExpiry()}
              onInput={(event) => setCardExpiry(event.currentTarget.value)}
              required
            />
            <Input
              label="CVC"
              name="cardCvc"
              inputMode="numeric"
              placeholder="123"
              value={cardCvc()}
              onInput={(event) => setCardCvc(event.currentTarget.value)}
              required
            />
          </div>
        </section>

        <div style={footerStyle}>
          <Button type="submit" variant="primary">
            {props.submitLabel ?? 'Confirmar pedido'}
          </Button>
        </div>
      </form>
    </div>
  )
}
