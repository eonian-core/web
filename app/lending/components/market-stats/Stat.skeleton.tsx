import clsx from 'clsx'
import styles from './Stat.module.scss'
import { OneLineSkeleton } from '@/components/loader/skeleton-loader'

export function StatSkeleton({ children, big }: { children: React.ReactNode; big?: boolean }) {
  return (
    <div className={clsx(styles.container, { [styles.big]: big })}>
      <div className={styles.label}>
        {children}
      </div>
      <div className={styles.value}>
        <OneLineSkeleton width={big ? 164 : 80} height={big ? 50 : 32} />
      </div>
    </div>
  )
}
