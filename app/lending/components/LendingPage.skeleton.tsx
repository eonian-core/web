import { AssetTableSkeleton } from './AssetTable.skeleton'
import { HeaderBase } from './HeaderBase'
import styles from './LendingPage.module.scss'
import { MarketStatsSkeleton } from './market-stats/MarketStats.skeleton'

export function LendingPageSkeleton() {
  return (
    <div className={styles.container}>
      <HeaderBase />

      <div className={styles.contentSection}>
        <MarketStatsSkeleton />
        <AssetTableSkeleton rows={3} columns={7} />
      </div>
    </div>
  )
}
