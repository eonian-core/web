import { Card, CardBody, CardHeader } from '@heroui/react'

import { UtilizationRateLine } from './UtilizationRateLine' // Assuming this doesn't need a skeleton or is simple enough
import { ApyStatSkeleton } from './ApyStat.skeleton'
import { MarketInfoSkeleton } from './MarketInfo.skeleton'
import { CardActionsSkeleton } from './CardActions.skeleton'
import styles from './MobileMarketCard.module.scss'
import { CircleSkeleton, OneLineSkeleton } from '@/components/loader/skeleton-loader'

export function MobileMarketCardSkeleton() {
  return (
    <Card>
      <CardHeader className={styles.cardHeader}>
        <div className={styles.headerContent}>
          <div className={styles.iconContainer}>
            {/* Skeleton for Icon */}
            <CircleSkeleton width={40} height={40} />
          </div>
          <div className={styles.textContainer}>
            <div className={styles.marketName}>
              <OneLineSkeleton width={100} marginTop={0} height={25}/>
            </div>
            <div className={styles.underlyingSymbol}>
              <OneLineSkeleton height={20} marginTop={5}/>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className={styles.cardBody}>
        <div className={styles.apyContainer}>
          <ApyStatSkeleton>Supply APY</ApyStatSkeleton>
          <div className={styles.divider}>{' '}</div>
          <ApyStatSkeleton>Borrow APY</ApyStatSkeleton>
        </div>
        {/* Assuming calculateUtilizationRate would return a number for the skeleton or we mock it */}
        <UtilizationRateLine rate={0} /> {/* Mock rate or adjust as needed */}
        <MarketInfoSkeleton rows={3} />
        <CardActionsSkeleton />
      </CardBody>
    </Card>
  )
}
