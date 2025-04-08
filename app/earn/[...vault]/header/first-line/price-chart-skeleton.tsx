import styles from './price-chart.module.scss'
import { ChartSkeleton } from '@/components/loader/skeleton-chart'

export const chartWidth = 315
export const chartHeight = 128

export function PriceChartSkeleton() {
  return (
    <div className={styles.container}>
      <ChartSkeleton width={chartWidth} height={chartHeight}/>
    </div>
  )
}
