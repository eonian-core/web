import clsx from 'clsx'
import styles from './CardActions.module.scss'
import { OneLineSkeleton } from '@/components/loader/skeleton-loader'

export function CardActionsSkeleton() {
  return (
    <div className={clsx(styles.cardActionsContainer, styles.skeleton)}>
      {/* Skeleton for Supply Button */}
      <div className={styles.actionButton}>
        <OneLineSkeleton width={100} height={40} />
      </div>

      {/* Skeleton for Borrow Button */}
      <div className={styles.actionButton}>
        <OneLineSkeleton width={100} height={40} />
      </div>
    </div>
  )
}
