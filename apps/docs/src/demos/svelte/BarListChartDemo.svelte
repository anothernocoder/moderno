<script lang="ts">
  import { BarListChart } from '@moderno/svelte'

  const data = [
    { label: 'Direct', value: 456 },
    { label: 'Organic search', value: 351 },
    { label: 'Referral', value: 271 },
    { label: 'Social', value: 191 },
    { label: 'Email', value: 84 },
  ]
</script>

<BarListChart {data} width={480} height={220} label="Traffic by source" />
