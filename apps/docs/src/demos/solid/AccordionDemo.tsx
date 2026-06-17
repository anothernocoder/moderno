import { Accordion } from '@moderno/solid'

export default function AccordionDemo() {
  return (
    <Accordion.Root defaultValue={['envios']} collapsible>
      <Accordion.Item value="envios">
        <Accordion.ItemTrigger>¿Cuánto tarda el envío?</Accordion.ItemTrigger>
        <Accordion.ItemContent>Los pedidos se entregan en 2–5 días hábiles según tu ubicación.</Accordion.ItemContent>
      </Accordion.Item>
      <Accordion.Item value="devoluciones">
        <Accordion.ItemTrigger>¿Puedo devolver un producto?</Accordion.ItemTrigger>
        <Accordion.ItemContent>Tienes 30 días desde la entrega para solicitar una devolución gratuita.</Accordion.ItemContent>
      </Accordion.Item>
      <Accordion.Item value="pago">
        <Accordion.ItemTrigger>¿Qué métodos de pago aceptan?</Accordion.ItemTrigger>
        <Accordion.ItemContent>Tarjeta de crédito, transferencia bancaria y pago contra entrega.</Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  )
}
