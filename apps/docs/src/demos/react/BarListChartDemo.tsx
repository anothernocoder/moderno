import { BarListChart } from '@moderno/react'

const DATA = [
  { label: 'Direct', value: 456 },
  { label: 'Organic search', value: 351 },
  { label: 'Referral', value: 271 },
  { label: 'Social', value: 191 },
  { label: 'Email', value: 84 },
]

export default function BarListChartDemo() {
  return <BarListChart data={DATA} width={480} height={220} label="Traffic by source" />
}
