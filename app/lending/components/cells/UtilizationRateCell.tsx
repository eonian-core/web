import { DonutChart } from '../charts/DonutChart'

interface Props {
  rate: number // 0-1 value representing utilization rate percentage
}

export function UtilizationRateCell({ rate }: Props) {
  const clampedRate = Math.max(0, Math.min(1, rate))
  const percentage = (clampedRate * 100).toFixed(2)

  return (
    <td className="p-3">
      <div className="flex items-center gap-2">
        <div className="relative w-8 h-8">
          <DonutChart className="w-8 h-8" rate={rate} />
        </div>
        <span className="text-sm font-semibold text-foreground-50">{percentage}%</span>
      </div>
    </td>
  )
}
