import clsx from 'clsx'

import styles from './ApyStat.module.scss' // Assuming ApyStat.module.scss exists and is similar to Stat.module.scss
import { OneLineSkeleton } from '@/components/loader/skeleton-loader'

export function ApyStatSkeleton({ children }: { children: React.ReactNode }) {
  return (
    <div className={clsx(styles.card)}>
      <div className={styles.title}>
        {children}
      </div>
      <div className={styles.apy}>
        <OneLineSkeleton width={60} height={30} marginTop={0}/>
      </div>
    </div>
  )
}
