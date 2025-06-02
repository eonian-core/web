import styles from './MarketStats.module.scss'
import { StatSkeleton } from './Stat.skeleton'

export function MarketStatsSkeleton() {
  return <div><CommonMarketStatsSkeleton /></div>
}

function CommonMarketStatsSkeleton() {
  return (
    <div className={styles.statsContainer}>
      <StatSkeleton big>Total Supply</StatSkeleton>
      <div className={styles.statsGroup}>
        <StatSkeleton>Total Borrow</StatSkeleton>
        <StatSkeleton>Total Collateral</StatSkeleton>
      </div>
    </div>
  )
}
