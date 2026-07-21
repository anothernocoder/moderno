<script lang="ts">
  // Moderno block — Contact (Svelte). Copy-paste; edit freely.
  // Contact section: intro copy + contact info list on the left, a name/email/subject/message
  // form on the right. Uses the Input + Textarea + Button primitives + Moderno tokens.
  import { Button, Input, Textarea } from '@moderno/svelte'

  export interface ContactInfoItem {
    label: string
    value: string
    href?: string
  }

  export interface ContactFormValues {
    name: string
    email: string
    subject: string
    message: string
  }

  const DEFAULT_CONTACT_INFO: ContactInfoItem[] = [
    { label: 'Email', value: 'hola@acme.com', href: 'mailto:hola@acme.com' },
    { label: 'Teléfono', value: '+57 300 123 4567', href: 'tel:+573001234567' },
    { label: 'Oficina', value: 'Bogotá, Colombia' },
  ]

  let {
    eyebrow = 'Contacto',
    title = '¿Hablamos?',
    description = 'Escríbenos y te respondemos en menos de 24 horas.',
    contactInfo = DEFAULT_CONTACT_INFO,
    nameLabel = 'Nombre',
    emailLabel = 'Correo',
    subjectLabel = 'Asunto',
    messageLabel = 'Mensaje',
    submitLabel = 'Enviar mensaje',
    defaultValues,
    onSubmit,
  }: {
    eyebrow?: string
    title?: string
    description?: string
    contactInfo?: ContactInfoItem[]
    nameLabel?: string
    emailLabel?: string
    subjectLabel?: string
    messageLabel?: string
    submitLabel?: string
    defaultValues?: Partial<ContactFormValues>
    onSubmit?: (values: ContactFormValues) => void
  } = $props()

  let name = $state(defaultValues?.name ?? '')
  let email = $state(defaultValues?.email ?? '')
  let subject = $state(defaultValues?.subject ?? '')
  let message = $state(defaultValues?.message ?? '')

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    onSubmit?.({ name, email, subject, message })
  }
</script>

<div class="md-contact">
  <div class="md-contact__info">
    {#if eyebrow}<p class="md-contact__eyebrow">{eyebrow}</p>{/if}
    <h2 class="md-contact__title">{title}</h2>
    {#if description}<p class="md-contact__description">{description}</p>{/if}
    <ul class="md-contact__info-list">
      {#each contactInfo as item (item.label)}
        <li>
          <p class="md-contact__info-label">{item.label}</p>
          {#if item.href}
            <a href={item.href} class="md-contact__info-value">{item.value}</a>
          {:else}
            <span class="md-contact__info-value">{item.value}</span>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
  <form class="md-contact__form" onsubmit={handleSubmit}>
    <div class="md-contact__row">
      <div class="md-contact__field">
        <Input label={nameLabel} name="name" bind:value={name} required />
      </div>
      <div class="md-contact__field">
        <Input label={emailLabel} name="email" type="email" bind:value={email} required />
      </div>
    </div>
    <Input label={subjectLabel} name="subject" bind:value={subject} />
    <Textarea label={messageLabel} name="message" rows={5} bind:value={message} required />
    <Button type="submit" variant="primary" size="lg" label={submitLabel} />
  </form>
</div>

<style>
  .md-contact {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 48px;
    max-width: 1040px;
    margin: 0 auto;
    padding: 64px 24px;
    background: var(--md-surface-base);
  }
  .md-contact__info {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .md-contact__eyebrow {
    font-size: var(--md-text-label-sm);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--md-primary);
    margin: 0;
  }
  .md-contact__title {
    font-family: var(--md-font-serif);
    font-size: 32px;
    line-height: 1.15;
    color: var(--md-text-primary);
    margin: 0;
  }
  .md-contact__description {
    font-size: var(--md-text-body-md);
    line-height: var(--md-text-body-md-lh);
    color: var(--md-text-secondary);
    margin: 0;
  }
  .md-contact__info-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin: 0;
    padding: 0;
  }
  .md-contact__info-label {
    font-size: var(--md-text-label-sm);
    color: var(--md-text-secondary);
    margin: 0 0 4px;
  }
  .md-contact__info-value {
    font-size: var(--md-text-body-md);
    color: var(--md-text-primary);
    text-decoration: none;
  }
  .md-contact__form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .md-contact__row {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  .md-contact__field {
    flex: 1 1 200px;
  }
</style>
