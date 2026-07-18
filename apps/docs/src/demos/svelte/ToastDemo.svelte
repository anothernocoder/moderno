<script lang="ts">
  import { Button, createToaster, Toaster } from '@moderno/svelte'

  const toaster = createToaster({ placement: 'bottom-end' })
</script>

<Toaster {toaster} />
<div style="display: flex; gap: 0.5rem; flex-wrap: wrap">
  <Button
    variant="secondary"
    size="sm"
    onclick={() => toaster.create({ title: 'Pedido confirmado', description: 'Llega en 3-5 días hábiles.', type: 'success' })}
  >
    Success
  </Button>
  <Button
    variant="secondary"
    size="sm"
    onclick={() => toaster.create({ title: 'No se pudo guardar', description: 'Verifica tu conexión.', type: 'error' })}
  >
    Error
  </Button>
  <Button
    variant="secondary"
    size="sm"
    onclick={() =>
      toaster.create({
        title: 'Falló la subida',
        action: { label: 'Reintentar', onClick: () => toaster.create({ title: 'Reintentando…' }) },
      })}
  >
    Con acción
  </Button>
</div>
