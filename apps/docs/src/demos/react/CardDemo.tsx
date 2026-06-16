import { Card, Button } from '@moderno/react'

export default function CardDemo() {
  return (
    <Card
      title="Plan Pro"
      footer={
        <>
          <Button variant="secondary" size="sm" label="Cancelar" />
          <Button size="sm" label="Actualizar" />
        </>
      }
    >
      Acceso a todas las funciones, soporte prioritario y facturación anual editada.
    </Card>
  )
}
