'use client'

import clsx from 'clsx'
import { AssetTableSkeleton } from './AssetTable.skeleton'
import { HeaderBase } from './HeaderBase'
import styles from './LendingPage.module.scss'
import { MarketStatsSkeleton } from './market-stats/MarketStats.skeleton'
import { MobileMarketListSkeleton } from './mobile/MobileMarketList.skeleton'

export function LendingPageSkeleton() {
  return (
    <div className={styles.container}>
      <HeaderBase />

      <div className={clsx(styles.contentSection, styles.skeletonDesktop)}>
        <MarketStatsSkeleton />
        <AssetTableSkeleton rows={3} columns={7} />
      </div>

      <div className={clsx(styles.contentSection, styles.skeletonMobile)}>
        <MarketStatsSkeleton />
        <MobileMarketListSkeleton count={3} />
      </div>
    </div>
  )
}
