import { Button, createToaster, Toaster } from '@moderno/solid'

const toaster = createToaster({ placement: 'bottom-end' })

export default function ToastDemo() {
  return (
    <>
      <Toaster toaster={toaster} />
      <div style={{ display: 'flex', gap: '0.5rem', 'flex-wrap': 'wrap' }}>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => toaster.create({ title: 'Pedido confirmado', description: 'Llega en 3-5 días hábiles.', type: 'success' })}
        >
          Success
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => toaster.create({ title: 'No se pudo guardar', description: 'Verifica tu conexión.', type: 'error' })}
        >
          Error
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            toaster.create({
              title: 'Falló la subida',
              action: { label: 'Reintentar', onClick: () => toaster.create({ title: 'Reintentando…' }) },
            })
          }
        >
          Con acción
        </Button>
      </div>
    </>
  )
}
