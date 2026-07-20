import { DonutChart } from '@moderno/react'

const DATA = [
  { label: 'Direct', value: 456 },
  { label: 'Organic search', value: 351 },
  { label: 'Referral', value: 271 },
  { label: 'Social', value: 191 },
  { label: 'Email', value: 84 },
]

export default function DonutChartDemo() {
  return <DonutChart data={DATA} width={280} height={280} label="Traffic by source" />
}
