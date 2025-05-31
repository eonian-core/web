import styles from './MarketInfo.module.scss'
import { OneLineSkeleton } from '@/components/loader/skeleton-loader'

interface MarketInfoSkeletonProps {
  rows: number
}

export function MarketInfoSkeleton({ rows }: MarketInfoSkeletonProps) {
  return (
    <div className={styles.marketInfoContainer}>
      {Array.from({ length: rows }).map((_, index) => (
        <InfoItemSkeleton key={index} />
      ))}
    </div>
  )
}

function InfoItemSkeleton() {
  return (
    <div className={styles.infoItem}>
      <div className={styles.infoItemLabel}>
        <OneLineSkeleton width={100} height={20} marginTop={0}/>
      </div>
      <div className={styles.infoItemValue}>
        <OneLineSkeleton width={100} height={20} marginTop={0}/>
      </div>
    </div>
  )
}
