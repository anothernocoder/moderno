<script setup lang="ts">
import { Card, Button } from '@moderno/vue'
</script>

<template>
  <Card>
    <template #title>Plan Pro</template>
    Acceso a todas las funciones, soporte prioritario y facturación anual.
    <template #footer>
      <Button variant="secondary" size="sm" label="Cancelar" />
      <Button size="sm" label="Actualizar" />
    </template>
  </Card>
</template>
