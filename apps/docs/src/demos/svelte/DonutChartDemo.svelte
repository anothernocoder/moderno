<script lang="ts">
  import { DonutChart } from '@moderno/svelte'

  const data = [
    { label: 'Direct', value: 456 },
    { label: 'Organic search', value: 351 },
    { label: 'Referral', value: 271 },
    { label: 'Social', value: 191 },
    { label: 'Email', value: 84 },
  ]
</script>

<DonutChart {data} width={280} height={280} label="Traffic by source" />
