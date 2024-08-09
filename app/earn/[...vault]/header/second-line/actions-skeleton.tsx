import styles from './actions.module.scss'
import { OneLineSkeleton } from '@/components/loader/skeleton-loader'

export function ActionsSkeleton() {
  return (
        <div className={styles.container}>
            <a><OneLineSkeleton width={90} height={32}/></a>
        </div>
  )
}
