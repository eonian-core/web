import { DonutChart } from '../charts/DonutChart'
import styles from './UtilizationRateCell.module.scss'

interface Props {
  rate: number // 0-1 value representing utilization rate percentage
}

export function UtilizationRateCell({ rate }: Props) {
  const clampedRate = Math.max(0, Math.min(1, rate))
  const percentage = (clampedRate * 100).toFixed(2)

  return (
    <td className={styles.cell}>
      <div className={styles.container}>
        <div className={styles.chartWrapper}>
          <DonutChart rate={rate} />
        </div>
        <span className={styles.percentageText}>{percentage}%</span>
      </div>
    </td>
  )
}
