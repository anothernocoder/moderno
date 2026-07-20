import { LineChart } from '@moderno/react'

const DATA = [
  { x: 0, y: 12 },
  { x: 1, y: 28 },
  { x: 2, y: 18 },
  { x: 3, y: 42 },
  { x: 4, y: 35 },
  { x: 5, y: 51 },
]

export default function LineChartDemo() {
  return <LineChart data={DATA} width={480} height={220} showPoints label="Monthly revenue" />
}
