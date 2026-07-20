import { BarChart } from '@moderno/solid'

const DATA = [
  { label: 'Jan', value: 12 },
  { label: 'Feb', value: 28 },
  { label: 'Mar', value: 18 },
  { label: 'Apr', value: 42 },
  { label: 'May', value: 35 },
  { label: 'Jun', value: 51 },
]

export default function BarChartDemo() {
  return <BarChart data={DATA} width={480} height={220} label="Monthly signups" />
}
