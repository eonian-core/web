import { MobileMarketCardSkeleton } from './MobileMarketCard.skeleton'
import styles from './MobileMarketList.module.scss'

interface MobileMarketListSkeletonProps {
  count: number
}

export function MobileMarketListSkeleton({ count }: MobileMarketListSkeletonProps) {
  return (
    <div className={styles.marketListContainer}>
      {Array.from({ length: count }).map((_, index) => (
        <MobileMarketCardSkeleton key={index} />
      ))}
    </div>
  )
}
