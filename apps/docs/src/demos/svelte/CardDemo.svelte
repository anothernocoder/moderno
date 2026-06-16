<script lang="ts">
  import { Card, Button } from '@moderno/svelte'
</script>

<Card>
  {#snippet title()}Plan Pro{/snippet}
  Acceso a todas las funciones, soporte prioritario y facturación anual.
  {#snippet footer()}
    <Button variant="secondary" size="sm" label="Cancelar" />
    <Button size="sm" label="Actualizar" />
  {/snippet}
</Card>
